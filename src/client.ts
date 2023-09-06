import Connection from "./handlers/connection";
import Receiver from "./handlers/receiver";
import Requester from "./handlers/requester";

class Client {
  public static SYSTEM_NODE_ID = 0;
  private nodes: Map<number, any>
  private connection: Connection;
  private receiver: Receiver;
  private requester: Requester;

  constructor(url: string) {
    this.nodes = new Map();
    this.connection = new Connection(url, this.nodes);
    this.receiver = new Receiver(this.nodes);
    this.requester = new Requester(this.connection, this.nodes);
    this.connection.addListener("message", this.receiver.onMessage);
  }

  public test = async () => {
  
    this.requester.makeStructureRequest(6).then((value: any) => {
      console.log(6)
      this.requester.makeStructureRequest(462).then((value: any) => console.log(462));
      this.requester.makeStructureRequest(462).then((value: any) => console.log(462));

    });
  };
}

export default Client;
