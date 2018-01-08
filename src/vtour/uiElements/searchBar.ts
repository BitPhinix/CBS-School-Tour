///<reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import {AutoCompleteContainer} from "../Components/autoCompleteContainer";
import {AutoComplete} from "../Components/autoComplete";

export var SearchBar = {
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
        //Todo Zoom to element
    },

    onInputChange(event: JQuery.Event) {
        //Get element
        const target = $(event.target);

        //Update AutoCompleteContainer
        this.AutoCompleteContainer.update(target.val());
    },

    onWindowResize() {
        //Check if the width of the windows is < 350 and change placeholder accordingly
        $("#searchBox").attr("placeholder", window.outerWidth < 350 ? "Suchen" : "In CBS Mannheim suchen");
    }
};