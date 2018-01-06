///<reference path="../../../node_modules/@types/jquery/index.d.ts"/>
import svgPanZoom = require("svg-pan-zoom");

export class Map2d {
    private svgElement;

    constructor(element: HTMLElement, path: string) {
        $(element).ready(() => this.onSvgLoad(element));
    }

    private onSvgLoad(element) {
        this.svgElement = svgPanZoom(element, {
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
}