import Connection from "./connection";
import { Node } from "./studio.proto"

class Client {
    private connection: Connection;

    constructor(url: string) {
        this.connection = new Connection(url);
        this.connection.onSocketClose = this.onClose;
        this.connection.onSocketMessage = this.onMessage;
        this.connection.connect();
    }

    isConnected = () => {
        return this.connection.connected;
    }

    onMessage = (payload: Node) => {
        payload.info
    }

    onClose = () => {
        setTimeout(this.connection.connect, 3e2)
        this.connection.connect()
    }
    
}

export default Client;