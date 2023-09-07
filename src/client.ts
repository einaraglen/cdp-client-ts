import Connection, { Listener, ListenerKeys } from "./handlers/connection";
import Receiver from "./handlers/receiver";
import Memory from "./models/memory";
import { CDPNodeType } from "./models/studio.proto";

class Client {
  public static SYSTEM_NODE_ID = 0;
  private connection: Connection;
  private memory: Memory;

  constructor(url: string) {
    this.connection = Connection.instance(url);
    this.memory = Memory.instance();
    const receiver = new Receiver();
    this.connection.addListener("message", receiver.onMessage);
  }

  public on = (key: ListenerKeys, callback: Listener) => {
    this.connection.addListener(key, callback);
  };

  public off = (key: ListenerKeys, callback: Listener) => {
    this.connection.removeListener(key, callback);
  };

  public find = async (route: string) => {
    return await this.memory.getNode(route);
  };

  public test = async () => {
    try {
      const env = await this.find("SimulatorInterface.WebUI.Environment");
      env.forEachChild((child) => {
        if (child.nodeType == CDPNodeType.CDP_OBJECT && child.typeName.includes("CDPSignal")) {
          console.log(child.name)
        }
      })
    } catch (e) {
      console.log(e);
    }
  };
}

export default Client;
