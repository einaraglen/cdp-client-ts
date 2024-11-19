import { Hello as Metadata } from "../models/studio.proto"
import { Connection } from "./connection";
import { StudioTree } from "./tree"

export class StudioClient {
    private host: string
    private metadata_?: Metadata
    private apps: Set<string> = new Set<string>()

    private connection: Connection;
    private tree: StudioTree

    constructor(host: string) {
        this.host = host;

        this.connection = new Connection(this.host)
        this.tree = new StudioTree(this.connection)
    }

    public async connect() {
        const metadata = await this.connection.connect()

        if (metadata == null) {
            throw new Error(`Failed to connect to websocket ${this.host}`)
        }

        this.metadata_ = metadata;
        this.apps = await this.tree.initTree()
    }

    public find(key: string) {
        return this.tree.find(key)
    }

    public close() {
        this.connection.close();
    }

    public get metadata() {
        return {
            system: this.metadata_?.systemName,
            apps: Array.from(this.apps),
            version: {
                major: this.metadata_?.cdpVersionMajor,
                minor: this.metadata_?.cdpVersionMinor,
                patch: this.metadata_?.cdpVersionPatch
            }
        }
    }
}