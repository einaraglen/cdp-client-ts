import IsomorphicSocket from "isomorphic-ws";
import { Container, Container_Type, Hello, Node, Error as ProtoError } from "../models/studio.proto";
import Client from "../client";
import StructureCallbacks from "./callbacks/structure_callbacks";
import Memory from "../models/memory";

export type ListenerKeys = "close" | "open" | "message" | "error";
export type Listener = (value?: any) => void;

class Connection {
  private static _instance: Connection | null = null;
  private socket: WebSocket;
  private memory: Memory;
  private url: string;
  private listeners: Map<string, Set<Listener>>;
  private buffer: ArrayBufferLike[];
  private metadata?: Hello;

  private constructor(url: string) {
    this.url = url;
    this.listeners = new Map();
    this.socket = new IsomorphicSocket(this.url) as WebSocket;
    this.memory = Memory.instance();
    this.socket.binaryType = "arraybuffer";
    this.socket.onopen = this.onOpen;
    this.socket.onclose = this.onClose;
    this.socket.onmessage = this.onHelloMessage;
    this.socket.onerror = this.onError;
    this.buffer = [];
  }

  public static instance = (url?: string) => {
    if (Connection._instance == null) {
      Connection._instance = new Connection(url!);
    }

    return Connection._instance;
  };

  public getMetadata = () => {
    return this.metadata;
  };

  public addListener = (key: ListenerKeys, callback: Listener) => {
    const collection = this.listeners.has(key) ? this.listeners.get(key)! : new Set<Listener>();
    collection.add(callback);
    this.listeners.set(key, collection);
  };

  public removeListener = (key: ListenerKeys, callback: Listener) => {
    if (!this.listeners.has(key)) {
      return;
    }

    const collection = this.listeners.get(key)!;
    collection.delete(callback);
    this.listeners.set(key, collection);
  };

  public send = (payload: ArrayBufferLike) => {
    if (this.socket.readyState == 0) {
      this.buffer.push(payload);
      return;
    }

    this.socket.send(payload);
  };

  public flush = async () => {
    if (this.socket.readyState == 0) {
      throw new Error("Flush failed, socket not in readyState");
    }

    this.buffer.forEach((payload) => this.socket.send(payload));
    this.buffer.splice(0, this.buffer.length);
  };

  private reconnect = () => {
    this.socket = new IsomorphicSocket(this.url) as WebSocket;
    this.socket.binaryType = "arraybuffer";
    this.socket.onopen = this.onOpen;
    this.socket.onclose = this.onClose;
    this.socket.onmessage = this.onHelloMessage;
    this.socket.onerror = this.onError;
  };

  private makeRootStructureRequest = () => {
    const callbacks = StructureCallbacks.instance();

    return new Promise<void>((resolve) => {
      callbacks.registerCallback(Client.SYSTEM_NODE_ID, (node: Node) => {
        this.memory.insertNode(null, node)
        resolve();
      });
      const message = Container.create({ messageType: Container_Type.eStructureRequest, structureRequest: [Client.SYSTEM_NODE_ID] });
      this.send(Container.encode(message).finish());
    });
  };

  private onHelloMessage = (event: MessageEvent<ArrayBuffer>) => {
    const decoded = Hello.decode(new Uint8Array(event.data));
    this.metadata = decoded;

    this.socket.onmessage = this.onMessage;

    this.makeRootStructureRequest().then(() => {
      this.flush()
      this.memory.initiated = true;
      this.memory.flush();
    });
  };

  private onMessage = (event: MessageEvent<ArrayBuffer>) => {
    this.emit("message", event);
  };

  private onError = (event: Event) => {
    this.emit("error", event);
  };

  private onOpen = (event: Event) => {
    this.emit("open");
  };

  private onClose = (event: CloseEvent) => {
    this.emit("close", event);
    setTimeout(this.reconnect, 3e4);
  };

  public emit = (key: ListenerKeys, event?: MessageEvent<ArrayBuffer> | Event | CloseEvent | ProtoError) => {
    const callbacks = this.listeners.get(key) ?? [];
    callbacks.forEach((callback) => callback(event));
  };
}

export default Connection;
