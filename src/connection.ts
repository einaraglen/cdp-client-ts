import IsomorphicSocket from "isomorphic-ws";
import { Container, Container_Type, Hello as Metadata, ValueRequest, VariantValue, Node } from "./studio.proto";
import EventEmitter from "eventemitter3";

export class Connection {
    private host: string

    private socket?: WebSocket;
    private metadata_?: Metadata;
    private buffer: ArrayBufferLike[] = [];
    private on_: ((key: "close" | "error", event: any) => void) | null = null

    public emitter: EventEmitter;
 
    constructor(host: string) {
        this.host = host;

        this.emitter = new EventEmitter();
    }

    public set on(callback: (key: "close" | "error", event: any) => void) {
        this.on_ = callback;
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

    public async getChildren(parentId: number) {
        const children = new Promise<Node[]>((resolve) => {
            this.emitter.on(`struct-${parentId}`, resolve)
            const message = Container.create({ messageType: Container_Type.eStructureRequest, structureRequest: [parentId] });
            this.send(Container.encode(message).finish());
        })

        const timeout = new Promise<null>((r) => setTimeout(() => r(null), 1000))

        const result = await Promise.race([children, timeout])

        if (result == null) {
            console.warn("Timeout while getting children")
            throw new Error("Timeout while getting children")
        }

        return result;
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

    private emitChildren(children: Node[]) {
        for (const child of children) {
            this.emitter.emit(`struct-${child.info!.nodeId}`, child.node)
        }
    }

    private emitValue(values: VariantValue[]) {
        for (const value of values) {
            this.emitter.emit(`value-${value.nodeId}`, value)
        }
    }

    private onMessage(event: MessageEvent<ArrayBuffer>) {
        const decoded = Container.decode(new Uint8Array(event.data));

        switch (decoded.messageType) {
            case Container_Type.eStructureResponse:
                this.emitChildren(decoded.structureResponse);
                break;
            case Container_Type.eGetterResponse:
                this.emitValue(decoded.getterResponse);
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
        this.socket!.onerror = (e) => this.onError(e);

        for (const payload of this.buffer) {
            this.socket!.send(payload);
        }
    }

    private onClose(event: CloseEvent) {
        if (this.on_) {
            this.on_("close", event)
        }
    }

    private onError(event: Event, reject?: (value: Metadata | null) => void) {
        if (reject != null) {
            reject(null)
        }

        if (this.on_) {
            this.on_("error", event)
        }
    }

}

