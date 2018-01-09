import * as NavData from "../../nav/data.json";
import {RoomLocation} from "./Components/autoComplete";
import Graph = require('node-dijkstra');

interface CostList {
    [id: string]: number;
}

export const Navigator = {

    navigateGlobal: function (start: RoomLocation, end: RoomLocation): Point[] {
        //TODO: Make global, comment
        const result = this.navigateFloor(start.id, end.id, 1);

        const path: Point[] = [];

        for (let node of result)
            path.push(NavData.floors[1][node].location);

        return path;
    },

    navigateFloor: function (start: number, end: number, floorId: number) {
        //Get graph
        const graph = this.getGraph(NavData.floors[floorId.toString()]);

        //Get result
        return graph.path(start.toString(), end.toString());
    },

    getGraph: function(floor: Floor) {
        //Create new Graph-Map
        const graph = new Map();

        for (let key of Object.keys(floor)) {
            //Get room
            let room = floor[key];

            //Create new Map
            let map = new Map();

            //For each connected node
            for (let node of room.connectedTo)
                //Calc costs and add to map
                map.set(node.toString(), this.getCost(room.location, floor[node].location));

            //Add map to graph
            graph.set(key.toString(), map);
        }

        //Create graph obj
        return new Graph(graph);
    },

    getCost(x: Point, y: Point): number {
        //Calc distance
        const distance = Math.sqrt(Math.pow(x.x - y.x, 2) + Math.pow(x.y - y.y, 2));

        //Distance should not be null !
        return distance > 0 ? distance : 0.000001;
    }
};