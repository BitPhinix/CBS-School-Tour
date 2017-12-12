export interface NavigationMap
{
    [name: string]: NavigationPoint;
}

interface NavigationPoint
{
    connectedTo: string[];
    type: NavigationPointType;
    position: Position;
}

interface NavigationPointType
{
    corridor,
    room,
    stairway
}

interface Position
{
    x: number;
    y: number;
}

interface DifficultyMap {
    [key: string] : { distance : number, parent: string };
}

function getDistance(p1: Position, p2: Position) : number
{
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export function navigate(start: string, end: string, map: NavigationMap) : string[]
{
    const processed = [];
    const difficultyMap : DifficultyMap = { [start]: { parent:null, distance: 0}, [end]: { parent:null, distance: Infinity}};

    for (let child of map[start].connectedTo)
        difficultyMap[child] = { parent: start, distance: Infinity };

    let current : string;

    while (current = getCheapest(difficultyMap, processed))
    {
        for(let child of map[current].connectedTo)
        {
            let cost = getDistance(map[current].position, map[child].position);

            if(!difficultyMap.hasOwnProperty(child) || difficultyMap[child].distance > cost)
                difficultyMap[child] = { parent: current, distance: cost };
        }

        processed.push(current);
    }

    let result : string[] = [end];
    let parent = difficultyMap[end].parent;

    while(parent)
    {
        result.unshift(parent);
        parent = difficultyMap[parent].parent;
    }

    return result;
}

function getCheapest (difficultyMap : DifficultyMap, processed : string[]) : string {
    let cheapest : string = null;

    for (let key of Object.keys(difficultyMap))
        if((cheapest == null || difficultyMap[key] < difficultyMap[cheapest]) && processed.indexOf(key) === -1)
            cheapest = key;

    return cheapest;
}