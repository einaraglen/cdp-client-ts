import Connection from "./connection";
import { CDPValueType, ChildAdd, ChildRemove, Container, Container_Type, ValueRequest, VariantValue, Node } from "../models/studio.proto";
import StructureCallbacks from "./callbacks/structure_callbacks";

export type RequesterCallback = {
  key: string,
  callback: (value?: any) => void
}

class Requester {
  private static _instance: Requester | null = null;
  private connection: Connection;
  private callbacks: StructureCallbacks

  private constructor() {
    this.callbacks = StructureCallbacks.instance()
    this.connection = Connection.instance();
  }

  public static instance = () => {
    if (Requester._instance == null) {
      Requester._instance = new Requester()
    }

    return Requester._instance
}

  public makeStructureRequest = (id: number) => {
    return new Promise<Node>((resolve) => {
      this.callbacks.registerCallback(id, resolve)
      const message = Container.create({ messageType: Container_Type.eStructureRequest, structureRequest: [id] });
      this.connection.send(Container.encode(message).finish());
    })
 
  };

  public makeGetterRequest = (id: number, fs: number, sampleRate?: number, stop?: boolean) => {
    const request = ValueRequest.create({ nodeId: id, fs, sampleRate, stop });
    const message = Container.create({ messageType: Container_Type.eGetterRequest, getterRequest: [request] });
    this.connection.send(Container.encode(message).finish());
  };

  public makeChildAddRequest = (id: number, name: string, model: string) => {
    const request = ChildAdd.create({ parentNodeId: id, childName: name, childTypeName: model });
    const message = Container.create({ messageType: Container_Type.eChildAddRequest, childAddRequest: [request] });
    this.connection.send(Container.encode(message).finish());
  };

  public makeChildRemoveRequest = (id: number, name: string) => {
    const request = ChildRemove.create({ parentNodeId: id, childName: name });
    const message = Container.create({ messageType: Container_Type.eChildRemoveRequest, childRemoveRequest: [request] });
    this.connection.send(Container.encode(message).finish());
  };

  public makeSetRequest = (id: number, type: CDPValueType, value: any, timestamp = Date.now()) => {
    const request = VariantValue.create({ nodeId: id, timestamp });
    this.setValueOfVariant(request, type, value);
    const message = Container.create({ messageType: Container_Type.eSetterRequest, setterRequest: [request] });
    this.connection.send(Container.encode(message).finish());
  };

  private setValueOfVariant = (variant: VariantValue, type: CDPValueType, value: any) => {
    switch (type) {
      case CDPValueType.eDOUBLE:
        variant.dValue = value;
        break;
      case CDPValueType.eFLOAT:
        variant.fValue = value;
        break;
      case CDPValueType.eUINT64:
        variant.ui64Value = value;
        break;
      case CDPValueType.eINT64:
        variant.i64Value = value;
        break;
      case CDPValueType.eUINT:
        variant.uiValue = value;
        break;
      case CDPValueType.eINT:
        variant.iValue = value;
        break;
      case CDPValueType.eUSHORT:
        variant.usValue = value;
        break;
      case CDPValueType.eSHORT:
        variant.sValue = value;
        break;
      case CDPValueType.eUCHAR:
        variant.ucValue = value;
        break;
      case CDPValueType.eCHAR:
        variant.cValue = value;
        break;
      case CDPValueType.eBOOL:
        // TODO: why is false not being set when using boolean
        variant.bValue = value;
        break;
      case CDPValueType.eSTRING:
        variant.strValue = value;
        break;
      default:
        throw new Error("Unrecognized Variant");
    }
  };
}

export default Requester;
