type NodeCallback = (value?: any) => void

class Callbacks {
    private static _instance: Callbacks | null = null;
    private nodes: Map<number, Set<NodeCallback>>

    private constructor() {
        this.nodes = new Map();
    }

    public static instance = () => {
        if (Callbacks._instance == null) {
            Callbacks._instance = new Callbacks()
        }

        return Callbacks._instance
    }

    public runCallbacks = (id: number, value?: any) => {
        const registered = this.nodes.has(id) ? this.nodes.get(id)! : new Set<NodeCallback>();
        registered.forEach((callback) => {
            callback(value)
            this.unregisterCallback(id, callback)
        })
    }

    public registerCallback = (id: number, callback: NodeCallback) => {
        const registered = this.nodes.has(id) ? this.nodes.get(id)! : new Set<NodeCallback>();
        registered.add(callback);
        this.nodes.set(id, registered);
    }

    private unregisterCallback = (id: number, callback: (value?: any) => void) => {
        const registered = this.nodes.has(id) ? this.nodes.get(id)! : new Set<NodeCallback>();
        registered.delete(callback);
        this.nodes.set(id, registered);
    }
}

export default Callbacks