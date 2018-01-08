///<reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import {AutoCompleteContainer} from "../Components/autoCompleteContainer";
import {AutoComplete} from "../Components/autoComplete";

export var NavSlider = {
    OpenButton: $("#navBarOpen"),
    CloseButton: $("#navBarClose"),
    SwapButton: $("#swapButton"),
    StartInput: $("#navStart"),
    DestinationInput: $("#navDestination"),
    Container: $("#navSlider"),
    DestinationSearchIcon: $("#destinationSearchIcon"),
    StartSearchIcon: $("#startSearchIcon"),
    SearchInput: $("#searchBox"),
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
        this.StartSearchIcon.click((event) => this.onSearchIconClick(event));
        this.DestinationSearchIcon.click((event) => this.onSearchIconClick(event));
    },

    onSearchIconClick: function (event: JQuery.Event) {
        //Get the target input
        const target = $(event.target).parent().find("input");

        //Set value of SearchInput
        this.SearchInput.val(target.val());

        //Fire update event
        this.SearchInput.trigger("input");

        //Close navBar
        this.onToggleClick();

        //TODO: Zoom To Room
    },

    onRecommendationEvent: function (value: string) {
        //Change ActiveInput value to Recommendation
        this.ActiveInput.val(value);

        //Fire update event
        this.ActiveInput.trigger("input");
    },

    onToggleClick: function() {
        //if NavBar is visible
        if(this.Opened)
            //Change left margin to -1000px
            this.Container.animate({marginLeft: "-1000px"}, 100);
        else { //else
            //Change left margin to 0
            this.Container.animate({marginLeft: "0"}, 100);

            //Copy SearchInput value to DestinationInput
            this.DestinationInput.val(this.SearchInput.val());
        }

        //Set Opened to new state
        this.Opened = !this.Opened;
    },

    onInputChange: function (event: JQuery.Event) {
        //Get element
        const target = $(event.target);

        //If value is empty or whitespace, icon should not be visible
        const iconVisible = target.val().toString().trim() !== "";

        //If target is DestinationInput
        if(target.get(0) == this.DestinationInput.get(0))
            //Change icon visibility of DestinationSearchIcon
            this.changeVisibility(this.DestinationSearchIcon, iconVisible);
        else //else
            //Change icon visibility of StartSearchIcon
            this.changeVisibility(this.StartSearchIcon, iconVisible);

        //Update AutoCompleteContainer
        this.AutoCompleteContainer.update(target.val());

        //Update ActiveInput
        this.ActiveInput = target;

        //Check if input is complete
        if(AutoComplete.isRoom(this.DestinationInput.val()) && AutoComplete.isRoom(this.StartInput.val()))
            //TODO: Navigate
            console.log("navigate");
            return;
    },

    changeVisibility: function (element: JQuery, visible: boolean) {
        //If element should be visible set visibility to shown, else hidden
        element.css("visibility", visible ? "visible" : "hidden");
    },

    onSwapButtonClick: function () {
        //Save StartInput value
        const temp = this.StartInput.val();

        //Change StartInput value to DestinationInput value
        this.StartInput.val(this.DestinationInput.val());

        //Change DestinationInput value to temp
        this.DestinationInput.val(temp);

        //Update AutoComplete
        this.DestinationInput.trigger("input");
        this.StartInput.trigger("input");
    }
};