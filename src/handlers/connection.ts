import IsomorphicSocket from "isomorphic-ws";
import { Container, Container_Type, Hello } from "../models/studio.proto";
import { v4 as uuidv4 } from 'uuid';
import Client from "../client";

type ListenerKeys = "close" | "open" | "message" | "error";
type Listener = (value?: any) => void;

class Connection {
  private socket: WebSocket;
  private url: string;
  private listeners: Map<string, Listener[]>;
  private buffer: ArrayBufferLike[] = [];
  private metadata?: Hello;
  private nodes: Map<number, any>

  public connected: boolean = false;

  constructor(url: string, nodes: Map<number, any>) {
    this.url = url;
    this.nodes = nodes;
    this.listeners = new Map();
    this.socket = new IsomorphicSocket(this.url) as WebSocket;
    this.socket.binaryType = "arraybuffer";
    this.socket.onopen = this.onOpen;
    this.socket.onclose = this.onClose;
    this.socket.onmessage = this.onHelloMessage;
    this.socket.onerror = this.onError;
  }

  public getMetadata = () => {
    return this.metadata;
  }

  public addListener = (key: ListenerKeys, callback: Listener) => {
    const collection = (this.listeners.has(key) ? this.listeners.get(key)! : []) as Listener[];
    this.listeners.set(key, [...collection, callback]);
  };

  public removeListener = (key: ListenerKeys, callback: Listener) => {
    if (!this.listeners.has(key)) {
      return;
    }

    const collection = this.listeners.get(key) as Listener[];
    this.listeners.set(
      key,
      collection.filter((listener) => listener !== callback)
    );
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
      throw new Error("Flush failed, socket not in readyState")
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
    return new Promise((resolve) => {
      const key = uuidv4();

      const callback = (_key: string, value: any) => {
        if (_key != key) {
          return;
        }

        const callbacks = this.nodes.get(Client.SYSTEM_NODE_ID) ?? []
        this.nodes.set(Client.SYSTEM_NODE_ID, callbacks.filter((c: any) => c.key != key))
        resolve(value)
      }

      const callbacks = this.nodes.get(Client.SYSTEM_NODE_ID) ?? []
      this.nodes.set(Client.SYSTEM_NODE_ID, [...callbacks, { key, callback }])

      const message = Container.create({ messageType: Container_Type.eStructureRequest, structureRequest: [Client.SYSTEM_NODE_ID] });
      this.send(Container.encode(message).finish());
    })
  }

  private onHelloMessage = (event: MessageEvent<ArrayBuffer>) => {
    const decoded = Hello.decode(new Uint8Array(event.data));
    this.metadata = decoded;

    this.socket.onmessage = this.onMessage;

    this.makeRootStructureRequest().then(this.flush)
  };

  private onMessage = (event: MessageEvent<ArrayBuffer>) => {
    this.emit("message", event);
  };

  private onError = (event: Event) => {
    this.emit("error", event);
    this.connected = false;
  };

  private onOpen = (event: Event) => {
    this.emit("open");
    this.connected = true;
  };

  private onClose = (event: CloseEvent) => {
    this.emit("close", event);
    this.connected = false;
    setTimeout(this.reconnect, 3e4);
  };

  private emit = (key: ListenerKeys, event?: MessageEvent<ArrayBuffer> | Event | CloseEvent) => {
    const callbacks = this.listeners.get(key) ?? [];
    callbacks.forEach((callback) => callback(event));
  };
}

export default Connection;
