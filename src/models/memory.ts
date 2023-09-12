import Requester from "../handlers/requester";
import StructureNode from "../models/node";
import { CDPNodeType, CDPValueType, Node } from "./studio.proto";

export type TreeNode = {
  id: number;
  name: string;
  nodeType: CDPNodeType;
  valueType: CDPValueType;
  typeName: string;
  children: Record<string, StructureNode>;
};

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

  public setLastValueOfNode = async (id: number, value: any) => {
    if (!(id in this.dictionary)) {
      return;
    }

    const route = this.dictionary[id];

    const node = await this.searchNodeTree(route);

    if (node.id != id) {
      throw new Error("Dictionary is out of sync");
    }

    node.setLastValue(value);
  };

  public insertNode = (parent: string | null, node: Node): StructureNode | undefined => {
    if (parent == null) {
      this.insertRootNode(node);
    } else {
      return this.insertTreeNode(parent, node);
    }
  };

  private insertRootNode = (node: Node) => {
    node.node.forEach((child) => {
      const built = this.buildNode(null, child);
      this.memory[built.name] = built;
    });
  };

  private insertTreeNode = (parent: string, node: Node) => {
    const keys = parent.split(".");
    let parentNode: StructureNode = this.memory[keys[0]];

    for (let i = 1; i < keys.length; i++) {
      parentNode = parentNode.child(keys[i]);
    }

    let child = this.buildNode(parentNode.route, node);

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

  private buildNode = (parent: string | null, node: Node) => {
    const temp: TreeNode = {
      id: node.info?.nodeId!,
      name: node.info?.name!,
      nodeType: node.info?.nodeType!,
      valueType: node.info?.valueType!,
      typeName: node.info?.typeName!,
      children: {},
    };

    const built = new StructureNode(parent, temp);
    const route = [parent, built.name].filter((r) => r != null).join(".");

    node.node.forEach((child) => {
      built.insertChild(
        new StructureNode(route, {
          id: child.info?.nodeId!,
          name: child.info?.name!,
          nodeType: child.info?.nodeType!,
          valueType: child.info?.valueType!,
          typeName: child.info?.typeName!,
          children: {},
        })
      );
    });

    return built;
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
    const offset = keys.length == 0 ? -1 : 1;
    let parent = temp.slice(0, lastIndex + offset).join(".");

    for (let i = 0; i < keys.length; i++) {
      const temp = await requester.makeStructureRequest(lastNode.id);
      const child = temp.node.find((n) => n.info?.name == keys[i]);

      if (child == null) {
        throw new Error(`'${parent}' has no child '${keys[i]}`);
      }

      lastNode = this.insertNode(parent, child)!;

      if (i != keys.length - 1) {
        parent += "." + lastNode.name;
      }
    }

    const node = await requester.makeStructureRequest(lastNode.id);

    if (lastNode.childCount() != node.node.length) {
      lastNode = this.insertNode(parent, node)!;
    }

    return lastNode;
  };
}

export default Memory;
