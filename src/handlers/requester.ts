import Connection from "./connection";
import { CDPValueType, ChildAdd, ChildRemove, Container, Container_Type, ValueRequest, VariantValue } from "../models/studio.proto";
import { v4 as uuidv4 } from 'uuid';

export type RequesterCallback = {
  key: string,
  callback: (value?: any) => void
}

class Requester {
  private connection: Connection;
  private nodes: Map<number, any>

  constructor(connection: Connection, nodes: Map<number, any>) {
    this.nodes = nodes;
    this.connection = connection;
  }

  public makeStructureRequest = (id: number) => {
    return new Promise((resolve) => {
      const key = uuidv4();

      const callback = (_key: string, value: any) => {
        if (_key != key) {
          return;
        }

        const callbacks = this.nodes.get(id) ?? []
        this.nodes.set(id, callbacks.filter((c: any) => c.key != key))
        resolve(value)
      }

      const callbacks = this.nodes.get(id) ?? []
      this.nodes.set(id, [...callbacks, { key, callback }])

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

  public makeSetRequest = (id: number, type: CDPValueType, value: any, timestamp?: number) => {
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
