import { Node, VariantValue } from "../models/studio.proto";

export type WaitingCallback = (nodes: Node[]) => void
export type SubscribedCallback = (value: VariantValue) => void

export class Callback {
    private waiting: Map<number, Set<WaitingCallback>> = new Map()
    private subscribed: Map<number, Set<SubscribedCallback>> = new Map()

    public wait(id: number, callback: WaitingCallback) {
        const prev = this.waiting.get(id)! || new Set<WaitingCallback>();
        prev.add(callback);
        this.waiting.set(id, prev);
    }

    public subscribe(id: number, callback: SubscribedCallback) {
        const prev = this.subscribed.get(id)! || new Set<SubscribedCallback>();
        prev.add(callback);
        this.subscribed.set(id, prev);
    }

    public unsubscribe(id: number, callback: SubscribedCallback) {
        const prev = this.subscribed.get(id)! || new Set<SubscribedCallback>();
        prev.delete(callback);
        this.subscribed.set(id, prev);
    }

    public runWaiting(value: Node) {
        const id = value.info!.nodeId!

        for (const callback of Array.from(this.waiting.get(id)!)) {
            callback(value.node)
        }

        this.waiting.set(id, new Set())
    }

    public runSubscribed(value: VariantValue) {
        const id = value.nodeId!
        let active = false;

        for (const callback of this.subscribed.get(id)!) {
            callback(value)
            active = true;
        }

        return active;
    }
}