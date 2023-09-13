import { Container, VariantValue, Node, Container_Type, Error as ProtoError, AuthResponse } from "../models/studio.proto";
import StructureCallbacks from "./callbacks/structure_callbacks"
import ValueCallbacks from "./callbacks/value_callbacks";
import Connection from "./connection";

class Receiver {

  private structureCallbacks: StructureCallbacks
  private valueCallbacks: ValueCallbacks

  constructor() {
    this.structureCallbacks = StructureCallbacks.instance()
    this.valueCallbacks = ValueCallbacks.instance()
  }

  public onMessage = (event: MessageEvent<ArrayBuffer>) => {
    const decoded = Container.decode(new Uint8Array(event.data));
    switch (decoded.messageType) {
      case Container_Type.eStructureResponse:
        this.parseStructureResponse(decoded.structureResponse);
        break;
      case Container_Type.eGetterResponse:
        this.parseGetterResponse(decoded.getterResponse);
        break;
      case Container_Type.eStructureChangeResponse:
        this.parseStructureChangeResponse(decoded.structureChangeResponse);
        break;
      case Container_Type.eReauthResponse:
        this.parseReauthResponse(decoded.reAuthResponse!);
        break;
      case Container_Type.eRemoteError:
        this.parseErrorResponse(decoded.error!);
        break;
      default:
        throw new Error("Unrecognized Container Type");
    }
  };

  private parseStructureResponse = (values: Node[]) => {
    values.forEach((node) => {
      const id = node.info?.nodeId!
      this.structureCallbacks.runCallbacks(id, node)
    });
  };

  private parseGetterResponse = (values: VariantValue[]) => {
    values.forEach((value) => {
      const id = value.nodeId!
      this.valueCallbacks.runCallbacks(id, value)
    })
  };

  private parseStructureChangeResponse = (values: number[]) => {
    const connection = Connection.instance()
    const error = ProtoError.create({ text: "Unimplemented StructureChangeResponse", code: 501 })
    connection.emit("error", error)
  };

  private parseReauthResponse = (response: AuthResponse) => {
    const connection = Connection.instance()
    const error = ProtoError.create({ text: "Unimplemented ReauthResponse", code: response.resultCode })
    connection.emit("error", error)
  };

  private parseErrorResponse = (error: ProtoError) => {
    const connection = Connection.instance()
    connection.emit("error", error)
  };

}

export default Receiver;
