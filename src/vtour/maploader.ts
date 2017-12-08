const chunkSize = 20;

export function getChunkData(x1 : number, y1 : number, x2 : number, y2 : number, z : number) : ChunkData[] {
    const xMax = x1 < x2 ? x2 : x1;
    const xMin = x1 > x2 ? x2 : x1;
    const yMax = y1 < y2 ? y2 : y1;
    const yMin = y1 > y2 ? y2 : y1;

    var result : ChunkData[] = [];

    for(let x = xMin; x <= xMax; x += chunkSize)
        for(let y = yMin; y <= yMax; y += chunkSize)
            result.push(getChunk(x, y, z));

    return result;
}

export function getChunk(x : number, y : number, z : number) : ChunkData {
    x %= chunkSize;
    y %= chunkSize;

    fetch(`chunks/${x}-${y}-${z}.json`).then(
        function (response) {
            if(response.ok && response.status === 200)
                return JSON.stringify(response.text());
        }
    );
    
    return null;
}

interface ChunkData {
    labels: Label[];
    lines: Line[];
}

interface Label {
    position: Position;
    content: Text;
}

enum LineType {
    navigation,
    wall
}

interface Line {
    type: LineType;
    points: Position[];
}

interface Position {
    x: number;
    y: number;
}