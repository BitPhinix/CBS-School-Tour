/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import SvgJs = require("svg.js");
import {RoomLocation} from "../Components/autoComplete";
import {Navigator} from "../navigator";
import PanZoom = require("svg-pan-zoom");

export const Map2d  = {
    SvgContainer: $("#Map2dContainer"),
    SvgElement: undefined,
    SvgPanZoom: undefined,
    Overlay: undefined,
    HammerJs: undefined,
    Ready: false,

    init: function() {
        //Load first floor
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
        //Clear container (Remove old Map2d)
        this.SvgContainer.empty();

        //Create new Map2d
        this.SvgElement = SvgJs('Map2dContainer').attr("id","Map2d");

        //Load Svg, call initSvg when data is received
        $.get(path, (data) => this.initSvg(data), 'xml');
    },

    navigate: function (start: RoomLocation, end: RoomLocation) {
        //Create new Overlay
        this.Overlay = new SvgJs.G();

        //Get Path
        const result = Navigator.navigateGlobal(start, end);

        //For each point in Path
        for (let i = 0; i < result.length; i++) {
            //Exclude first one
            if(i !== 0)
                //Draw Line between current and previous point
                this.drawLine(result[i - 1], result[i], 10, "rgb(255, 0, 0)", this.Overlay);

            //Exclude last one
            if(i !== result.length -1)
                //Draw Circle with the width of the path (for rounded corners)
                this.drawDot(result[i], 10, "rgb(255, 0, 0)", this.Overlay);
            else //Only last one
                //Draw the big destination circle
                this.drawDot(result[i], 18, "rgb(255, 0, 0)", this.Overlay);
        }

        //Load floor with overlay
        this.loadFloor(1);
    },

    initSvg: function (data) {
        //Add loaded data to svg element
        this.SvgElement.svg($('svg', data).html());

        //If there is a overlay
        if(this.Overlay) {
            //Add it to SVG
            this.SvgElement.add(this.Overlay);

            //Dispose of it (is still in SVG)
            this.Overlay = null;
        }

        //Create new PanZoom Obj
        this.SvgPanZoom = PanZoom("#Map2d", {
            panEnabled: true,
            controlIconsEnabled: false,
            zoomEnabled: true,
            dblClickZoomEnabled: true,
            mouseWheelZoomEnabled: true,
            preventMouseEventsDefault: true,
            zoomScaleSensitivity: 0.2,
            minZoom: 0.5,
            maxZoom: 4,
            fit: false,
            contain: false,
            center: false,
            refreshRate: 'auto',
            eventsListenerElement: null
        });

        //Center Map2d
        this.SvgPanZoom.center();

        //And we are ready ^^
        this.Ready = true;
    },

    lookTo: function(floorId: number, x: number, y: number) {
        this.SvgPanZoom.reset().zoom(1);

        const size = this.SvgPanZoom.getSizes();

        this.SvgPanZoom.pan({x: size.viewBox.width - x, y: size.viewBox.height - y});
        this.SvgPanZoom.zoomBy(4);
    },

    drawLine: function (x: Point, y: Point, width: number, color: string, container: SvgJs.G) {
        //Well, that should be self explanatory
        container.line(x.x, x.y, y.x, y.y).stroke({ width: width, color: color });
    },

    drawDot: function (location: Point, radius: number, color: string, container: SvgJs.G) {
        //Well, that should be self explanatory
        container.circle(radius).cx(location.x).cy(location.y).fill({color: color});
    }
};
