import * as NavData from "../../../nav/data.json";

export const AutoComplete = {

    getResults: function(input: String) {
        //Remove unnecessary whitespaces, text to lower case
        input = input.toLowerCase().trim();

        //Check if input is empty
        if(input == "")
            return [];

        //Get all numbers out of text (test213 21 => 21321)
        const number = input.replace(/[^0-9]/g, '');

        //Create Result array
        const result: string[] = [];

        //For each floor
        for (let floorId in NavData.floors) {
            let floor = NavData.floors[floorId];

            //For each room in the floor
            for (let key of Object.keys(floor)) {
                let room = floor[key];

                //If room description includes text or room number start with number
                if (room.number && room.description && (room.description.toLowerCase().includes(input) || number && room.number.toString().startsWith(number)))
                    //Add to room to result array
                    result.push(room.description + " " + room.number);
            }
        }

        return result.sort();
    },

    searchRoomLocation: function (input: string): RoomLocation {
        //Get all numbers out of input (test213 21 => 21321)
        const number = input.replace(/[^0-9]/g, '');

        //If input contains a number
        if(number)
            //Return roomLocation of room with number
            return this.getRoomLocation(number);

        //get AutoComplete results
        const results = this.getResults(input);

        //If we find 1 result
        if(results.length === 1)
            //Return location of result
            return this.getRoomLocation(results[0].number);
    },

    getRoomLocation: function (number: number): RoomLocation {
        //If no number was provided
        if(!number)
            //Return nothing
            return;

        //Eg has 0-99, OG 1 has 100-199 etc.
        const floor = Math.floor(number / 100).toString();

        //For each room in the floor
        for (let key of Object.keys(NavData.floors[floor])) {
            let room = NavData.floors[floor][key];

            //If numbers match, return result
            if (room && room.number && room.number == number)
                //Return details
                return {
                    floor: parseInt(floor),
                    id: parseInt(key)
                };
        }
    }
};

export interface RoomLocation {
    floor: number;
    id: number;
}

