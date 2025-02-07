// import Client, { ClientOptions } from "./client";
// import StructureNode from "./models/node";
// import { CDPNodeType, CDPValueType } from "./models/studio.proto";

import { StudioClient } from "./client";

const run = async () => {
    const client = new StudioClient("ws://127.0.0.1:7689")

    await client.connect()

    const node = await client.find("TestApp.Instructor.Crane.CraneState.Value")
    const node2 = await client.find("TestApp.Instructor.Crane.CraneState.Idle.Value")

    console.log(node?.getVariantValue(node?.lastValue!))
    console.log(node?.getVariantValue(node2?.lastValue!))

}

run()