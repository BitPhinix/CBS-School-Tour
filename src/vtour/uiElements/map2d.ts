/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import SvgJs = require("svg.js");
import {RoomLocation} from "../Components/autoComplete";
import {Navigator} from "../navigator";
import PanZoom = require("svg-pan-zoom");

export const Map2d  = {
    SvgContainer: $("#Map2dContainer"),
    SvgElement: undefined,
    SvgPanZoom: undefined,
    DrawContainer: undefined,
    Ready: false,

    init: function() {
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
        this.SvgContainer.empty();

        const svgElement = SvgJs('Map2dContainer').attr("id","Map2d");

        $.get(path, function(contents) {
            const $tmp = $('svg', contents);
            svgElement.svg($tmp.html());
        }, 'xml');

        this.DrawContainer = svgElement.group();
        this.SvgElement = svgElement;
        this.Ready = false;

        $("#Map2d").on("click",() => this.initPanZoom());
    },

    navigate: function (start: RoomLocation, end: RoomLocation) {
        this.loadFloor(start.floor);

        const result = Navigator.navigateGlobal(start, end);

        for (let i = 1; i < result.length; i++)
            this.drawLine(result[i - 1], result[i]);
    },

    initPanZoom: function() {
        if(this.Ready)
            return;

        this.SvgPanZoom = PanZoom("#Map2d", {
            panEnabled: true,
            controlIconsEnabled: false,
            zoomEnabled: true,
            dblClickZoomEnabled: true,
            mouseWheelZoomEnabled: true,
            preventMouseEventsDefault: true,
            zoomScaleSensitivity: 0.2,
            minZoom: 0.5,
            maxZoom: 3,
            fit: false,
            contain: false,
            center: false,
            refreshRate: 'auto',
            eventsListenerElement: null
        });

        this.Ready = true;
    },

    lookTo: function(floorId: number, x: number, y: number) {
        this.SvgPanZoom.reset();

        let sizes = this.SvgPanZoom.getSizes();
        this.SvgPanZoom.zoomAtPoint(4,{x: x * ((sizes.width - sizes.viewBox.x)  / sizes.viewBox.width), y: y *  ((sizes.height - sizes.viewBox.y) / sizes.viewBox.height) }).delay(800);
    },

    drawLine: function (x: Point, y: Point) {
        this.DrawContainer.line(x.x, x.y, y.x, y.y).stroke({ width: 10, color: "rgb(255, 0, 0)" });
    },
};
