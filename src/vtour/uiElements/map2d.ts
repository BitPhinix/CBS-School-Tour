/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import SvgJs = require("svg.js");

export const Map2d  = {
    SvgContainer: $("#Map2dContainer"),
    SvgElement: undefined,
    SvgPanZoom: undefined,

    init: function() {
        //this.loadSvg("./svg/1 OG.svg");
        this.draw();
        this.loadFloor(1);
    },

    loadFloor: function (floorId: number) {
        //Nothing to comment here ^^
        if(floorId == -1)
            this.loadSvg("./svg/1 UG.svg");
        else if(floorId == 0)
            this.loadSvg("./svg/EG.svg");
        else if(floorId == 1)
            this.loadSvg("./svg/1 OG.svg");
        else if(floorId == 2)
            this.loadSvg("./svg/2 OG.svg");
    },

    loadSvg: function (path: string) {
        const svgElement = SvgJs('Map2dContainer');

        $.get(path, function(contents) {
            const $tmp = $('svg', contents);
            svgElement.svg($tmp.html());
        }, 'xml');

        this.SvgElement = svgElement;
    },

    lookTo: function(floorId: number, x: number, y: number) {

    },

    draw: function () {

    },
};
