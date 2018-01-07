export var AutoComplete = {
    RoomMax: 300,
    RoomMin: 0,
    SpecialRooms : ["Sekretariat", "Lehrerzimmer", "Physiklabor"],

    getResults: function(input: String) {
        //Remove unnecessary whitespaces, text to lower case
        input = input.toLowerCase().trim();

        //Check if input is empty
        if(input == "")
            return [];

        //Check if SpecialRooms contains a part on input
        const result = this.SpecialRooms.filter(value => value.toLowerCase().includes(input));

        //Get all numbers out of text (test213 21 => 21321)
        const number = parseInt(input.replace(/[^0-9]/g, ''));

        //Check if number is in range
        if(number <= this.RoomMax && number >= this.RoomMin)
        //Add Room with number to the result
            result.push("Raum " + number);

        return result;
    }
};