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
  private dictionary: Map<number, string>
  public initiated: boolean;
  private buffer: { route: string; callback: (value: any) => void }[];

  private constructor() {
    this.initiated = false;
    this.buffer = [];
    this.memory = {} as Record<string, TreeNode>;
    this.dictionary = new Map()
  }

  public static instance = () => {
    if (Memory._instance == null) {
      Memory._instance = new Memory();
    }

    return Memory._instance;
  };

  public insertNode = (parent: string | null, node: Node): TreeNode | undefined => {
    if (parent == null) {
      this.insertRootNode(node);
    } else {
      return this.insertTreeNode(parent, node);
    }
  };

  private insertRootNode = (node: Node) => {
    const temp = this.buildNode(node);
    for (const key in temp.children) {
      const current = temp.children[key]
      this.memory[key] = current;
      this.dictionary.set(current.id, key)
    }
  };

  private insertTreeNode = (parent: string, node: Node) => {
    const keys = parent.split(".");
    let parentNode: TreeNode = this.memory[keys[0]];

    for (let i = 1; i < keys.length; i++) {
      parentNode = parentNode.children[keys[i]];
    }

    const temp = this.buildNode(node);
    parentNode.children[temp.name] = temp;

    const route = keys.filter((key) => key != temp.name)
    this.dictionary.set(temp.id, [...route, temp.name].join("."))

    return temp;
  };

  private buildNode = (node: Node) => {
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

    this.buffer.forEach(({ route, callback }) => this.searchNodeTree(route).then(callback));
    this.buffer.splice(0, this.buffer.length);
  };

  public findNode = async (route: string): Promise<StructureNode> => {
    let lastNode = await this.searchNodeTree(route);
    const { parent, node } = await this.searchStudioTree(route, lastNode);
    return new StructureNode(parent, node);
  };

  private searchNodeTree = (route: string) => {
    return new Promise<TreeNode>((resolve) => {
      if (!this.initiated) {
        this.buffer.push({ route, callback: resolve });
        return;
      }

      const keys = route.split(".");
      let lastNode = this.memory[keys[0]];

      for (let i = 1; i < keys.length; i++) {
        if (lastNode.children[keys[i]] == null) {
          break;
        }

        lastNode = lastNode.children[keys[i]];
      }

      resolve(lastNode);
    });
  };

  private searchStudioTree = async (route: string, _lastNode: TreeNode) => {
    const requester = Requester.instance();

    let parent = this.dictionary.get(_lastNode.id)!
    let keys: string[] = []
    let lastNode = _lastNode;

    if (parent) {
      keys = route.replace(parent + ".", "").split(".")
    } else {
      parent = route.replace("." + lastNode.name, "")
    }

    for (const key of keys) {
      const temp = await requester.makeStructureRequest(lastNode.id);
      const child = temp.node.find((n) => n.info?.name == key);

      if (child == null) {
        throw new Error(`'${parent}' has no child '${key}'`);
      }

      lastNode = this.insertNode(parent, child)!;
      parent = this.dictionary.get(lastNode.id)!
    }

    if (Object.keys(lastNode.children).length == 0) {
      const withChildren = await requester.makeStructureRequest(lastNode.id);
      lastNode = this.insertNode(parent, withChildren)!;
    }

    return { parent, node: lastNode }
  }
}

export default Memory;
