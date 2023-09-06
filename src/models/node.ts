import { Info, Node } from "./studio.proto"

export type NodeInfo = {

}

class StructureNode<T> {
    public info: Info

    constructor(node: Node) {
        this.info = node.info!
    }
}

export default StructureNode;