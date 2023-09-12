import Client, { ClientOptions } from "./client";
import { TreeNode } from "./models/memory";
import StructureNode from "./models/node";
import { CDPNodeType, CDPValueType } from "./models/studio.proto";

const client = new Client("127.0.0.1:7694");

const test = async () => {
        const enable = await client.find("SimulatorInterface.WebUI.Misc")
        const prom = []
        enable.forEachChild((child) => {
            prom.push(async () => {
                const _child = await client.find(child.route + ".Description")
                const value = await _child.getValue()
            })
        })
  
    // const value = await enable.getValue()

    const enable2 = await client.find("SimulatorInterface.WebUI.Misc.Enable10ft")
    // const value = await enable2.getValue()

    console.log(enable2.lastValue)
}

test().then(test)


export { Client, ClientOptions, StructureNode, TreeNode, CDPNodeType, CDPValueType };
