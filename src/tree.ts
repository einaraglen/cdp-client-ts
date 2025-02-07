import { StudioNode } from "./node"
import { Node, VariantValue } from "./studio.proto"
import { Connection } from "./connection";

export type FindChildrenFunction = (parentKey: string) => Promise<Map<string, StudioNode>>

export class StudioTree {
    public connection: Connection;
    private nodes: Map<string, StudioNode>
    private children: Map<string, Map<string, StudioNode>>

    constructor(connection: Connection) {
        this.nodes = new Map()
        this.children = new Map()
        this.connection = connection;

    }

    public reset() {
        this.nodes = new Map()
        this.children = new Map()
    }

    public async initTree(id: number = 0) {
        const system = await this.connection.getChildren(id)
        const apps = new Set<string>()

        if (system != null) {
            for (const app of system) {
                apps.add(app.info!.name!)
                this.insert("", app)
            }
        }

        return apps;
    }

    public async find(key: string) {
        if (this.nodes.has(key)) {
            return this.nodes.get(key)!
        }

        const lastIndex = this.searchTree(key);

        const node = await this.fetchTree(key, lastIndex)

        return node
    }

    private findChildren = async (parentKey: string) => {
        if (this.children.get(parentKey) == null) {
            const parent = this.nodes.get(parentKey)!

            const children = await this.connection.getChildren(parent.nodeId)

            for (const child of children) {
                this.insert(parentKey, child)
            }
        }

        return this.children.get(parentKey)!
    }

    private insert(parentKey: string, node: Node) {
        const route = this.getPath(parentKey, node.info!.name);

        if (this.nodes.has(route)) {
            throw new Error(`Node already initiated! ${route}`)
        }

        const child = new StudioNode(node, route, this.connection, this.findChildren)

        this.nodes.set(child.route, child)

        const prev = this.children.get(parentKey) || new Map<string, StudioNode>()
        prev.set(child.route, child)
        this.children.set(parentKey, prev)
    }

    private searchTree(key: string) {
        const path = key.split(".")
        let lastIndex = path.length;

        while (lastIndex > 0) {
            const lastKey = path.slice(0, lastIndex).join(".");
            if (this.nodes.has(lastKey)) {
                break
            }

            lastIndex--;
        }

        return lastIndex;
    }

    private async fetchTree(key: string, lastIndex: number) {
        const path = key.split(".")

        for (let i = lastIndex; i <= path.length; i++) {
            const lastKey = path.slice(0, i).join(".");

            const lastNode = this.nodes.get(lastKey)

            if (lastNode == null) {
                return null
            }

            const system = await this.connection.getChildren(lastNode!.nodeId!)

            for (const child of system) {
                this.insert(lastKey, child)
            }
        }

        return this.nodes.get(key) || null
    }

    private getPath(...args: any[]) {
        const filtered = args.filter((arg) => arg != "" && args != null)
        return filtered.join(".")
    }
}