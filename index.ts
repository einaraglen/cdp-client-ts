// @ts-ignore
import studio from "cdp-client";

export type Studio = {
  api: StudioAPI;
  protocol: StudioProtocol;
  internal: StudioInternal;
};

export type StudioInternal = {
  AppConnection: (url: string, listener?: any) => void;
};

export type StudioProtocol = {
  CDPNodeType: NodeType;
  CDPValueType: ValueType;
  InfoFlags: InfoFlags;
  RemoteErrorCode: RemoteErrorCode;
  AuthResponseAuthResultCode: AuthResponseAuthResultCode;
  ContainerType: ContainerType;
  BINARY_TYPE: "arraybuffer";
  SYSTEM_NODE_ID: 0;
  WSS_PREFIX: "wss://";
  WS_PREFIX: "ws://";
  AdditionalChallengeResponseRequired: (values: any, var_args: Record<string, any>) => void;
  AuthRequest: (values: any, var_args: Record<string, any>) => void;
  AuthRequestChallengeResponse: (values: any, var_args: Record<string, any>) => void;
  AuthResponse: (values: any, var_args: Record<string, any>) => void;
  ChildAdd: (values: any, var_args: Record<string, any>) => void;
  ChildRemove: (vvalues: any, var_args: Record<string, any>) => void;
  Container: (values: any, var_args: Record<string, any>) => void;
  CreateAuthRequest: (dict: Record<string, any>, challenge: any) => void;
  Error: (values: any, var_args: Record<string, any>) => void;
  Handler: (socket: WebSocket, notificationListener?: any) => void;
  Hello: (values: any, var_args: Record<string, any>) => void;
  Info: (values: any, var_args: Record<string, any>) => void;
  Node: (values: any, var_args: Record<string, any>) => void;
  ValueRequest: (values: any, var_args: Record<string, any>) => void;
  VariantValue: (values: any, var_args: Record<string, any>) => void;
  appendBuffer: (array1: any[], array2: any[]) => void;
  valueFromVariant: (variantValue: any, type: any) => void;
  valueToVariant: (variantValue: any, type: any, value: any) => void;
};

export type StudioAPI = {
  Client: (url: string, listener?: any) => StudioClient;
  Request: (name: string, appliction: string, version: string, listener?: any, result?: any) => any;
  UserAuthResult: (code: number, text: string, credentials: Record<string, any>) => any;
  GRANTED: 1;
  CREDENTIALS_REQUIRED: 0;
  GRANTED_PASSWORD_WILL_EXPIRE_SOON: 2;
  NEW_PASSWORD_REQUIRED: 10;
  INVALID_CHALLENGE_RESPONSE: 11;
  ADDITIONAL_RESPONSE_REQUIRED: 12;
  TEMPORARILY_BLOCKED: 13;
  REAUTHENTICATION_REQUIRED: 14;
};

export type StudioClient = {
  root: () => Promise<StudioNode>;
  find: (route: string) => Promise<StudioNode>;
};

export type SubscriberCallback = (value: any, timestamp?: number) => void;

export type StudioNode = {
  addChild: (name: string, typeName: string) => Promise<void>;
  removeChild: (name: string) => Promise<void>;
  unsubscribeFromEvent: (callback: SubscriberCallback) => void;
  subscribeToEvents: (callback: SubscriberCallback) => void;
  unsubscribeFromStructure: (callback: SubscriberCallback) => void;
  subscribeToStructure: (callback: SubscriberCallback) => void;
  unsubscribeFromChildValues: (callback: SubscriberCallback) => void;
  subscribeToChildValues: (callback: SubscriberCallback) => void;
  unsubscribeFromValues: (callback: SubscriberCallback) => void;
  subscribeToValues: (callback: SubscriberCallback) => void;
  child: (name: string) => Promise<StudioNode>;
  forEachChild: (callback: (child: StudioNode) => void) => void;
  setValue: (value: any) => void;
  lastValue: () => any;
  info: () => StudioNodeInfo;
  name: () => string;
};

export type StudioNodeInfo = {
  node_id: number;
  name: string;
  node_type: NodeTypeEnum;
  value_type: ValueTypeEnum;
  type_name: string;
  server_addr: string;
  server_port: number;
  is_local: boolean;
  flags: InfoFlags;
};

enum NodeTypeEnum {
  CDP_APPLICATION = 1,
  CDP_BASE_OBJECT = 5,
  CDP_COMPONENT = 2,
  CDP_ENUM = 8,
  CDP_MESSAGE = 4,
  CDP_NODE = 10,
  CDP_OBJECT = 3,
  CDP_OPERATOR = 9,
  CDP_PROPERTY = 6,
  CDP_SETTING = 7,
  CDP_SYSTEM = 0,
  CDP_UNDEFINED = -1,
  CDP_USER_TYPE = 100,
}

export type NodeType = {
  CDP_APPLICATION: 1;
  CDP_BASE_OBJECT: 5;
  CDP_COMPONENT: 2;
  CDP_ENUM: 8;
  CDP_MESSAGE: 4;
  CDP_NODE: 10;
  CDP_OBJECT: 3;
  CDP_OPERATOR: 9;
  CDP_PROPERTY: 6;
  CDP_SETTING: 7;
  CDP_SYSTEM: 0;
  CDP_UNDEFINED: -1;
  CDP_USER_TYPE: 100;
};

export enum ValueTypeEnum {
  eBOOL = 11,
  eCHAR = 10,
  eDOUBLE = 1,
  eFLOAT = 4,
  eINT = 6,
  eINT64 = 3,
  eSHORT = 8,
  eSTRING = 12,
  eUCHAR = 9,
  eUINT = 5,
  eUINT64 = 2,
  eUNDEFINED = 0,
  eUSERTYPE = 100,
  eUSHORT = 7,
}

export type ValueType = {
  eBOOL: 11;
  eCHAR: 10;
  eDOUBLE: 1;
  eFLOAT: 4;
  eINT: 6;
  eINT64: 3;
  eSHORT: 8;
  eSTRING: 12;
  eUCHAR: 9;
  eUINT: 5;
  eUINT64: 2;
  eUNDEFINED: 0;
  eUSERTYPE: 100;
  eUSHORT: 7;
};

export type InfoFlags = {
  eNodeCanAddChildren: 16;
  eNodeIsImportant: 128;
  eNodeIsInternal: 64;
  eNodeIsLeaf: 1;
  eNodeIsRemovable: 8;
  eNodeIsRenamable: 32;
  eNone: 0;
  eValueIsPersistent: 2;
  eValueIsReadOnly: 4;
};

export type RemoteErrorCode = {
  eAUTH_RESPONSE_EXPIRED: 1;
  eCHILD_ADD_FAILED: 40;
  eCHILD_REMOVE_FAILED: 50;
  eINVALID_REQUEST: 10;
  eUNSUPPORTED_CONTAINER_TYPE: 20;
  eVALUE_THROTTLING_OCCURRING: 30;
  eVALUE_THROTTLING_STOPPED: 31;
};

export type AuthResponseAuthResultCode = {
  eAdditionalResponseRequired: 12;
  eGranted: 1;
  eGrantedPasswordWillExpireSoon: 2;
  eInvalidChallengeResponse: 11;
  eNewPasswordRequired: 10;
  eReauthenticationRequired: 14;
  eTemporarilyBlocked: 13;
  eUnknown: 0;
};

export type ContainerType = {
  eActivityNotification: 13;
  eChildAddRequest: 9;
  eChildRemoveRequest: 10;
  eCurrentTimeRequest: 7;
  eCurrentTimeResponse: 8;
  eGetterRequest: 3;
  eGetterResponse: 4;
  eReauthRequest: 11;
  eReauthResponse: 12;
  eRemoteError: 0;
  eSetterRequest: 5;
  eStructureChangeResponse: 6;
  eStructureRequest: 1;
  eStructureResponse: 2;
};

export default studio as Studio;
