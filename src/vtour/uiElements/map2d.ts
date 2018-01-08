/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>

import svgPanZoom = require("svg-pan-zoom");
import * as NavData from "../../../nav/data.json";
import {AutoComplete} from "../Components/autoComplete";
import {RoomLocation} from "../Components/autoComplete";
import enumerate = Reflect.enumerate;

export const Map2d  = {
    SvgContainer: $("#Map2dContainer"),
    SvgElement: undefined,
    SvgPanZoom: undefined,

    init: function() {
        this.loadSvg("./svg/1 OG.svg");
        this.drawPath();
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

        const beforePan = function(oldPan, newPan){
            var stopHorizontal = true
                , stopVertical = true
                , gutterWidth = 1000
                , gutterHeight = 600
                // Computed variables
                , sizes = this.getSizes()
                , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
                , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
                , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
                , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

            const customPan =
                {
                    x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
                    y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
                }

            return customPan
        }

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
            refreshRate: "auto",
            beforePan: beforePan
        });
    },

    navigate: function (start: string, destination: string) {

    },

    drawPath: function () {

    }
};
