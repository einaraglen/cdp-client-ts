import { TreeNode } from "./memory";
import { CDPNodeType, CDPValueType } from "./studio.proto";
import ValueCallbacks from "../handlers/callbacks/value_callbacks";
import Requester from "../handlers/requester";

class StructureNode {
  public id: number;
  public name: string;
  public nodeType: CDPNodeType;
  public valueType: CDPValueType;
  public typeName: string;
  public route: string = "";
  private children: Record<string, Omit<TreeNode, "children">> = {};

  constructor(parent: string, node: TreeNode) {
    this.id = node.id;
    this.name = node.name;
    this.nodeType = node.nodeType;
    this.valueType = node.valueType;
    this.typeName = node.typeName;
    this.insertRoute(parent, node.name);
    this.insertChildren(node.children);
  }

  /**
   * Iterate over Child Nodes
   * @param callback Function
   */
  public forEachChild = (callback: (child: Omit<TreeNode, "children">) => void) => {
    for (const name in this.children) {
      callback(this.children[name]);
    }
  };

  /**
   * Check for Child in Node
   * @param key String
   * @returns Boolean
   */
  public hasChild = (key: string) => {
    return key in this.children;
  };

  /**
   * Retrive Child of Node
   * @param key String
   * @returns TreeNode
   * @throws Error
   */
  public child = (key: string) => {
    if (!this.hasChild(key)) {
      throw new Error(`'${this.route}' has no child '${key}'`);
    }

    return this.children[key];
  };

  /**
   *  Retrive value async
   * @returns Promise<Value>
   */
  public getValue = () => {
    return new Promise<any>((resolve) => {
      const callbacks = ValueCallbacks.instance();

      const consumer = (value: any) => {
        callbacks.unregisterCallback(this.id, consumer);
        resolve(value);
      };

      callbacks.registerCallback(this.id, this.valueType, consumer);
    });
  };

  /**
   * Set Value of Node
   * @param value Value
   * @param timestamp Number
   */
  public setValue = (value: any, timestamp?: number) => {
    const requester = Requester.instance();
    requester.makeSetRequest(this.id, this.valueType, value, timestamp);
  };

  /**
   *  Subscribe to Value
   * @param callback Function
   */
  public subscribeToValue = (callback: (value: any) => void) => {
    const callbacks = ValueCallbacks.instance();
    callbacks.registerCallback(this.id, this.valueType, callback);
  };

  /**
   * Unsubscribe to Value
   * @param callback Function
   */
  public unsubscribeToValue = (callback: (value: any) => void) => {
    const callbacks = ValueCallbacks.instance();
    callbacks.unregisterCallback(this.id, callback);
  };

  private insertRoute = (parent: string, name: string) => {
    const keys = parent.split(".");
    const filteren = keys.filter((key) => key != name);
    this.route = [...filteren, name].join(".");
  };

  private insertChildren = (children: Record<string, TreeNode>) => {
    for (const name in children) {
      const child = { ...children[name] } as any;
      delete child.children;
      this.children[name] = child;
    }
  };
}

export default StructureNode;
