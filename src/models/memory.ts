import Requester from "../handlers/requester";
import StructureNode from "../models/node";
import { CDPNodeType, CDPValueType, Node } from "./studio.proto";

export type TreeNode = {
  id: number;
  name: string;
  nodeType: CDPNodeType;
  valueType: CDPValueType;
  typeName: string;
  children: Record<string, TreeNode>;
};

class Memory {
  private static _instance: Memory | null = null;
  private memory: Record<string, TreeNode>;
  public initiated: boolean;
  private buffer: { route: string; callback: (value: any) => void }[];

  private constructor() {
    this.initiated = false;
    this.buffer = [];
    this.memory = {} as Record<string, TreeNode>;
  }

  public static instance = () => {
    if (Memory._instance == null) {
      Memory._instance = new Memory();
    }

    return Memory._instance;
  };

  public insertNode = (parent: string | null, node: Node): TreeNode | undefined => {
    // console.log("INSERTING", node.info?.name, "into", parent);
    if (parent == null) {
      this.insertRootNode(node);
    } else {
      return this.insertTreeNode(parent, node);
    }
  };

  private insertRootNode = (node: Node) => {
    const temp = this.restructureNode(node);
    for (const key in temp.children) {
      this.memory[key] = temp.children[key];
    }
  };

  private insertTreeNode = (parent: string, node: Node) => {
    const keys = parent.split(".");
    let parentNode: TreeNode = this.memory[keys[0]];

    for (let i = 1; i < keys.length; i++) {
      parentNode = parentNode.children[keys[i]];
    }

    const temp = this.restructureNode(node);
    parentNode.children[temp.name] = temp;

    return temp;
  };

  private restructureNode = (node: Node) => {
    const temp: TreeNode = {
      id: node.info?.nodeId!,
      name: node.info?.name!,
      nodeType: node.info?.nodeType!,
      valueType: node.info?.valueType!,
      typeName: node.info?.typeName!,
      children: {},
    };

    node.node.forEach((child) => {
      temp.children![child.info?.name!] = {
        id: child.info?.nodeId!,
        name: child.info?.name!,
        nodeType: child.info?.nodeType!,
        valueType: child.info?.valueType!,
        typeName: child.info?.typeName!,
        children: {},
      };
    });

    return temp;
  };

  public flush = () => {
    if (!this.initiated) {
      throw new Error("Flush failed, memory not initiated");
    }

    this.buffer.forEach(({ route, callback }) => this.tryNodeKey(route).then(callback));
    this.buffer.splice(0, this.buffer.length);
  };

  public getNode = async (route: string): Promise<StructureNode> => {
    let { lastNode, lastIndex } = await this.tryNodeKey(route);

    if (lastIndex == route.split(".").length - 1) {
      lastIndex += 1
    }

    const { parent, node } = await this.searchNodeTree(route, lastNode, lastIndex);
    return new StructureNode(parent, node);
  };

  private tryNodeKey = (route: string): Promise<{ lastNode: TreeNode, lastIndex: number }> => {
    return new Promise<{ lastNode: TreeNode, lastIndex: number }>((resolve) => {
      if (!this.initiated) {
        this.buffer.push({ route, callback: resolve });
        return;
      }

      const keys = route.split(".");
      let lastNode = this.memory[keys[0]];
      let lastIndex = 0;

      for (let i = 1; i < keys.length; i++) {
        if (lastNode.children[keys[i]] == null) {
          break;
        }

        lastIndex = i;
        lastNode = lastNode.children[keys[i]];
      }

      resolve({ lastNode, lastIndex });
    });
  };

  private searchNodeTree = async (route: string, _lastNode: TreeNode, lastIndex: number) => {
    const requester = Requester.instance();
    const keys = route.split(".");

    let parent = keys[0];
    let lastNode = _lastNode;

    for (let i = 1; i < keys.length; i++) {
      if (i > lastIndex) {
        const temp = await requester.makeStructureRequest(lastNode.id);
        const child = temp.node.find((n) => n.info?.name == keys[i]);

        if (child == null) {
          console.log(JSON.stringify(this.memory))
          throw new Error(`'${temp.info?.name}' has no child '${keys[i]}'`);
        }

        lastNode = this.insertNode(parent, child)!;
      }

      if (i != keys.length - 1) {
        parent += "." + keys[i];
      }

    }

    const withChildren = await requester.makeStructureRequest(lastNode.id);
    const node = this.insertNode(parent, withChildren)!;

    return { parent, node };
  };
}

export default Memory;
