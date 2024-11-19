// import Client, { ClientOptions } from "./client";
// import StructureNode from "./models/node";
// import { CDPNodeType, CDPValueType } from "./models/studio.proto";

import { StudioClient } from "./v2/client";

const run = async () => {
    const client = new StudioClient("ws://127.0.0.1:7689")

    await client.connect()

    const node = await client.find("TestApp.Instructor.Options.Option1.Value")

    node?.subscribeToValue((value) => {
        console.log(node.getVariantValue(value))
    })

}

run()



