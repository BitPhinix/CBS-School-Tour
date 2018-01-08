///<reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import svgPanZoom = require("svg-pan-zoom");
import {AutoComplete} from "../Components/autoComplete";

export const Map2d  = {
    SvgContainer: $("#Map2dContainer"),
    SvgElement: undefined,
    SvgPanZoom: undefined,

    init: function() {
        this.loadSvg("./svg/1 OG.svg");
    },

    loadSvg: function(source: string) {
        //Clear container
        this.SvgContainer.empty();

        //Create new SVG element
        const element = $("<embed src='" + source + "' type='image/svg+xml' id='Map2D'>");

        //Append to Container
        this.SvgContainer.append(element);

        //Update SvgElement
        this.SvgElement = element;

        //Add event listener
        element.on("load", () => this.onSvgLoad());
    },

    onSvgLoad: function () {
        //Init SvgPanZoom
        this.SvgPanZoom = svgPanZoom(this.SvgElement.get(0), {
            panEnabled: true,
            controlIconsEnabled: false,
            zoomEnabled: true,
            dblClickZoomEnabled: true,
            mouseWheelZoomEnabled: true,
            preventMouseEventsDefault: true,
            zoomScaleSensitivity: 0.2,
            minZoom: 0.5,
            maxZoom: 10,
            fit: true,
            center: true,
            refreshRate: "auto"
        });
    },

    navigate: function (start: string, destination: string) {

        const startNmbr = AutoComplete.getRoomNumber(start);
        const destNmbr = AutoComplete.getRoomNumber(destination);

    }
};
