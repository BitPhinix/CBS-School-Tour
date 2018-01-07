///<reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import {AutoComplete} from "./autoComplete";

interface RecommendationClickEventHandler {
    (value : string): void;
}

export class AutoCompleteContainer {
    container : JQuery;
    OnRecommendationClickEvent: RecommendationClickEventHandler[] = [];

    constructor(container: HTMLElement) {
        this.container = $(container);

        //Add click event-handler to document
        $(document).click(() => this.onDocumentClick());
    }

    clearContainer() {
        //JQuery <3
        this.container.empty();
    }

    update(text: string) {
        //Clear container
        this.clearContainer();

        //Get recommendations
        const recommendations = AutoComplete.getResults(text);

        //For each recommendation
        for (let recommendation of recommendations)
            //Append to list
            this.appendRecommendation(recommendation);
    }

    private appendRecommendation(text: String) {
        //Create element using JQuery magic
        const element = $("<li class='autoComplete row'><i class='fa fa-map-marker'></i><p>" + text + "</p></li>");

        //Add click event-handler
        element.click((eventHandler) => this.onRecommendationClick(eventHandler));

        //Append element as child
        this.container.append(element);
    }

    private onRecommendationClick(event: JQuery.Event) {
        //Stop Propagation of event (Prevent onDocumentClick)
        event.stopPropagation();

        //Get target
        let target = $(event.target);

        //If target isn´t the "p" tag
        if(target.prop("tagName") !== "P") {
            //Get closest p
            while (target && !target.find("P"))
                target = target.parent();

            //If nothing was found
            if(!target)
                return;

            //Get P
            target = target.find("P");
        }

        //Call each handler with the value of the clicked Recommendation
        for (let handler of this.OnRecommendationClickEvent)
            handler(target.html());

        //Clear container
        this.clearContainer();
    }

    private onDocumentClick() {
        //Clear container
        this.clearContainer();
    }
}
