import IsomorphicSocket from "isomorphic-ws";
import { Container, Container_Type, Hello as Metadata, ValueRequest, VariantValue, Node } from "../models/studio.proto";
import { Callback } from "./callback"

export class Connection {
    private host: string

    private socket?: WebSocket;
    private metadata_?: Metadata;
    private buffer: ArrayBufferLike[] = [];

    public callback: Callback
 
    constructor(host: string) {
        this.host = host;

        this.callback = new Callback();
    }

    public get metadata() {
        return this.metadata_;
    }

    public connect() {
        return new Promise<Metadata | null>((resolve) => {
            this.socket = new IsomorphicSocket(this.host) as WebSocket;
            this.socket.binaryType = "arraybuffer";

            this.socket.onclose = (e) => this.onClose(e);
            this.socket.onmessage = (e) => this.onMetadata(e, resolve);
            this.socket.onerror = (e) => this.onError(e, resolve);
        })
    }

    public close() {
        if (this.socket != null) {
            this.socket.close()
        }
    }

    private send(payload: ArrayBufferLike) {
        if (this.socket == null || this.socket.readyState == 0) {
            this.buffer.push(payload);
            return;
        }

        this.socket.send(payload);
    }

    public getChildren(parentId: number) {
        return new Promise<Node[]>((resolve) => {
            this.callback.wait(parentId, resolve)
            const message = Container.create({ messageType: Container_Type.eStructureRequest, structureRequest: [parentId] });
            this.send(Container.encode(message).finish());
        })
    }

    public getValue(nodeId: number, stop: boolean = false) {
        const request = ValueRequest.create({ nodeId, fs: 100, stop });
        const message = Container.create({ messageType: Container_Type.eGetterRequest, getterRequest: [request] });
        this.send(Container.encode(message).finish());
    }

    public setValue(nodeId: number, value: VariantValue) {
        const request: any = VariantValue.create({ nodeId, timestamp: Date.now(), ...value });
        const message = Container.create({ messageType: Container_Type.eSetterRequest, setterRequest: [request] });
        this.send(Container.encode(message).finish());
    }

    private parseChildren(children: Node[]) {
        for (const child of children) {
            this.callback.runWaiting(child)
        }
    }

    private parseValue(values: VariantValue[]) {
        for (const value of values) {
            const active = this.callback.runSubscribed(value)

            if (!active) {
                this.getValue(value.nodeId!, true)
            }
        }
    }

    private onMessage(event: MessageEvent<ArrayBuffer>) {
        const decoded = Container.decode(new Uint8Array(event.data));

        switch (decoded.messageType) {
            case Container_Type.eStructureResponse:
                this.parseChildren(decoded.structureResponse);
                break;
            case Container_Type.eGetterResponse:
                this.parseValue(decoded.getterResponse);
                break;
            case Container_Type.eStructureChangeResponse:
                console.warn("TODO: Struct Change")
                break;
            case Container_Type.eReauthResponse:
                console.warn("TODO: Auth")
                break;
            case Container_Type.eRemoteError:
                console.warn("TODO: Error")
                break;
            default:
                throw new Error("Unrecognized Container Type");
        }
    }

    private onMetadata(event: MessageEvent<ArrayBuffer>, resolve: (value: Metadata | null) => void) {
        const decoded = Metadata.decode(new Uint8Array(event.data));
        this.metadata_ = decoded;

        resolve(decoded)

        this.socket!.onmessage = (e) => this.onMessage(e);
    }

    private onClose(event: CloseEvent) {
        // console.log("CLOSE", event)
    }

    private onError(event: Event, reject?: (value: Metadata | null) => void) {
        if (reject != null) {
            reject(null)
        }
    }

}

