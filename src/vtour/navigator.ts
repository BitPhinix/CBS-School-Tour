import * as NavData from "../../nav/data.json";
import {RoomLocation} from "./Components/autoComplete";
import Graph = require('node-dijkstra');
import {_Number} from "svg";

export const Navigator = {

    navigateGlobal: function (start: RoomLocation, end: RoomLocation, floorId: number): RoomLocation[][] {
        //Create the result array
        const result = [];

        //Calculate the difference of floors
        const floorDiv = Math.abs(start.floor - end.floor);

        //Check if we have to go downwards
        const downwards = start.floor < end.floor;

        //Sat the current pos to start
        let currentPos = start;

        //For each floor that
        for (let i = 0; i < floorDiv; i++) {
            //Calculate the current floor
            let floor = start.floor + (downwards ? i : -i);

            //Get the staircase we have to go to
            let stairCase = this.findStaircase(currentPos.id, floor, (downwards ? 1 : -1));

            //Navigate to the staircase and put it in the result array
            result[floor] = this.navigateFloor(currentPos.id, stairCase.id, floor);

            //Update currentPos to Staircase
            currentPos = stairCase;
        }

        //Navigate from staircase to dest.
        return result[end.floor] = this.navigateFloor(currentPos, end.id, floorId);
    },

    toCooridnates: function (path?: RoomLocation[]) {
        //Initialize result array
        const result = [];

        //For each node in the path
        for (let node of path)
            //Get pos and add it to the result array
            result.push(NavData[node.floor][node.id].location);

        //Return result
        return result;
    },

    findStaircase: function (position: number, floorId: number, leadTo: number) : RoomLocation {
        //Get all Staircases that lead to the desired floor (1, -1)
        const stairCases = Object.values(NavData.floors[floorId.toString()]).filter(function (room) {
            return room.leadTo == leadTo;
        });

        let result;
        let lowestCost = 0;

        //For each staircase in the viable Staircases
        for (let strainCase of stairCases) {
            //Get the cost it takes to get there
            let cost = this.getCost(strainCase.location, position;

            //Check if it is cheaper than the cheapest one checked or if result was not initialized
            if(!result || cost < lowestCost) {
                //Set the result to the current staircase
                result = stairCases;

                //Update lowest cost
                lowestCost = cost;
            }
        }

        //Return the result
        return {
            floor: floorId,
            id: result.number
        };
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
                map.set(node.toString(), this.getCost(room.location, floor[node.toString()].location));

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