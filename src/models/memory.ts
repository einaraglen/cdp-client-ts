type MemoryTree<T> = {
    _id: number,
    [key: string]: T | number
}

class Memory {
    private memory: MemoryTree<any> = {} as any;

    constructor() {

    }

    public getNodeKey = (route: string) => {

    }

    public tryNodeKey = (route: string) => {
        const heritage = route.split(".");
        let lastLeaf: any = this.memory[heritage[0]]
        let lastKey: number = this.memory[heritage[0]]._id;

        for (let i = 1; i < heritage.length; i++) {
            if (lastLeaf[heritage[i]] == null) {
                break;
            }

            lastLeaf = lastLeaf[heritage[i]]
            lastKey = lastLeaf[heritage[i]]._id
        }
    }
}

export default Memory;