///<reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import {AutoCompleteContainer} from "../Components/autoCompleteContainer";
import {AutoComplete} from "../Components/autoComplete";
import {Map2d} from "./map2d";
import * as NavData from "../../../nav/data.json";
import Toastr = require("toastr");

export const SearchBar = {
    Input: $("#searchBox"),
    FindButton: $("#findElement"),
    AutoCompleteContainer: new AutoCompleteContainer(document.getElementById("autoCompleteContainer")),

    init() {
        //Add event handlers
        this.AutoCompleteContainer.OnRecommendationClickEvent.push((value) => this.onRecommendationClick(value));
        this.Input.on("input", (event) => this.onInputChange(event));
        this.Input.click((event) => this.onInputChange(event));
        this.FindButton.click(() => this.onFindButtonClick());
        $(window).on("resize", () => this.onWindowResize());
    },

    onRecommendationClick(value: String) {
        //Change Input value to Recommendation
        this.Input.val(value);
    },

    onFindButtonClick: function () {
        //Try to find the room
        const result = AutoComplete.searchRoomLocation(this.Input.val());

        //Location was not found
        if(!result)
            Toastr.error("Eingabe ist nicht eindeutig!");
        else {
            //Get location
            const location = NavData.floors[result.floor][result.id].location;

            //Look to location
            Map2d.lookTo(result.floor, location.x, location.y);
        }
    },

    onInputChange(event: JQuery.Event) {
        //Get element
        const target = $(event.target);

        //Stop event Propagation
        event.stopPropagation();

        //Update AutoCompleteContainer
        this.AutoCompleteContainer.update(target.val());
    },

    onWindowResize() {
        //Check if the width of the windows is < 350 and change placeholder accordingly
        $("#searchBox").attr("placeholder", window.outerWidth < 350 ? "Suchen" : "In CBS Mannheim suchen");
    }
};