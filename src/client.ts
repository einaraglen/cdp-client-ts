import Connection, { Listener, ListenerKeys } from "./handlers/connection";
import Receiver from "./handlers/receiver";
import Memory from "./models/memory";

export type ClientOptions = {
  protocol?: "ws://" | "wss://";
  maxRetry?: number;
  retryTimeout?: number;
};

const defaultOptions: ClientOptions = {
  protocol: "ws://",
  maxRetry: 0,
  retryTimeout: 3e4,
};

/**
 * CDP Studio API Client
 */
class Client {
  public static SYSTEM_NODE_ID = 0;
  private connection: Connection;
  private memory: Memory;

  constructor(url: string, options?: ClientOptions) {
    const _options = options ? { ...defaultOptions, ...options } : defaultOptions;

    this.connection = Connection.instance(url, _options);
    this.memory = Memory.instance();
    this.connection.addListener("message", new Receiver().onMessage);
  }

  /**
   * Subscribe to Core Events
   * @param key String
   * @param callback Function
   */
  public on = (key: Exclude<ListenerKeys, "message">, callback: Listener) => {
    this.connection.addListener(key as any, callback);
  };

  /**
   * Unsubscribe to Core Events
   * @param key String
   * @param callback Function
   */
  public off = (key: Exclude<ListenerKeys, "message">, callback: Listener) => {
    this.connection.removeListener(key as any, callback);
  };

  /**
   * Search for Nodes in Studio API Tree
   * @param route String
   * @throws Error
   * @returns Promise<StructureNode>
   */
  public find = async (route: string) => {
    return await this.memory.findNode(route);
  };
}

export default Client;
