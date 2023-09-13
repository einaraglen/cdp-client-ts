import Requester, { CDPValue } from "../handlers/requester";
import StructureNode from "../models/node";
import { Node } from "./studio.proto";

class Memory {
  private static _instance: Memory | null = null;
  private memory: Record<string, StructureNode>;
  private dictionary: Record<number, string>;
  public initiated: boolean;
  private buffer: { route: string; callback: (value: any) => void }[];

  private constructor() {
    this.initiated = false;
    this.buffer = [];
    this.dictionary = {} as Record<number, string>;
    this.memory = {} as Record<string, StructureNode>;
  }

  public static instance = () => {
    if (Memory._instance == null) {
      Memory._instance = new Memory();
    }

    return Memory._instance;
  };

  public registerNode = (id: number, route: string) => {
    this.dictionary[id] = route;
  };

  public setLastValueOfNode = async (id: number, value: CDPValue) => {
    if (!(id in this.dictionary)) {
      return;
    }

    const node = await this.searchNodeTree(this.dictionary[id]);
    node.lastValue = value;
  };

  public insertNode = (parent: string | null, node: Node): StructureNode | void => {
    if (parent == null) {
      return this.insertRootNode(node);
    }

    return this.insertTreeNode(parent, node);
  };

  private insertRootNode = (node: Node) => {
    node.node.forEach((child) => {
      const built = new StructureNode(null, child);
      this.memory[built.name] = built;
    });
  };

  private insertTreeNode = (parent: string, node: Node) => {
    const keys = parent.split(".");
    let parentNode: StructureNode = keys.reduce<StructureNode>((res, curr, idx) => (idx > 0 ? res.child(curr) : res), this.memory[keys[0]]);
    let child = new StructureNode(parentNode.route, node);

    if (parentNode.id == child.id) {
      throw new Error(`Cannot insert ${child.name}:${child.id} into ${parentNode.name}:${parentNode.id}`);
    }

    if (parentNode.hasChild(child.name) && parentNode.child(child.name).childCount() == child.childCount()) {
      return parentNode.child(child.name);
    }

    if (parentNode.hasChild(child.name)) {
      child.forEachChild((subchild) => {
        if (!parentNode.child(child.name).hasChild(subchild.name)) {
          parentNode.child(child.name).insertChild(subchild);
        }
      });

      return parentNode.child(child.name);
    }

    parentNode.insertChild(child);

    return child;
  };

  public flush = () => {
    if (!this.initiated) {
      throw new Error("Flush failed, memory not initiated");
    }

    this.buffer.forEach(({ route, callback }) => this.searchNodeTree(route).then(callback));
    this.buffer.splice(0, this.buffer.length);
  };

  public findNode = async (route: string): Promise<StructureNode> => {
    const lastNode = await this.searchNodeTree(route);
    return await this.searchStudioTree(route, lastNode);
  };

  private searchNodeTree = (route: string) => {
    return new Promise<StructureNode>((resolve) => {
      if (!this.initiated) {
        this.buffer.push({ route, callback: resolve });
        return;
      }

      const keys = route.split(".");
      let lastNode = this.memory[keys[0]];

      for (let i = 1; i < keys.length; i++) {
        if (!lastNode.hasChild(keys[i])) {
          break;
        }

        lastNode = lastNode.child(keys[i]);
      }

      resolve(lastNode);
    });
  };

  private searchStudioTree = async (route: string, _lastNode: StructureNode) => {
    const requester = Requester.instance();

    let lastNode = _lastNode;

    const temp = route.split(".");
    const lastIndex = temp.findIndex((key) => key == lastNode.name);

    let keys = temp.slice(lastIndex + 1);
    const offset = keys.length == 0 ? 0 : 1;
    let parent = temp.slice(0, lastIndex + offset).join(".");

    for (const key of keys) {
      const temp = await requester.makeStructureRequest(lastNode.id);
      const child = temp.node.find((n) => n.info?.name == key);

      if (child == null) {
        throw new Error(`'${lastNode.route}' has no child '${key}`);
      }

      parent = lastNode.route;
      lastNode = this.insertNode(parent, child)!;
    }

    if (lastNode.childCount() == 0) {
      const node = await requester.makeStructureRequest(lastNode.id);
      lastNode = this.insertNode(parent, node)!;
    }

    return lastNode;
  };
}

export default Memory;
