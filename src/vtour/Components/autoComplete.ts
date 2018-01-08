import * as NavData from "../../../nav/data.json";

export const AutoComplete = {

    getResults: function(input: String) {
        //Remove unnecessary whitespaces, text to lower case
        input = input.toLowerCase().trim();

        //Check if input is empty
        if(input == "")
            return [];

        console.log(NavData.floors[1][0].description);

        //Get all numbers out of text (test213 21 => 21321)
        const number = input.replace(/[^0-9]/g, '');

        //Create Result array
        const result: string[] = [];

        for (let floor of NavData.floors) {
            for (let key of Object.keys(floor)) {
                let room = floor[key];

                if (room.description.toLocaleLowerCase().contains(input) || room.number.startsWith(number))
                    result.push(room.description + " " + room.number);
            }
        }

        return result;
    },

    getRoomNumber: function (input: string) {
      return this.getResults(input)[0];
    }
};

