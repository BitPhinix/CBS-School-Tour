///<reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import {AutoCompleteContainer} from "../Components/autoCompleteContainer";

export var NavSlider = {
    OpenButton: $("#navBarOpen"),
    CloseButton: $("#navBarClose"),
    SwapButton: $("#swapButton"),
    StartInput: $("#navStart"),
    DestinationInput: $("#navDestination"),
    Container: $("#navSlider"),
    AutoCompleteContainer: new AutoCompleteContainer(document.getElementById("autoCompleteContainerNav")),

    Opened: false,
    ActiveInput: null,

    init: function () {
        //Event Setup
        this.OpenButton.click(() => this.onToggleClick());
        this.CloseButton.click(() => this.onToggleClick());
        this.SwapButton.click(() => this.onSwapButtonClick());
        this.StartInput.on("input", (event) => this.onInputChange(event));
        this.StartInput.click((event) => this.onInputChange(event));
        this.DestinationInput.on("input", (event) => this.onInputChange(event));
        this.DestinationInput.click((event) => this.onInputChange(event));
        this.AutoCompleteContainer.OnRecommendationClickEvent.push((value) => this.onRecommendationEvent(value));
    },

    onToggleClick: function() {
        //if NavBar is visible
        if(this.Opened)
            //Change left margin to -1000px
            this.Container.animate({marginLeft: "-1000px"}, 100);
        else //else
            //Change left margin to 0
            this.Container.animate({marginLeft: "0"}, 100);

        //Set Opened to new state
        this.Opened = !this.Opened;
    },

    onInputChange: function (event: JQuery.Event) {
        //Get element
        const target = $(event.target);

        //Update AutoCompleteContainer
        this.AutoCompleteContainer.update(target.val());

        //Update ActiveInput
        this.ActiveInput = target;
    },

    onRecommendationEvent: function (value: String) {
        //Update the ActiveInput´s value to the Recommendation
        this.ActiveInput.val(value);
    },

    onSwapButtonClick: function () {
        //Save StartInput value
        const temp = this.StartInput.val();

        //Change StartInput value to DestinationInput value
        this.StartInput.val(this.DestinationInput.val());

        //Change DestinationInput value to temp
        this.DestinationInput.val(temp);
    }
};