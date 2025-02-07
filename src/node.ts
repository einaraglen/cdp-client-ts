import { CDPNodeType, CDPValueType, Node, VariantValue } from "./studio.proto"
import { Connection } from "./connection"
import { FindChildrenFunction } from "./tree"

export type CDPValue = string | number | boolean | undefined | null;
export type SubscribedCallback = (value: VariantValue) => void

export class StudioNode {
    private route_: string
    private name_: string
    private nodeId_: number

    private nodeType_: CDPNodeType
    private valueType_: CDPValueType
    private typeName_: string
    private lastValue_: VariantValue | null = null

    private connection: Connection;
    private findChildren: FindChildrenFunction

    constructor(base: Node, route: string, connection: Connection, findChildren: FindChildrenFunction) {
        this.connection = connection;
        this.findChildren = findChildren;

        this.route_ = route;
        this.name_ = base.info!.name;
        this.nodeId_ = base.info!.nodeId;
        this.nodeType_ = base.info!.nodeType;
        this.valueType_ = base.info!.valueType;
        this.typeName_ = base.info!.typeName;

        this.connection.emitter.on(`value-${this.nodeId_}`, this.listenToValue)
        this.connection.getValue(this.nodeId_)
    }

    public getChildren() {
        return this.findChildren(this.route)
    }

    public subscribeToValue(callback: SubscribedCallback) {
        this.connection.emitter.on(`value-${this.nodeId_}`, callback)
    }

    public unsubscribeToValue(callback: SubscribedCallback) {
        this.connection.emitter.off(`value-${this.nodeId_}`, callback)
    }

    public setValue(value: CDPValue) {
        this.connection.setValue(this.nodeId_, this.getSendValue(value))
    }

    public get route() {
        return this.route_
    }

    public get name() {
        return this.name_;
    }

    public get nodeId() {
        return this.nodeId_;
    }

    public get nodeType() {
        return this.nodeType_;
    }

    public get typeName() {
        return this.typeName_;
    }

    public get lastValue() {
        return this.lastValue_;
    }

    private listenToValue = (value: VariantValue) => {
        this.lastValue_ = value;
    }

    public getVariantValue(variant: VariantValue) {
        switch (this.valueType_) {
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
                return null
        }
    }

    private getSendValue(value: CDPValue) {
        const tmp: VariantValue = {}

        switch (this.valueType_) {
            case CDPValueType.eDOUBLE:
                tmp["dValue"] = value as number;
                break;
            case CDPValueType.eFLOAT:
                tmp["fValue"] = value as number;
                break;
            case CDPValueType.eUINT64:
                tmp["ui64Value"] = value as number;
                break;
            case CDPValueType.eINT64:
                tmp["i64Value"] = value as number;
                break;
            case CDPValueType.eUINT:
                tmp["uiValue"] = value as number;
                break;
            case CDPValueType.eINT:
                tmp["iValue"] = value as number;
                break;
            case CDPValueType.eUSHORT:
                tmp["usValue"] = value as number;
                break;
            case CDPValueType.eSHORT:
                tmp["sValue"] = value as number;
                break;
            case CDPValueType.eUCHAR:
                tmp["ucValue"] = value as number;
                break;
            case CDPValueType.eCHAR:
                tmp["cValue"] = value as number;
                break;
            case CDPValueType.eBOOL:
                tmp["bValue"] = value as boolean;
                break;
            case CDPValueType.eSTRING:
                tmp["strValue"] = value as string;
                break;
            default:
                throw new Error(`Unrecognized Variant: ${this.valueType_}`);
        }

        return tmp;
    }
}