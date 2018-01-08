import * as NavData from "../../nav/data.json";
import {RoomLocation} from "./Components/autoComplete";

//TODO: REWRITE !!!!!

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

export var Navigator = {

    navigate: function(start: number, end: number, floor: number) : string[]
    {
        const processed = [];
        const difficultyMap : DifficultyMap = { [start]: { parent:null, distance: 0}, [end]: { parent:null, distance: Infinity}};

        for (let child of NavData.floors[floor][start].connectedTo)
            difficultyMap[child] = { parent: start.toString(), distance: Infinity };

        let current : string;

        while (current = Navigator.getCheapest(difficultyMap, processed))
        {
            for(let child of NavData.floors[floor][current].connectedTo)
            {
                let cost = Navigator.getDistance(NavData.floors[floor][current].location, NavData.floors[floor][child].location);

                if(!difficultyMap.hasOwnProperty(child) || difficultyMap[child].distance > cost)
                    difficultyMap[child] = { parent: current, distance: cost };
            }

            processed.push(current);
        }

        let result : string[] = [end.toString()];
        let parent = difficultyMap[end].parent;

        while(parent)
        {
            result.unshift(parent);
            parent = difficultyMap[parent].parent;
        }

        return result;
    },

    getCheapest: function(difficultyMap : DifficultyMap, processed : string[]) : string {
        let cheapest : string = null;

        for (let key of Object.keys(difficultyMap))
            if((cheapest == null || difficultyMap[key] < difficultyMap[cheapest]) && processed.indexOf(key) === -1)
                cheapest = key;

        return cheapest;
    },

    getDistance: function(p1: Position, p2: Position) : number
    {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    },
};