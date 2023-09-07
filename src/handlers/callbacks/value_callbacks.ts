import { CDPValueType, VariantValue } from "../../models/studio.proto";
import Requester from "../requester";

type Callback = (value?: any) => void;

class ValueCallbacks {
  private static _instance: ValueCallbacks | null = null;
  private requester: Requester;
  private nodes: Map<number, { type: CDPValueType; callbacks: Set<Callback> }>;
  private active: Set<number>;

  private constructor() {
    this.nodes = new Map();
    this.active = new Set();
    this.requester = Requester.instance();
  }

  public static instance = () => {
    if (ValueCallbacks._instance == null) {
      ValueCallbacks._instance = new ValueCallbacks();
    }

    return ValueCallbacks._instance;
  };

  public runCallbacks = (id: number, value?: any) => {
    if (!this.nodes.has(id)) {
      return;
    }
    const { type, callbacks } = this.nodes.get(id)!;
    callbacks.forEach((callback) => {
      callback(this.getValueOfVariant(value, type));
    });
  };

  public registerCallback = (id: number, type: CDPValueType, callback: Callback) => {
    const registered = this.nodes.has(id) ? this.nodes.get(id)! : { type, callbacks: new Set<Callback>() };
    registered.callbacks.add(callback);
    this.nodes.set(id, registered);

    this.checkStart(id);
  };

  public unregisterCallback = (id: number, callback: (value?: any) => void) => {
    if (this.nodes.has(id)) {
      const registered = this.nodes.get(id)!;
      registered.callbacks.delete(callback);
      this.nodes.set(id, registered);
    }

    this.checkStop(id);
  };

  private checkStart = (id: number) => {
    if (!this.active.has(id)) {
      this.active.add(id);
      this.requester.makeGetterRequest(id, 1, 0, false);
    }
  };

  private checkStop = (id: number) => {
    if (!this.nodes.has(id)) {
      return;
    }

    if (this.nodes.get(id)!.callbacks.entries.length == 0 && this.active.has(id)) {
      this.active.delete(id);
      this.requester.makeGetterRequest(id, 1, 0, true);
    }

  };

  private getValueOfVariant = (variant: VariantValue, type: CDPValueType) => {
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

export default ValueCallbacks;
