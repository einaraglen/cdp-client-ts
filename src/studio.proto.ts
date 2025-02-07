/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum RemoteErrorCode {
  /** eAUTH_RESPONSE_EXPIRED - connection is in non-authenticated state (e.g. because of session inactivity timeout) - */
  eAUTH_RESPONSE_EXPIRED = 1,
  /** eINVALID_REQUEST - full reconnect or new AuthRequest with ChallengeResponse is needed to continue */
  eINVALID_REQUEST = 10,
  eUNSUPPORTED_CONTAINER_TYPE = 20,
  eVALUE_THROTTLING_OCCURRING = 30,
  eVALUE_THROTTLING_STOPPED = 31,
  eCHILD_ADD_FAILED = 40,
  eCHILD_REMOVE_FAILED = 50,
  UNRECOGNIZED = -1,
}

export function remoteErrorCodeFromJSON(object: any): RemoteErrorCode {
  switch (object) {
    case 1:
    case "eAUTH_RESPONSE_EXPIRED":
      return RemoteErrorCode.eAUTH_RESPONSE_EXPIRED;
    case 10:
    case "eINVALID_REQUEST":
      return RemoteErrorCode.eINVALID_REQUEST;
    case 20:
    case "eUNSUPPORTED_CONTAINER_TYPE":
      return RemoteErrorCode.eUNSUPPORTED_CONTAINER_TYPE;
    case 30:
    case "eVALUE_THROTTLING_OCCURRING":
      return RemoteErrorCode.eVALUE_THROTTLING_OCCURRING;
    case 31:
    case "eVALUE_THROTTLING_STOPPED":
      return RemoteErrorCode.eVALUE_THROTTLING_STOPPED;
    case 40:
    case "eCHILD_ADD_FAILED":
      return RemoteErrorCode.eCHILD_ADD_FAILED;
    case 50:
    case "eCHILD_REMOVE_FAILED":
      return RemoteErrorCode.eCHILD_REMOVE_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RemoteErrorCode.UNRECOGNIZED;
  }
}

export function remoteErrorCodeToJSON(object: RemoteErrorCode): string {
  switch (object) {
    case RemoteErrorCode.eAUTH_RESPONSE_EXPIRED:
      return "eAUTH_RESPONSE_EXPIRED";
    case RemoteErrorCode.eINVALID_REQUEST:
      return "eINVALID_REQUEST";
    case RemoteErrorCode.eUNSUPPORTED_CONTAINER_TYPE:
      return "eUNSUPPORTED_CONTAINER_TYPE";
    case RemoteErrorCode.eVALUE_THROTTLING_OCCURRING:
      return "eVALUE_THROTTLING_OCCURRING";
    case RemoteErrorCode.eVALUE_THROTTLING_STOPPED:
      return "eVALUE_THROTTLING_STOPPED";
    case RemoteErrorCode.eCHILD_ADD_FAILED:
      return "eCHILD_ADD_FAILED";
    case RemoteErrorCode.eCHILD_REMOVE_FAILED:
      return "eCHILD_REMOVE_FAILED";
    case RemoteErrorCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** CDP Node base type identifier. */
export enum CDPNodeType {
  CDP_UNDEFINED = -1,
  CDP_SYSTEM = 0,
  CDP_APPLICATION = 1,
  CDP_COMPONENT = 2,
  CDP_OBJECT = 3,
  CDP_MESSAGE = 4,
  CDP_BASE_OBJECT = 5,
  CDP_PROPERTY = 6,
  CDP_SETTING = 7,
  CDP_ENUM = 8,
  CDP_OPERATOR = 9,
  CDP_NODE = 10,
  CDP_USER_TYPE = 100,
  UNRECOGNIZED = -1,
}

export function cDPNodeTypeFromJSON(object: any): CDPNodeType {
  switch (object) {
    case -1:
    case "CDP_UNDEFINED":
      return CDPNodeType.CDP_UNDEFINED;
    case 0:
    case "CDP_SYSTEM":
      return CDPNodeType.CDP_SYSTEM;
    case 1:
    case "CDP_APPLICATION":
      return CDPNodeType.CDP_APPLICATION;
    case 2:
    case "CDP_COMPONENT":
      return CDPNodeType.CDP_COMPONENT;
    case 3:
    case "CDP_OBJECT":
      return CDPNodeType.CDP_OBJECT;
    case 4:
    case "CDP_MESSAGE":
      return CDPNodeType.CDP_MESSAGE;
    case 5:
    case "CDP_BASE_OBJECT":
      return CDPNodeType.CDP_BASE_OBJECT;
    case 6:
    case "CDP_PROPERTY":
      return CDPNodeType.CDP_PROPERTY;
    case 7:
    case "CDP_SETTING":
      return CDPNodeType.CDP_SETTING;
    case 8:
    case "CDP_ENUM":
      return CDPNodeType.CDP_ENUM;
    case 9:
    case "CDP_OPERATOR":
      return CDPNodeType.CDP_OPERATOR;
    case 10:
    case "CDP_NODE":
      return CDPNodeType.CDP_NODE;
    case 100:
    case "CDP_USER_TYPE":
      return CDPNodeType.CDP_USER_TYPE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CDPNodeType.UNRECOGNIZED;
  }
}

export function cDPNodeTypeToJSON(object: CDPNodeType): string {
  switch (object) {
    case CDPNodeType.CDP_UNDEFINED:
      return "CDP_UNDEFINED";
    case CDPNodeType.CDP_SYSTEM:
      return "CDP_SYSTEM";
    case CDPNodeType.CDP_APPLICATION:
      return "CDP_APPLICATION";
    case CDPNodeType.CDP_COMPONENT:
      return "CDP_COMPONENT";
    case CDPNodeType.CDP_OBJECT:
      return "CDP_OBJECT";
    case CDPNodeType.CDP_MESSAGE:
      return "CDP_MESSAGE";
    case CDPNodeType.CDP_BASE_OBJECT:
      return "CDP_BASE_OBJECT";
    case CDPNodeType.CDP_PROPERTY:
      return "CDP_PROPERTY";
    case CDPNodeType.CDP_SETTING:
      return "CDP_SETTING";
    case CDPNodeType.CDP_ENUM:
      return "CDP_ENUM";
    case CDPNodeType.CDP_OPERATOR:
      return "CDP_OPERATOR";
    case CDPNodeType.CDP_NODE:
      return "CDP_NODE";
    case CDPNodeType.CDP_USER_TYPE:
      return "CDP_USER_TYPE";
    case CDPNodeType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** CDP Node value type identifier. */
export enum CDPValueType {
  eUNDEFINED = 0,
  eDOUBLE = 1,
  eUINT64 = 2,
  eINT64 = 3,
  eFLOAT = 4,
  eUINT = 5,
  eINT = 6,
  eUSHORT = 7,
  eSHORT = 8,
  eUCHAR = 9,
  eCHAR = 10,
  eBOOL = 11,
  eSTRING = 12,
  eUSERTYPE = 100,
  UNRECOGNIZED = -1,
}

export function cDPValueTypeFromJSON(object: any): CDPValueType {
  switch (object) {
    case 0:
    case "eUNDEFINED":
      return CDPValueType.eUNDEFINED;
    case 1:
    case "eDOUBLE":
      return CDPValueType.eDOUBLE;
    case 2:
    case "eUINT64":
      return CDPValueType.eUINT64;
    case 3:
    case "eINT64":
      return CDPValueType.eINT64;
    case 4:
    case "eFLOAT":
      return CDPValueType.eFLOAT;
    case 5:
    case "eUINT":
      return CDPValueType.eUINT;
    case 6:
    case "eINT":
      return CDPValueType.eINT;
    case 7:
    case "eUSHORT":
      return CDPValueType.eUSHORT;
    case 8:
    case "eSHORT":
      return CDPValueType.eSHORT;
    case 9:
    case "eUCHAR":
      return CDPValueType.eUCHAR;
    case 10:
    case "eCHAR":
      return CDPValueType.eCHAR;
    case 11:
    case "eBOOL":
      return CDPValueType.eBOOL;
    case 12:
    case "eSTRING":
      return CDPValueType.eSTRING;
    case 100:
    case "eUSERTYPE":
      return CDPValueType.eUSERTYPE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CDPValueType.UNRECOGNIZED;
  }
}

export function cDPValueTypeToJSON(object: CDPValueType): string {
  switch (object) {
    case CDPValueType.eUNDEFINED:
      return "eUNDEFINED";
    case CDPValueType.eDOUBLE:
      return "eDOUBLE";
    case CDPValueType.eUINT64:
      return "eUINT64";
    case CDPValueType.eINT64:
      return "eINT64";
    case CDPValueType.eFLOAT:
      return "eFLOAT";
    case CDPValueType.eUINT:
      return "eUINT";
    case CDPValueType.eINT:
      return "eINT";
    case CDPValueType.eUSHORT:
      return "eUSHORT";
    case CDPValueType.eSHORT:
      return "eSHORT";
    case CDPValueType.eUCHAR:
      return "eUCHAR";
    case CDPValueType.eCHAR:
      return "eCHAR";
    case CDPValueType.eBOOL:
      return "eBOOL";
    case CDPValueType.eSTRING:
      return "eSTRING";
    case CDPValueType.eUSERTYPE:
      return "eUSERTYPE";
    case CDPValueType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Initial server connection response. */
export interface Hello {
  systemName: string;
  compatVersion: number;
  incrementalVersion: number;
  publicKey: Uint8Array[];
  /** if challenge exists then server expects authentication (AuthRequest message) */
  challenge: Uint8Array;
  applicationName: string;
  cdpVersionMajor: number;
  cdpVersionMinor: number;
  cdpVersionPatch: number;
  idleLockoutPeriod: number;
  systemUseNotification: string;
}

/** Server expects this response if it sent a auth_required true. */
export interface AuthRequest {
  /** case-insensitive (can be sent in any casing) */
  userId: string;
  challengeResponse: AuthRequest_ChallengeResponse[];
}

export interface AuthRequest_ChallengeResponse {
  type: string;
  /** data corresponding to the type, eg. hash(challenge + password) */
  response: Uint8Array;
}

export interface AdditionalChallengeResponseRequired {
  type: string;
  prompt: string;
  parameter: AdditionalChallengeResponseRequired_Parameter[];
}

export interface AdditionalChallengeResponseRequired_Parameter {
  name: string;
  value: string;
}

/** Sent by server as a response to a AuthRequest. */
export interface AuthResponse {
  resultCode: AuthResponse_AuthResultCode;
  resultText: string;
  additionalChallengeResponseRequired: AdditionalChallengeResponseRequired[];
}

export enum AuthResponse_AuthResultCode {
  eUnknown = 0,
  eGranted = 1,
  /** eGrantedPasswordWillExpireSoon - expiry timestamp is provided in result_text */
  eGrantedPasswordWillExpireSoon = 2,
  /** eNewPasswordRequired - AuthRequest with additional response with new username + password hash is required */
  eNewPasswordRequired = 10,
  /** eInvalidChallengeResponse - challenge response sent was invalid */
  eInvalidChallengeResponse = 11,
  /** eAdditionalResponseRequired - additional challenge responses based on additional credential types are required */
  eAdditionalResponseRequired = 12,
  /** eTemporarilyBlocked - authentication is temporarily blocked because of too many failed attempts */
  eTemporarilyBlocked = 13,
  /** eReauthenticationRequired - server requires re-authentication (e.g. because of being idle), implementation */
  eReauthenticationRequired = 14,
  UNRECOGNIZED = -1,
}

export function authResponse_AuthResultCodeFromJSON(object: any): AuthResponse_AuthResultCode {
  switch (object) {
    case 0:
    case "eUnknown":
      return AuthResponse_AuthResultCode.eUnknown;
    case 1:
    case "eGranted":
      return AuthResponse_AuthResultCode.eGranted;
    case 2:
    case "eGrantedPasswordWillExpireSoon":
      return AuthResponse_AuthResultCode.eGrantedPasswordWillExpireSoon;
    case 10:
    case "eNewPasswordRequired":
      return AuthResponse_AuthResultCode.eNewPasswordRequired;
    case 11:
    case "eInvalidChallengeResponse":
      return AuthResponse_AuthResultCode.eInvalidChallengeResponse;
    case 12:
    case "eAdditionalResponseRequired":
      return AuthResponse_AuthResultCode.eAdditionalResponseRequired;
    case 13:
    case "eTemporarilyBlocked":
      return AuthResponse_AuthResultCode.eTemporarilyBlocked;
    case 14:
    case "eReauthenticationRequired":
      return AuthResponse_AuthResultCode.eReauthenticationRequired;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthResponse_AuthResultCode.UNRECOGNIZED;
  }
}

export function authResponse_AuthResultCodeToJSON(object: AuthResponse_AuthResultCode): string {
  switch (object) {
    case AuthResponse_AuthResultCode.eUnknown:
      return "eUnknown";
    case AuthResponse_AuthResultCode.eGranted:
      return "eGranted";
    case AuthResponse_AuthResultCode.eGrantedPasswordWillExpireSoon:
      return "eGrantedPasswordWillExpireSoon";
    case AuthResponse_AuthResultCode.eNewPasswordRequired:
      return "eNewPasswordRequired";
    case AuthResponse_AuthResultCode.eInvalidChallengeResponse:
      return "eInvalidChallengeResponse";
    case AuthResponse_AuthResultCode.eAdditionalResponseRequired:
      return "eAdditionalResponseRequired";
    case AuthResponse_AuthResultCode.eTemporarilyBlocked:
      return "eTemporarilyBlocked";
    case AuthResponse_AuthResultCode.eReauthenticationRequired:
      return "eReauthenticationRequired";
    case AuthResponse_AuthResultCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Common union-style base type for all Protobuf messages in StudioAPI. */
export interface Container {
  messageType: Container_Type;
  error: Error | undefined;
  structureRequest: number[];
  structureResponse: Node[];
  getterRequest: ValueRequest[];
  getterResponse: VariantValue[];
  setterRequest: VariantValue[];
  /** node ID's which need new structure requests */
  structureChangeResponse: number[];
  currentTimeResponse: number;
  childAddRequest: ChildAdd[];
  childRemoveRequest: ChildRemove[];
  reAuthRequest: AuthRequest | undefined;
  reAuthResponse: AuthResponse | undefined;
}

export enum Container_Type {
  eRemoteError = 0,
  eStructureRequest = 1,
  eStructureResponse = 2,
  eGetterRequest = 3,
  eGetterResponse = 4,
  eSetterRequest = 5,
  eStructureChangeResponse = 6,
  eCurrentTimeRequest = 7,
  eCurrentTimeResponse = 8,
  eChildAddRequest = 9,
  eChildRemoveRequest = 10,
  eReauthRequest = 11,
  eReauthResponse = 12,
  eActivityNotification = 13,
  UNRECOGNIZED = -1,
}

export function container_TypeFromJSON(object: any): Container_Type {
  switch (object) {
    case 0:
    case "eRemoteError":
      return Container_Type.eRemoteError;
    case 1:
    case "eStructureRequest":
      return Container_Type.eStructureRequest;
    case 2:
    case "eStructureResponse":
      return Container_Type.eStructureResponse;
    case 3:
    case "eGetterRequest":
      return Container_Type.eGetterRequest;
    case 4:
    case "eGetterResponse":
      return Container_Type.eGetterResponse;
    case 5:
    case "eSetterRequest":
      return Container_Type.eSetterRequest;
    case 6:
    case "eStructureChangeResponse":
      return Container_Type.eStructureChangeResponse;
    case 7:
    case "eCurrentTimeRequest":
      return Container_Type.eCurrentTimeRequest;
    case 8:
    case "eCurrentTimeResponse":
      return Container_Type.eCurrentTimeResponse;
    case 9:
    case "eChildAddRequest":
      return Container_Type.eChildAddRequest;
    case 10:
    case "eChildRemoveRequest":
      return Container_Type.eChildRemoveRequest;
    case 11:
    case "eReauthRequest":
      return Container_Type.eReauthRequest;
    case 12:
    case "eReauthResponse":
      return Container_Type.eReauthResponse;
    case 13:
    case "eActivityNotification":
      return Container_Type.eActivityNotification;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Container_Type.UNRECOGNIZED;
  }
}

export function container_TypeToJSON(object: Container_Type): string {
  switch (object) {
    case Container_Type.eRemoteError:
      return "eRemoteError";
    case Container_Type.eStructureRequest:
      return "eStructureRequest";
    case Container_Type.eStructureResponse:
      return "eStructureResponse";
    case Container_Type.eGetterRequest:
      return "eGetterRequest";
    case Container_Type.eGetterResponse:
      return "eGetterResponse";
    case Container_Type.eSetterRequest:
      return "eSetterRequest";
    case Container_Type.eStructureChangeResponse:
      return "eStructureChangeResponse";
    case Container_Type.eCurrentTimeRequest:
      return "eCurrentTimeRequest";
    case Container_Type.eCurrentTimeResponse:
      return "eCurrentTimeResponse";
    case Container_Type.eChildAddRequest:
      return "eChildAddRequest";
    case Container_Type.eChildRemoveRequest:
      return "eChildRemoveRequest";
    case Container_Type.eReauthRequest:
      return "eReauthRequest";
    case Container_Type.eReauthResponse:
      return "eReauthResponse";
    case Container_Type.eActivityNotification:
      return "eActivityNotification";
    case Container_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Error message type. */
export interface Error {
  code: number;
  text: string;
  nodeId: number;
  parameter: string;
  /** new challenge for re-authentication, used with code = eAUTH_RESPONSE_EXPIRED */
  challenge: Uint8Array;
  /** updated value for idle lockout period, used with code = eAUTH_RESPONSE_EXPIRED */
  idleLockoutPeriod: number;
}

/** A single CDPNode property container. */
export interface Info {
  /** Application wide unique ID for each instance in CDP structure */
  nodeId: number;
  /** Local short name */
  name: string;
  /** Direct base type, type of the class */
  nodeType: CDPNodeType;
  /** Value primitive type the node holds if node may hold a value */
  valueType: CDPValueType;
  /** Real class name */
  typeName: string;
  /** If this node signifies another CDP application, */
  serverAddr: string;
  /** this field will be the IP of said application's StudioAPIServer */
  serverPort: number;
  /** if multiple applications are sent back from the server, */
  isLocal: boolean;
  /** this flag is set to true for the app that the data was requested from */
  flags: number;
}

export enum Info_Flags {
  eNone = 0,
  eNodeIsLeaf = 1,
  eValueIsPersistent = 2,
  eValueIsReadOnly = 4,
  eNodeIsRemovable = 8,
  eNodeCanAddChildren = 16,
  eNodeIsRenamable = 32,
  eNodeIsInternal = 64,
  eNodeIsImportant = 128,
  UNRECOGNIZED = -1,
}

export function info_FlagsFromJSON(object: any): Info_Flags {
  switch (object) {
    case 0:
    case "eNone":
      return Info_Flags.eNone;
    case 1:
    case "eNodeIsLeaf":
      return Info_Flags.eNodeIsLeaf;
    case 2:
    case "eValueIsPersistent":
      return Info_Flags.eValueIsPersistent;
    case 4:
    case "eValueIsReadOnly":
      return Info_Flags.eValueIsReadOnly;
    case 8:
    case "eNodeIsRemovable":
      return Info_Flags.eNodeIsRemovable;
    case 16:
    case "eNodeCanAddChildren":
      return Info_Flags.eNodeCanAddChildren;
    case 32:
    case "eNodeIsRenamable":
      return Info_Flags.eNodeIsRenamable;
    case 64:
    case "eNodeIsInternal":
      return Info_Flags.eNodeIsInternal;
    case 128:
    case "eNodeIsImportant":
      return Info_Flags.eNodeIsImportant;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Info_Flags.UNRECOGNIZED;
  }
}

export function info_FlagsToJSON(object: Info_Flags): string {
  switch (object) {
    case Info_Flags.eNone:
      return "eNone";
    case Info_Flags.eNodeIsLeaf:
      return "eNodeIsLeaf";
    case Info_Flags.eValueIsPersistent:
      return "eValueIsPersistent";
    case Info_Flags.eValueIsReadOnly:
      return "eValueIsReadOnly";
    case Info_Flags.eNodeIsRemovable:
      return "eNodeIsRemovable";
    case Info_Flags.eNodeCanAddChildren:
      return "eNodeCanAddChildren";
    case Info_Flags.eNodeIsRenamable:
      return "eNodeIsRenamable";
    case Info_Flags.eNodeIsInternal:
      return "eNodeIsInternal";
    case Info_Flags.eNodeIsImportant:
      return "eNodeIsImportant";
    case Info_Flags.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** CDP structure response data structure, a tree of Info properties. */
export interface Node {
  info: Info | undefined;
  node: Node[];
}

/** ChildAdd Request input structure */
export interface ChildAdd {
  /** parent to add the node into */
  parentNodeId: number;
  /** child name to be added */
  childName: string;
  /** child class name */
  childTypeName: string;
}

/** ChildRemove Request input structure */
export interface ChildRemove {
  /** parent to remove the node from */
  parentNodeId: number;
  /** child to be removed */
  childName: string;
}

/** Common Variant value type for a remote node. */
export interface VariantValue {
  nodeId?: number;
  dValue?: number;
  fValue?: number;
  ui64Value?: number;
  i64Value?: number;
  uiValue?: number;
  iValue?: number;
  /** uint used as ushort (which protobuf doesnt have) */
  usValue?: number;
  /** int used as short */
  sValue?: number;
  /** uint used as uchar */
  ucValue?: number;
  /** int used as char */
  cValue?: number;
  bValue?: boolean;
  strValue?: string;
  /** Source may provide timestamp for sent value */
  timestamp?: number;
}

/** Single and periodic value request message. */
export interface ValueRequest {
  /** List of node IDs whose value are requested */
  nodeId: number;
  /** If present indicates that values expected no more often than provided FS rate */
  fs: number;
  /** (server will accumulate and time-stamp values if they occur more often) */
  stop: boolean;
  /** If non zero indicates that values should be */
  sampleRate: number;
}

function createBaseHello(): Hello {
  return {
    systemName: "",
    compatVersion: 0,
    incrementalVersion: 0,
    publicKey: [],
    challenge: new Uint8Array(),
    applicationName: "",
    cdpVersionMajor: 0,
    cdpVersionMinor: 0,
    cdpVersionPatch: 0,
    idleLockoutPeriod: 0,
    systemUseNotification: "",
  };
}

export const Hello = {
  encode(message: Hello, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.systemName !== "") {
      writer.uint32(10).string(message.systemName);
    }
    if (message.compatVersion !== 0) {
      writer.uint32(16).uint32(message.compatVersion);
    }
    if (message.incrementalVersion !== 0) {
      writer.uint32(24).uint32(message.incrementalVersion);
    }
    for (const v of message.publicKey) {
      writer.uint32(34).bytes(v!);
    }
    if (message.challenge.length !== 0) {
      writer.uint32(42).bytes(message.challenge);
    }
    if (message.applicationName !== "") {
      writer.uint32(50).string(message.applicationName);
    }
    if (message.cdpVersionMajor !== 0) {
      writer.uint32(56).uint32(message.cdpVersionMajor);
    }
    if (message.cdpVersionMinor !== 0) {
      writer.uint32(64).uint32(message.cdpVersionMinor);
    }
    if (message.cdpVersionPatch !== 0) {
      writer.uint32(72).uint32(message.cdpVersionPatch);
    }
    if (message.idleLockoutPeriod !== 0) {
      writer.uint32(80).uint32(message.idleLockoutPeriod);
    }
    if (message.systemUseNotification !== "") {
      writer.uint32(90).string(message.systemUseNotification);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Hello {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHello();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.systemName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.compatVersion = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.incrementalVersion = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.publicKey.push(reader.bytes());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.challenge = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.applicationName = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.cdpVersionMajor = reader.uint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.cdpVersionMinor = reader.uint32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.cdpVersionPatch = reader.uint32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.idleLockoutPeriod = reader.uint32();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.systemUseNotification = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Hello {
    return {
      systemName: isSet(object.systemName) ? String(object.systemName) : "",
      compatVersion: isSet(object.compatVersion) ? Number(object.compatVersion) : 0,
      incrementalVersion: isSet(object.incrementalVersion) ? Number(object.incrementalVersion) : 0,
      publicKey: Array.isArray(object?.publicKey) ? object.publicKey.map((e: any) => bytesFromBase64(e)) : [],
      challenge: isSet(object.challenge) ? bytesFromBase64(object.challenge) : new Uint8Array(),
      applicationName: isSet(object.applicationName) ? String(object.applicationName) : "",
      cdpVersionMajor: isSet(object.cdpVersionMajor) ? Number(object.cdpVersionMajor) : 0,
      cdpVersionMinor: isSet(object.cdpVersionMinor) ? Number(object.cdpVersionMinor) : 0,
      cdpVersionPatch: isSet(object.cdpVersionPatch) ? Number(object.cdpVersionPatch) : 0,
      idleLockoutPeriod: isSet(object.idleLockoutPeriod) ? Number(object.idleLockoutPeriod) : 0,
      systemUseNotification: isSet(object.systemUseNotification) ? String(object.systemUseNotification) : "",
    };
  },

  toJSON(message: Hello): unknown {
    const obj: any = {};
    message.systemName !== undefined && (obj.systemName = message.systemName);
    message.compatVersion !== undefined && (obj.compatVersion = Math.round(message.compatVersion));
    message.incrementalVersion !== undefined && (obj.incrementalVersion = Math.round(message.incrementalVersion));
    if (message.publicKey) {
      obj.publicKey = message.publicKey.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.publicKey = [];
    }
    message.challenge !== undefined &&
      (obj.challenge = base64FromBytes(message.challenge !== undefined ? message.challenge : new Uint8Array()));
    message.applicationName !== undefined && (obj.applicationName = message.applicationName);
    message.cdpVersionMajor !== undefined && (obj.cdpVersionMajor = Math.round(message.cdpVersionMajor));
    message.cdpVersionMinor !== undefined && (obj.cdpVersionMinor = Math.round(message.cdpVersionMinor));
    message.cdpVersionPatch !== undefined && (obj.cdpVersionPatch = Math.round(message.cdpVersionPatch));
    message.idleLockoutPeriod !== undefined && (obj.idleLockoutPeriod = Math.round(message.idleLockoutPeriod));
    message.systemUseNotification !== undefined && (obj.systemUseNotification = message.systemUseNotification);
    return obj;
  },

  create<I extends Exact<DeepPartial<Hello>, I>>(base?: I): Hello {
    return Hello.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Hello>, I>>(object: I): Hello {
    const message = createBaseHello();
    message.systemName = object.systemName ?? "";
    message.compatVersion = object.compatVersion ?? 0;
    message.incrementalVersion = object.incrementalVersion ?? 0;
    message.publicKey = object.publicKey?.map((e) => e) || [];
    message.challenge = object.challenge ?? new Uint8Array();
    message.applicationName = object.applicationName ?? "";
    message.cdpVersionMajor = object.cdpVersionMajor ?? 0;
    message.cdpVersionMinor = object.cdpVersionMinor ?? 0;
    message.cdpVersionPatch = object.cdpVersionPatch ?? 0;
    message.idleLockoutPeriod = object.idleLockoutPeriod ?? 0;
    message.systemUseNotification = object.systemUseNotification ?? "";
    return message;
  },
};

function createBaseAuthRequest(): AuthRequest {
  return { userId: "", challengeResponse: [] };
}

export const AuthRequest = {
  encode(message: AuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    for (const v of message.challengeResponse) {
      AuthRequest_ChallengeResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.challengeResponse.push(AuthRequest_ChallengeResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      challengeResponse: Array.isArray(object?.challengeResponse)
        ? object.challengeResponse.map((e: any) => AuthRequest_ChallengeResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AuthRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    if (message.challengeResponse) {
      obj.challengeResponse = message.challengeResponse.map((e) =>
        e ? AuthRequest_ChallengeResponse.toJSON(e) : undefined
      );
    } else {
      obj.challengeResponse = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthRequest>, I>>(base?: I): AuthRequest {
    return AuthRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AuthRequest>, I>>(object: I): AuthRequest {
    const message = createBaseAuthRequest();
    message.userId = object.userId ?? "";
    message.challengeResponse = object.challengeResponse?.map((e) => AuthRequest_ChallengeResponse.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseAuthRequest_ChallengeResponse(): AuthRequest_ChallengeResponse {
  return { type: "", response: new Uint8Array() };
}

export const AuthRequest_ChallengeResponse = {
  encode(message: AuthRequest_ChallengeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.response.length !== 0) {
      writer.uint32(18).bytes(message.response);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthRequest_ChallengeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthRequest_ChallengeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.response = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthRequest_ChallengeResponse {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      response: isSet(object.response) ? bytesFromBase64(object.response) : new Uint8Array(),
    };
  },

  toJSON(message: AuthRequest_ChallengeResponse): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.response !== undefined &&
      (obj.response = base64FromBytes(message.response !== undefined ? message.response : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthRequest_ChallengeResponse>, I>>(base?: I): AuthRequest_ChallengeResponse {
    return AuthRequest_ChallengeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AuthRequest_ChallengeResponse>, I>>(
    object: I,
  ): AuthRequest_ChallengeResponse {
    const message = createBaseAuthRequest_ChallengeResponse();
    message.type = object.type ?? "";
    message.response = object.response ?? new Uint8Array();
    return message;
  },
};

function createBaseAdditionalChallengeResponseRequired(): AdditionalChallengeResponseRequired {
  return { type: "", prompt: "", parameter: [] };
}

export const AdditionalChallengeResponseRequired = {
  encode(message: AdditionalChallengeResponseRequired, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.prompt !== "") {
      writer.uint32(18).string(message.prompt);
    }
    for (const v of message.parameter) {
      AdditionalChallengeResponseRequired_Parameter.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AdditionalChallengeResponseRequired {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAdditionalChallengeResponseRequired();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.prompt = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.parameter.push(AdditionalChallengeResponseRequired_Parameter.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AdditionalChallengeResponseRequired {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      prompt: isSet(object.prompt) ? String(object.prompt) : "",
      parameter: Array.isArray(object?.parameter)
        ? object.parameter.map((e: any) => AdditionalChallengeResponseRequired_Parameter.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AdditionalChallengeResponseRequired): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.prompt !== undefined && (obj.prompt = message.prompt);
    if (message.parameter) {
      obj.parameter = message.parameter.map((e) =>
        e ? AdditionalChallengeResponseRequired_Parameter.toJSON(e) : undefined
      );
    } else {
      obj.parameter = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AdditionalChallengeResponseRequired>, I>>(
    base?: I,
  ): AdditionalChallengeResponseRequired {
    return AdditionalChallengeResponseRequired.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AdditionalChallengeResponseRequired>, I>>(
    object: I,
  ): AdditionalChallengeResponseRequired {
    const message = createBaseAdditionalChallengeResponseRequired();
    message.type = object.type ?? "";
    message.prompt = object.prompt ?? "";
    message.parameter = object.parameter?.map((e) => AdditionalChallengeResponseRequired_Parameter.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseAdditionalChallengeResponseRequired_Parameter(): AdditionalChallengeResponseRequired_Parameter {
  return { name: "", value: "" };
}

export const AdditionalChallengeResponseRequired_Parameter = {
  encode(message: AdditionalChallengeResponseRequired_Parameter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AdditionalChallengeResponseRequired_Parameter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAdditionalChallengeResponseRequired_Parameter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AdditionalChallengeResponseRequired_Parameter {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: AdditionalChallengeResponseRequired_Parameter): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AdditionalChallengeResponseRequired_Parameter>, I>>(
    base?: I,
  ): AdditionalChallengeResponseRequired_Parameter {
    return AdditionalChallengeResponseRequired_Parameter.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AdditionalChallengeResponseRequired_Parameter>, I>>(
    object: I,
  ): AdditionalChallengeResponseRequired_Parameter {
    const message = createBaseAdditionalChallengeResponseRequired_Parameter();
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAuthResponse(): AuthResponse {
  return { resultCode: 0, resultText: "", additionalChallengeResponseRequired: [] };
}

export const AuthResponse = {
  encode(message: AuthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resultCode !== 0) {
      writer.uint32(8).int32(message.resultCode);
    }
    if (message.resultText !== "") {
      writer.uint32(18).string(message.resultText);
    }
    for (const v of message.additionalChallengeResponseRequired) {
      AdditionalChallengeResponseRequired.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.resultCode = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.resultText = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.additionalChallengeResponseRequired.push(
            AdditionalChallengeResponseRequired.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthResponse {
    return {
      resultCode: isSet(object.resultCode) ? authResponse_AuthResultCodeFromJSON(object.resultCode) : 0,
      resultText: isSet(object.resultText) ? String(object.resultText) : "",
      additionalChallengeResponseRequired: Array.isArray(object?.additionalChallengeResponseRequired)
        ? object.additionalChallengeResponseRequired.map((e: any) => AdditionalChallengeResponseRequired.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AuthResponse): unknown {
    const obj: any = {};
    message.resultCode !== undefined && (obj.resultCode = authResponse_AuthResultCodeToJSON(message.resultCode));
    message.resultText !== undefined && (obj.resultText = message.resultText);
    if (message.additionalChallengeResponseRequired) {
      obj.additionalChallengeResponseRequired = message.additionalChallengeResponseRequired.map((e) =>
        e ? AdditionalChallengeResponseRequired.toJSON(e) : undefined
      );
    } else {
      obj.additionalChallengeResponseRequired = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthResponse>, I>>(base?: I): AuthResponse {
    return AuthResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AuthResponse>, I>>(object: I): AuthResponse {
    const message = createBaseAuthResponse();
    message.resultCode = object.resultCode ?? 0;
    message.resultText = object.resultText ?? "";
    message.additionalChallengeResponseRequired =
      object.additionalChallengeResponseRequired?.map((e) => AdditionalChallengeResponseRequired.fromPartial(e)) || [];
    return message;
  },
};

function createBaseContainer(): Container {
  return {
    messageType: 0,
    error: undefined,
    structureRequest: [],
    structureResponse: [],
    getterRequest: [],
    getterResponse: [],
    setterRequest: [],
    structureChangeResponse: [],
    currentTimeResponse: 0,
    childAddRequest: [],
    childRemoveRequest: [],
    reAuthRequest: undefined,
    reAuthResponse: undefined,
  };
}

export const Container = {
  encode(message: Container, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageType !== 0) {
      writer.uint32(8).int32(message.messageType);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).fork();
    for (const v of message.structureRequest) {
      writer.uint32(v);
    }
    writer.ldelim();
    for (const v of message.structureResponse) {
      Node.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.getterRequest) {
      ValueRequest.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.getterResponse) {
      VariantValue.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.setterRequest) {
      VariantValue.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    writer.uint32(66).fork();
    for (const v of message.structureChangeResponse) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.currentTimeResponse !== 0) {
      writer.uint32(72).uint64(message.currentTimeResponse);
    }
    for (const v of message.childAddRequest) {
      ChildAdd.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.childRemoveRequest) {
      ChildRemove.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.reAuthRequest !== undefined) {
      AuthRequest.encode(message.reAuthRequest, writer.uint32(98).fork()).ldelim();
    }
    if (message.reAuthResponse !== undefined) {
      AuthResponse.encode(message.reAuthResponse, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Container {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContainer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.messageType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag === 24) {
            message.structureRequest.push(reader.uint32());

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.structureRequest.push(reader.uint32());
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.structureResponse.push(Node.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.getterRequest.push(ValueRequest.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.getterResponse.push(VariantValue.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.setterRequest.push(VariantValue.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag === 64) {
            message.structureChangeResponse.push(reader.uint32());

            continue;
          }

          if (tag === 66) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.structureChangeResponse.push(reader.uint32());
            }

            continue;
          }

          break;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.currentTimeResponse = longToNumber(reader.uint64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.childAddRequest.push(ChildAdd.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.childRemoveRequest.push(ChildRemove.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.reAuthRequest = AuthRequest.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.reAuthResponse = AuthResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Container {
    return {
      messageType: isSet(object.messageType) ? container_TypeFromJSON(object.messageType) : 0,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      structureRequest: Array.isArray(object?.structureRequest)
        ? object.structureRequest.map((e: any) => Number(e))
        : [],
      structureResponse: Array.isArray(object?.structureResponse)
        ? object.structureResponse.map((e: any) => Node.fromJSON(e))
        : [],
      getterRequest: Array.isArray(object?.getterRequest)
        ? object.getterRequest.map((e: any) => ValueRequest.fromJSON(e))
        : [],
      getterResponse: Array.isArray(object?.getterResponse)
        ? object.getterResponse.map((e: any) => VariantValue.fromJSON(e))
        : [],
      setterRequest: Array.isArray(object?.setterRequest)
        ? object.setterRequest.map((e: any) => VariantValue.fromJSON(e))
        : [],
      structureChangeResponse: Array.isArray(object?.structureChangeResponse)
        ? object.structureChangeResponse.map((e: any) => Number(e))
        : [],
      currentTimeResponse: isSet(object.currentTimeResponse) ? Number(object.currentTimeResponse) : 0,
      childAddRequest: Array.isArray(object?.childAddRequest)
        ? object.childAddRequest.map((e: any) => ChildAdd.fromJSON(e))
        : [],
      childRemoveRequest: Array.isArray(object?.childRemoveRequest)
        ? object.childRemoveRequest.map((e: any) => ChildRemove.fromJSON(e))
        : [],
      reAuthRequest: isSet(object.reAuthRequest) ? AuthRequest.fromJSON(object.reAuthRequest) : undefined,
      reAuthResponse: isSet(object.reAuthResponse) ? AuthResponse.fromJSON(object.reAuthResponse) : undefined,
    };
  },

  toJSON(message: Container): unknown {
    const obj: any = {};
    message.messageType !== undefined && (obj.messageType = container_TypeToJSON(message.messageType));
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    if (message.structureRequest) {
      obj.structureRequest = message.structureRequest.map((e) => Math.round(e));
    } else {
      obj.structureRequest = [];
    }
    if (message.structureResponse) {
      obj.structureResponse = message.structureResponse.map((e) => e ? Node.toJSON(e) : undefined);
    } else {
      obj.structureResponse = [];
    }
    if (message.getterRequest) {
      obj.getterRequest = message.getterRequest.map((e) => e ? ValueRequest.toJSON(e) : undefined);
    } else {
      obj.getterRequest = [];
    }
    if (message.getterResponse) {
      obj.getterResponse = message.getterResponse.map((e) => e ? VariantValue.toJSON(e) : undefined);
    } else {
      obj.getterResponse = [];
    }
    if (message.setterRequest) {
      obj.setterRequest = message.setterRequest.map((e) => e ? VariantValue.toJSON(e) : undefined);
    } else {
      obj.setterRequest = [];
    }
    if (message.structureChangeResponse) {
      obj.structureChangeResponse = message.structureChangeResponse.map((e) => Math.round(e));
    } else {
      obj.structureChangeResponse = [];
    }
    message.currentTimeResponse !== undefined && (obj.currentTimeResponse = Math.round(message.currentTimeResponse));
    if (message.childAddRequest) {
      obj.childAddRequest = message.childAddRequest.map((e) => e ? ChildAdd.toJSON(e) : undefined);
    } else {
      obj.childAddRequest = [];
    }
    if (message.childRemoveRequest) {
      obj.childRemoveRequest = message.childRemoveRequest.map((e) => e ? ChildRemove.toJSON(e) : undefined);
    } else {
      obj.childRemoveRequest = [];
    }
    message.reAuthRequest !== undefined &&
      (obj.reAuthRequest = message.reAuthRequest ? AuthRequest.toJSON(message.reAuthRequest) : undefined);
    message.reAuthResponse !== undefined &&
      (obj.reAuthResponse = message.reAuthResponse ? AuthResponse.toJSON(message.reAuthResponse) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Container>, I>>(base?: I): Container {
    return Container.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Container>, I>>(object: I): Container {
    const message = createBaseContainer();
    message.messageType = object.messageType ?? 0;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.structureRequest = object.structureRequest?.map((e) => e) || [];
    message.structureResponse = object.structureResponse?.map((e) => Node.fromPartial(e)) || [];
    message.getterRequest = object.getterRequest?.map((e) => ValueRequest.fromPartial(e)) || [];
    message.getterResponse = object.getterResponse?.map((e) => VariantValue.fromPartial(e)) || [];
    message.setterRequest = object.setterRequest?.map((e) => VariantValue.fromPartial(e)) || [];
    message.structureChangeResponse = object.structureChangeResponse?.map((e) => e) || [];
    message.currentTimeResponse = object.currentTimeResponse ?? 0;
    message.childAddRequest = object.childAddRequest?.map((e) => ChildAdd.fromPartial(e)) || [];
    message.childRemoveRequest = object.childRemoveRequest?.map((e) => ChildRemove.fromPartial(e)) || [];
    message.reAuthRequest = (object.reAuthRequest !== undefined && object.reAuthRequest !== null)
      ? AuthRequest.fromPartial(object.reAuthRequest)
      : undefined;
    message.reAuthResponse = (object.reAuthResponse !== undefined && object.reAuthResponse !== null)
      ? AuthResponse.fromPartial(object.reAuthResponse)
      : undefined;
    return message;
  },
};

function createBaseError(): Error {
  return { code: 0, text: "", nodeId: 0, parameter: "", challenge: new Uint8Array(), idleLockoutPeriod: 0 };
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    if (message.nodeId !== 0) {
      writer.uint32(24).uint32(message.nodeId);
    }
    if (message.parameter !== "") {
      writer.uint32(34).string(message.parameter);
    }
    if (message.challenge.length !== 0) {
      writer.uint32(42).bytes(message.challenge);
    }
    if (message.idleLockoutPeriod !== 0) {
      writer.uint32(48).uint32(message.idleLockoutPeriod);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.nodeId = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.parameter = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.challenge = reader.bytes();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.idleLockoutPeriod = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Error {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      text: isSet(object.text) ? String(object.text) : "",
      nodeId: isSet(object.nodeId) ? Number(object.nodeId) : 0,
      parameter: isSet(object.parameter) ? String(object.parameter) : "",
      challenge: isSet(object.challenge) ? bytesFromBase64(object.challenge) : new Uint8Array(),
      idleLockoutPeriod: isSet(object.idleLockoutPeriod) ? Number(object.idleLockoutPeriod) : 0,
    };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.text !== undefined && (obj.text = message.text);
    message.nodeId !== undefined && (obj.nodeId = Math.round(message.nodeId));
    message.parameter !== undefined && (obj.parameter = message.parameter);
    message.challenge !== undefined &&
      (obj.challenge = base64FromBytes(message.challenge !== undefined ? message.challenge : new Uint8Array()));
    message.idleLockoutPeriod !== undefined && (obj.idleLockoutPeriod = Math.round(message.idleLockoutPeriod));
    return obj;
  },

  create<I extends Exact<DeepPartial<Error>, I>>(base?: I): Error {
    return Error.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.code = object.code ?? 0;
    message.text = object.text ?? "";
    message.nodeId = object.nodeId ?? 0;
    message.parameter = object.parameter ?? "";
    message.challenge = object.challenge ?? new Uint8Array();
    message.idleLockoutPeriod = object.idleLockoutPeriod ?? 0;
    return message;
  },
};

function createBaseInfo(): Info {
  return {
    nodeId: 0,
    name: "",
    nodeType: 0,
    valueType: 0,
    typeName: "",
    serverAddr: "",
    serverPort: 0,
    isLocal: false,
    flags: 0,
  };
}

export const Info = {
  encode(message: Info, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== 0) {
      writer.uint32(8).uint32(message.nodeId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.nodeType !== 0) {
      writer.uint32(24).int32(message.nodeType);
    }
    if (message.valueType !== 0) {
      writer.uint32(32).int32(message.valueType);
    }
    if (message.typeName !== "") {
      writer.uint32(42).string(message.typeName);
    }
    if (message.serverAddr !== "") {
      writer.uint32(50).string(message.serverAddr);
    }
    if (message.serverPort !== 0) {
      writer.uint32(56).uint32(message.serverPort);
    }
    if (message.isLocal === true) {
      writer.uint32(64).bool(message.isLocal);
    }
    if (message.flags !== 0) {
      writer.uint32(72).uint32(message.flags);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Info {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nodeId = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.valueType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.typeName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.serverAddr = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.serverPort = reader.uint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.isLocal = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.flags = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Info {
    return {
      nodeId: isSet(object.nodeId) ? Number(object.nodeId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      nodeType: isSet(object.nodeType) ? cDPNodeTypeFromJSON(object.nodeType) : 0,
      valueType: isSet(object.valueType) ? cDPValueTypeFromJSON(object.valueType) : 0,
      typeName: isSet(object.typeName) ? String(object.typeName) : "",
      serverAddr: isSet(object.serverAddr) ? String(object.serverAddr) : "",
      serverPort: isSet(object.serverPort) ? Number(object.serverPort) : 0,
      isLocal: isSet(object.isLocal) ? Boolean(object.isLocal) : false,
      flags: isSet(object.flags) ? Number(object.flags) : 0,
    };
  },

  toJSON(message: Info): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = Math.round(message.nodeId));
    message.name !== undefined && (obj.name = message.name);
    message.nodeType !== undefined && (obj.nodeType = cDPNodeTypeToJSON(message.nodeType));
    message.valueType !== undefined && (obj.valueType = cDPValueTypeToJSON(message.valueType));
    message.typeName !== undefined && (obj.typeName = message.typeName);
    message.serverAddr !== undefined && (obj.serverAddr = message.serverAddr);
    message.serverPort !== undefined && (obj.serverPort = Math.round(message.serverPort));
    message.isLocal !== undefined && (obj.isLocal = message.isLocal);
    message.flags !== undefined && (obj.flags = Math.round(message.flags));
    return obj;
  },

  create<I extends Exact<DeepPartial<Info>, I>>(base?: I): Info {
    return Info.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Info>, I>>(object: I): Info {
    const message = createBaseInfo();
    message.nodeId = object.nodeId ?? 0;
    message.name = object.name ?? "";
    message.nodeType = object.nodeType ?? 0;
    message.valueType = object.valueType ?? 0;
    message.typeName = object.typeName ?? "";
    message.serverAddr = object.serverAddr ?? "";
    message.serverPort = object.serverPort ?? 0;
    message.isLocal = object.isLocal ?? false;
    message.flags = object.flags ?? 0;
    return message;
  },
};

function createBaseNode(): Node {
  return { info: undefined, node: [] };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.info !== undefined) {
      Info.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.node) {
      Node.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.info = Info.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.node.push(Node.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Node {
    return {
      info: isSet(object.info) ? Info.fromJSON(object.info) : undefined,
      node: Array.isArray(object?.node) ? object.node.map((e: any) => Node.fromJSON(e)) : [],
    };
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    message.info !== undefined && (obj.info = message.info ? Info.toJSON(message.info) : undefined);
    if (message.node) {
      obj.node = message.node.map((e) => e ? Node.toJSON(e) : undefined);
    } else {
      obj.node = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Node>, I>>(base?: I): Node {
    return Node.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Node>, I>>(object: I): Node {
    const message = createBaseNode();
    message.info = (object.info !== undefined && object.info !== null) ? Info.fromPartial(object.info) : undefined;
    message.node = object.node?.map((e) => Node.fromPartial(e)) || [];
    return message;
  },
};

function createBaseChildAdd(): ChildAdd {
  return { parentNodeId: 0, childName: "", childTypeName: "" };
}

export const ChildAdd = {
  encode(message: ChildAdd, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parentNodeId !== 0) {
      writer.uint32(8).uint32(message.parentNodeId);
    }
    if (message.childName !== "") {
      writer.uint32(18).string(message.childName);
    }
    if (message.childTypeName !== "") {
      writer.uint32(26).string(message.childTypeName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChildAdd {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChildAdd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.parentNodeId = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.childName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.childTypeName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChildAdd {
    return {
      parentNodeId: isSet(object.parentNodeId) ? Number(object.parentNodeId) : 0,
      childName: isSet(object.childName) ? String(object.childName) : "",
      childTypeName: isSet(object.childTypeName) ? String(object.childTypeName) : "",
    };
  },

  toJSON(message: ChildAdd): unknown {
    const obj: any = {};
    message.parentNodeId !== undefined && (obj.parentNodeId = Math.round(message.parentNodeId));
    message.childName !== undefined && (obj.childName = message.childName);
    message.childTypeName !== undefined && (obj.childTypeName = message.childTypeName);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChildAdd>, I>>(base?: I): ChildAdd {
    return ChildAdd.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChildAdd>, I>>(object: I): ChildAdd {
    const message = createBaseChildAdd();
    message.parentNodeId = object.parentNodeId ?? 0;
    message.childName = object.childName ?? "";
    message.childTypeName = object.childTypeName ?? "";
    return message;
  },
};

function createBaseChildRemove(): ChildRemove {
  return { parentNodeId: 0, childName: "" };
}

export const ChildRemove = {
  encode(message: ChildRemove, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parentNodeId !== 0) {
      writer.uint32(8).uint32(message.parentNodeId);
    }
    if (message.childName !== "") {
      writer.uint32(18).string(message.childName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChildRemove {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChildRemove();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.parentNodeId = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.childName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChildRemove {
    return {
      parentNodeId: isSet(object.parentNodeId) ? Number(object.parentNodeId) : 0,
      childName: isSet(object.childName) ? String(object.childName) : "",
    };
  },

  toJSON(message: ChildRemove): unknown {
    const obj: any = {};
    message.parentNodeId !== undefined && (obj.parentNodeId = Math.round(message.parentNodeId));
    message.childName !== undefined && (obj.childName = message.childName);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChildRemove>, I>>(base?: I): ChildRemove {
    return ChildRemove.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChildRemove>, I>>(object: I): ChildRemove {
    const message = createBaseChildRemove();
    message.parentNodeId = object.parentNodeId ?? 0;
    message.childName = object.childName ?? "";
    return message;
  },
};

function createBaseVariantValue(): VariantValue {
  return {
    nodeId: 0,
    dValue: 0,
    fValue: 0,
    ui64Value: 0,
    i64Value: 0,
    uiValue: 0,
    iValue: 0,
    usValue: 0,
    sValue: 0,
    ucValue: 0,
    cValue: 0,
    bValue: false,
    strValue: "",
    timestamp: 0,
  };
}

export const VariantValue = {
  encode(message: VariantValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId != null) {
      writer.uint32(8).uint32(message.nodeId);
    }
    if (message.timestamp != null) {
      writer.uint32(112).uint64(message.timestamp);
    }
    if (message.dValue != null) {
      writer.uint32(17).double(message.dValue);
    }
    if (message.fValue != null) {
      writer.uint32(29).float(message.fValue);
    }
    if (message.ui64Value != null) {
      writer.uint32(32).uint64(message.ui64Value);
    }
    if (message.i64Value != null) {
      writer.uint32(40).sint64(message.i64Value);
    }
    if (message.uiValue != null) {
      writer.uint32(48).uint32(message.uiValue);
    }
    if (message.iValue != null) {
      writer.uint32(56).sint32(message.iValue);
    }
    if (message.usValue != null) {
      writer.uint32(64).uint32(message.usValue);
    }
    if (message.sValue != null) {
      writer.uint32(72).sint32(message.sValue);
    }
    if (message.ucValue != null) {
      writer.uint32(80).uint32(message.ucValue);
    }
    if (message.cValue != null) {
      writer.uint32(88).sint32(message.cValue);
    }
    if (message.bValue != null) {
      writer.uint32(96).bool(message.bValue);
    }
    if (message.strValue != null) {
      writer.uint32(106).string(message.strValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VariantValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVariantValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nodeId = reader.uint32();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.dValue = reader.double();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.fValue = reader.float();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.ui64Value = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.i64Value = longToNumber(reader.sint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.uiValue = reader.uint32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.iValue = reader.sint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.usValue = reader.uint32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.sValue = reader.sint32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.ucValue = reader.uint32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.cValue = reader.sint32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.bValue = reader.bool();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.strValue = reader.string();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VariantValue {
    return {
      nodeId: isSet(object.nodeId) ? Number(object.nodeId) : undefined,
      dValue: isSet(object.dValue) ? Number(object.dValue) : undefined,
      fValue: isSet(object.fValue) ? Number(object.fValue) : undefined,
      ui64Value: isSet(object.ui64Value) ? Number(object.ui64Value) : undefined,
      i64Value: isSet(object.i64Value) ? Number(object.i64Value) : undefined,
      uiValue: isSet(object.uiValue) ? Number(object.uiValue) : undefined,
      iValue: isSet(object.iValue) ? Number(object.iValue) : undefined,
      usValue: isSet(object.usValue) ? Number(object.usValue) : undefined,
      sValue: isSet(object.sValue) ? Number(object.sValue) : undefined,
      ucValue: isSet(object.ucValue) ? Number(object.ucValue) : undefined,
      cValue: isSet(object.cValue) ? Number(object.cValue) : undefined,
      bValue: isSet(object.bValue) ? Boolean(object.bValue) : undefined,
      strValue: isSet(object.strValue) ? String(object.strValue) : undefined,
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : undefined,
    };
  },

  toJSON(message: VariantValue): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = Math.round(message.nodeId));
    message.dValue !== undefined && (obj.dValue = message.dValue);
    message.fValue !== undefined && (obj.fValue = message.fValue);
    message.ui64Value !== undefined && (obj.ui64Value = Math.round(message.ui64Value));
    message.i64Value !== undefined && (obj.i64Value = Math.round(message.i64Value));
    message.uiValue !== undefined && (obj.uiValue = Math.round(message.uiValue));
    message.iValue !== undefined && (obj.iValue = Math.round(message.iValue));
    message.usValue !== undefined && (obj.usValue = Math.round(message.usValue));
    message.sValue !== undefined && (obj.sValue = Math.round(message.sValue));
    message.ucValue !== undefined && (obj.ucValue = Math.round(message.ucValue));
    message.cValue !== undefined && (obj.cValue = Math.round(message.cValue));
    message.bValue !== undefined && (obj.bValue = message.bValue);
    message.strValue !== undefined && (obj.strValue = message.strValue);
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    return obj;
  },

  create<I extends Exact<DeepPartial<VariantValue>, I>>(base?: I): VariantValue {
    return VariantValue.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VariantValue>, I>>(object: I): VariantValue {
    const message = createBaseVariantValue();
    message.nodeId = object.nodeId;
    message.dValue = object.dValue;
    message.fValue = object.fValue;
    message.ui64Value = object.ui64Value;
    message.i64Value = object.i64Value;
    message.uiValue = object.uiValue;
    message.iValue = object.iValue;
    message.usValue = object.usValue;
    message.sValue = object.sValue;
    message.ucValue = object.ucValue;
    message.cValue = object.cValue;
    message.bValue = object.bValue;
    message.strValue = object.strValue;
    message.timestamp = object.timestamp;
    return message;
  },
};

function createBaseValueRequest(): ValueRequest {
  return { nodeId: 0, fs: 0, stop: false, sampleRate: 0 };
}

export const ValueRequest = {
  encode(message: ValueRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== 0) {
      writer.uint32(8).uint32(message.nodeId);
    }
    if (message.fs !== 0) {
      writer.uint32(17).double(message.fs);
    }
    if (message.stop === true) {
      writer.uint32(24).bool(message.stop);
    }
    if (message.sampleRate !== 0) {
      writer.uint32(33).double(message.sampleRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValueRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValueRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nodeId = reader.uint32();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.fs = reader.double();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stop = reader.bool();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.sampleRate = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValueRequest {
    return {
      nodeId: isSet(object.nodeId) ? Number(object.nodeId) : 0,
      fs: isSet(object.fs) ? Number(object.fs) : 0,
      stop: isSet(object.stop) ? Boolean(object.stop) : false,
      sampleRate: isSet(object.sampleRate) ? Number(object.sampleRate) : 0,
    };
  },

  toJSON(message: ValueRequest): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = Math.round(message.nodeId));
    message.fs !== undefined && (obj.fs = message.fs);
    message.stop !== undefined && (obj.stop = message.stop);
    message.sampleRate !== undefined && (obj.sampleRate = message.sampleRate);
    return obj;
  },

  create<I extends Exact<DeepPartial<ValueRequest>, I>>(base?: I): ValueRequest {
    return ValueRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValueRequest>, I>>(object: I): ValueRequest {
    const message = createBaseValueRequest();
    message.nodeId = object.nodeId ?? 0;
    message.fs = object.fs ?? 0;
    message.stop = object.stop ?? false;
    message.sampleRate = object.sampleRate ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  // if (long.gt(Number.MAX_SAFE_INTEGER)) {
  //   throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  // }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
