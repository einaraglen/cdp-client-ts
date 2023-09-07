import { TreeNode } from "./memory";
import { CDPNodeType, CDPValueType } from "./studio.proto";
import ValueCallbacks from "../handlers/callbacks/value_callbacks"
import Requester from "../handlers/requester";

class StructureNode {
  private id: number;
  public name: string;
  public nodeType: CDPNodeType;
  public valueType: CDPValueType;
  public typeName: string
  public route: string;
  public children: Record<string, Omit<TreeNode, "id" | "children">> = {};

  constructor(parent: string, node: TreeNode) {
    this.id = node.id
    this.name = node.name;
    this.nodeType = node.nodeType;
    this.valueType = node.valueType;
    this.typeName = node.typeName;
    this.route = parent.includes(node.name) ? parent : parent + "." + node.name;
    this.insertChildren(node.children);
  }

  public forEachChild = (callback: (child: Omit<TreeNode, "id" | "children">) => void) => {
    for (const name in this.children) {
      callback(this.children[name]);
    }
  };

  public getValue = () => {
    return new Promise<any>((resolve) => {
        const callbacks = ValueCallbacks.instance();

        const consumer = (value: any) => {
            callbacks.unregisterCallback(this.id, consumer)
            resolve(value)
        }

        callbacks.registerCallback(this.id, this.valueType, consumer)
    })
  }

  public setValue = (value: any, timestamp?: number) => {
    const requester = Requester.instance();
    requester.makeSetRequest(this.id, this.valueType, value, timestamp)
  }

  public subscribeToValue = (callback: (value: any) => void) => {
    const callbacks = ValueCallbacks.instance();
    callbacks.registerCallback(this.id, this.valueType, callback)
  };

  public unsubscribeToValue = (callback: (value: any) => void) => {
    const callbacks = ValueCallbacks.instance();
    callbacks.unregisterCallback(this.id, callback)
  };

  private insertChildren = (children: Record<string, TreeNode>) => {
    for (const name in children) {
      const child = { ...children[name] } as any;
      delete child.id;
      delete child.children;
      this.children[name] = child;
    }
  };
}

export default StructureNode;
