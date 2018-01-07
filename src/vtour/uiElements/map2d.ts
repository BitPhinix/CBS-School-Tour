///<reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import svgPanZoom = require("svg-pan-zoom");

export var Map2d  = {
    svgElement: $("#Map2D"),

    init: function() {
        //Add event listeners
        this.svgElement.ready(() => this.onSvgLoad());

    },

    onSvgLoad: function() {
        //Init map
        this.svgElement = svgPanZoom(this.svgElement.get(0), {
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
            contain: false,
            center: true,
            refreshRate: 'auto'
        });
    }
};