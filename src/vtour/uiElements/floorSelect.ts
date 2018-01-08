import {Map2d} from "./map2d";

export const FloorSelect = {

    FloorSelect: $("#floorSelector"),

    init: function () {
        //For each child
        for (let child of this.FloorSelect.children()) {
            //Setup the click Event
            $(child).click((event) => this.onClick(event));
        }
    },

    onClick: function (event: JQuery.Event) {
        //Get the element
        const target = $(event.target);

        //Load the new Map
        Map2d.loadSvg("./svg/" + target.html() + ".svg");
    }
};