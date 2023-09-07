type MemoryTree<T> = {
    _id: number,
    [key: string]: T | number
}

class Memory {
    private static _instance: Memory | null = null;
    private memory: MemoryTree<any> = {} as any;

    private constructor() {

    }

    public static instance = () => {
        if (Memory._instance == null) {
            Memory._instance = new Memory()
        }

        return Memory._instance
    }


    public getNodeKey = (route: string) => {

    }

    public tryNodeKey = (route: string) => {
        const heritage = route.split(".");
        let lastLeaf: any = this.memory[heritage[0]]
        let lastKey: number = this.memory[heritage[0]]._id;
        let remaining: string[] = []

        for (let i = 1; i < heritage.length; i++) {
            if (lastLeaf[heritage[i]] == null) {
                remaining = heritage.slice(i, heritage.length);
                break;
            }

            lastLeaf = lastLeaf[heritage[i]]
            lastKey = lastLeaf[heritage[i]]._id
        }
    }

    public searchNodeKey = (parent: number, child: string) => {

    }
}

export default Memory;