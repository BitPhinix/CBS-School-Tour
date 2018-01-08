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
        let target = $(event.target);

        //Load the new Map
        Map2d.loadSvg("./svg/" + target.html() + ".svg");

        //Get div
        while (target && target.prop("tagName") !== "DIV")
            target = target.parent();

        if(!target)
            return;

        //Remove clicked class of div
        for (let child of this.FloorSelect.children())
            $(child).removeClass("clicked");

        //Add class clicked
        target.addClass("clicked");
    }
};