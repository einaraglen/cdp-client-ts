# CDP Studio Client - Isomorphic - TypeScript

### CDP Studio Client for Browser and Node.js

Install using `npm install cdp-client-ts`

Example Use:
```typescript
import { Client, ClientOptions, CDPNodeType } from "cdp-client-ts";

/* Using isomorphic-ws, works in Browser and Node.js environments */
async function main() {

  /* Default options can be changed on Client Init */
  const options: ClientOptions = {
    protocol: "ws://",  // ws:// or wss://
    maxRetry: 0,        // maxRetry == 1 => Infinity
    retryTimeout: 3e4   // waiting time before retrying connection
  }
  
  /* Can initiate Client with or without options */
  const client = new Client("127.0.0.1:7694", options);
  
  
  /* Iterate Over Children */
  const component: StructureNode = await client.find("SomeComponent.SomeSubComponent")
  component.forEachChild((child) => {
    if (child.nodeType == CDPNodeType.CDP_OBJECT) {
      console.log(child.route, child.id, child.lastValue)
    }
  })
  
  
  /* Get Value Async or Subscribe with callback */
  const node: StructureNode  = await client.find("SomeComponent.SomeSubComponent.SomeNode")
  const nodeValue = await node.getValue()
  node.subscribeToValue((value) => console.log(value))
  
}
```

### Missing Features
- Structure Change in Studio Tree
- Authentication on init and ReAuth events

Inspiration: [CDP Client (JavaScript)](https://github.com/CDPTechnologies/JavascriptCDPClient)