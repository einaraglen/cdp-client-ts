import { Container, VariantValue, Node, Container_Type, Error as ProtoError, AuthResponse, CDPValueType } from "../models/studio.proto";

class Receiver {
  private nodes: Map<number, any>

  constructor(nodes: Map<number, any>) {
    this.nodes = nodes;
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
      if (this.nodes.has(node.info?.nodeId!)) {
        const callbacks = this.nodes.get(node.info?.nodeId!)
        callbacks.forEach((callback: any) => callback(node))
      }
    });
  };

  private parseGetterResponse = (values: VariantValue[]) => {
    console.log(values);
  };

  private parseStructureChangeResponse = (values: number[]) => {
    console.log(values);
  };

  private parseReauthResponse = (response: AuthResponse) => {
    console.log(response);
  };

  private parseErrorResponse = (error: ProtoError) => {
    console.log(error);
  };

  private getValueOfVarian = (variant: VariantValue, type: CDPValueType) => {
    switch (type) {
      case CDPValueType.eDOUBLE:
        return variant.dValue;
      case CDPValueType.eFLOAT:
        return variant.fValue;
      case CDPValueType.eUINT64:
        return variant.ui64Value;
      case CDPValueType.eINT64:
        return variant.i64Value;
      case CDPValueType.eUINT:
        return variant.uiValue;
      case CDPValueType.eINT:
        return variant.iValue;
      case CDPValueType.eUSHORT:
        return variant.usValue;
      case CDPValueType.eSHORT:
        return variant.sValue;
      case CDPValueType.eUCHAR:
        return variant.ucValue;
      case CDPValueType.eCHAR:
        return variant.cValue;
      case CDPValueType.eBOOL:
        return variant.bValue;
      case CDPValueType.eSTRING:
        return variant.strValue;
      default:
        throw new Error("Unrecognized Variant");
    }
  };
}

export default Receiver;
