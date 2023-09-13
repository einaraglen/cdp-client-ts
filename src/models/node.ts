import Memory from "./memory";
import { CDPNodeType, CDPValueType, Node } from "./studio.proto";
import ValueCallbacks from "../handlers/callbacks/value_callbacks";
import Requester, { CDPValue } from "../handlers/requester";

class StructureNode {
  public id: number;
  public name: string;
  public nodeType: CDPNodeType;
  public valueType: CDPValueType;
  public typeName: string;
  public route: string = "";
  public lastValue: any | null = null
  private children: Record<string, StructureNode> = {};

  constructor(parent: string | null, node: Node) {
    this.id = node.info?.nodeId!;
    this.name = node.info?.name!;
    this.nodeType = node.info?.nodeType!;
    this.valueType = node.info?.valueType!;
    this.typeName = node.info?.typeName!;
    this.insertRoute(parent, node.info?.name!);
    this.insertChildren(node.node);
  }

  /**
   * Iterate over Child Nodes
   * @param callback Function
   */
  public forEachChild = (callback: (child: StructureNode) => void) => {
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
  public setValue = (value: CDPValue, timestamp?: number) => {
    const requester = Requester.instance();
    requester.makeSetRequest(this.id, this.valueType, value, timestamp);
  };

  /**
   *  Subscribe to Value
   * @param callback Function
   */
  public subscribeToValue = (callback: (value: CDPValue) => void) => {
    const callbacks = ValueCallbacks.instance();
    callbacks.registerCallback(this.id, this.valueType, callback);
  };

  /**
   * Unsubscribe to Value
   * @param callback Function
   */
  public unsubscribeToValue = (callback: (value: CDPValue) => void) => {
    const callbacks = ValueCallbacks.instance();
    callbacks.unregisterCallback(this.id, callback);
  };

  public childCount = () => {
    return Object.keys(this.children).length
  }

  public insertChild = (child: StructureNode) => {
    this.children[child.name] = child;
  }

  private insertRoute = (parent: string | null, name: string) => {
    let temp = ""

    if (parent == null) {
      temp = name
    } else {
      const keys = parent.split(".");
      const filteren = keys.filter((key) => key != name);
      temp = [...filteren, name].join(".");
    }

    Memory.instance().registerNode(this.id, temp)
    this.route = temp;
    
  };

  private insertChildren = (children: Node[]) => {
    for (const node of children) {
      this.children[node.info?.name!] = new StructureNode(this.route, node);
    }
  };
}

export default StructureNode;
