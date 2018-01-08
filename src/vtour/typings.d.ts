declare module "*data.json" {
    const Data: NavData;
    export = Data;
}

declare class NavData {
    [id: string]: Floor;
}

declare class Floor {
    [id: number]: ClassRoom;
}

declare class ClassRoom {
    description: string;
    number: number;
    connectedTo: number[];
    location: Point;
}

declare class Point {
    x: number;
    y: number;
}
