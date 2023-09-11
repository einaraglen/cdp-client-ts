type Callback = (value?: any) => void

class StructureCallbacks {
    private static _instance: StructureCallbacks | null = null;
    private nodes: Map<number, Set<Callback>>

    private constructor() {
        this.nodes = new Map();
    }

    public static instance = () => {
        if (StructureCallbacks._instance == null) {
            StructureCallbacks._instance = new StructureCallbacks()
        }

        return StructureCallbacks._instance
    }

    public runCallbacks = (id: number, value?: any) => {
        if (!this.nodes.has(id)) {
            return;
        }

        const registered = this.nodes.get(id)!
        registered.forEach((callback) => {
            callback(value)
            this.unregisterCallback(id, callback)
        })
    }

    public registerCallback = (id: number, callback: Callback) => {
        const registered = this.nodes.has(id) ? this.nodes.get(id)! : new Set<Callback>();
        registered.add(callback);
        this.nodes.set(id, registered);
    }

    private unregisterCallback = (id: number, callback: (value?: any) => void) => {
        if (!this.nodes.has(id)) {
            return;
        }

        const registered = this.nodes.get(id)!
        registered.delete(callback);
        this.nodes.set(id, registered);
    }
}

export default StructureCallbacks