import Connection, { Listener, ListenerKeys } from "./handlers/connection";
import Receiver from "./handlers/receiver";
import Memory from "./models/memory";

export type ClientOptions = {
  protocol?: "ws://" | "wss://";
};

const defaultOptions: ClientOptions = {
  protocol: "ws://",
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

  /**
   * Get Application Metadata
   * @returns Metadata | null
   */
  public get metadata() {
    if (this.connection.getMetadata() == null) {
      return null
    }

    const metadata = this.connection.getMetadata()!
    const { cdpVersionMajor, cdpVersionMinor, cdpVersionPatch, systemName, applicationName } = metadata

    return {
      version: `${cdpVersionMajor}.${cdpVersionMinor}.${cdpVersionPatch}`,
      domain: systemName,
      root: applicationName
    }
  }
}

export default Client;
