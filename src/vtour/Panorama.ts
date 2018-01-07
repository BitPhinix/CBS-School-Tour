import * as Marzipano from "../../node_modules/marzipano/dist/marzipano.js";

//TODO: REWRITE !!!!!

export interface Position {
    yaw: number,
    pitch: number,
    fov: number
}

export class Panorama {
    viewer: any;
    scene: any;

    constructor(element: HTMLElement) {
        const viewerOpts = {
            controls: { mouseViewMode: 'drag'}
        };

        this.viewer = new Marzipano.Viewer(element, viewerOpts);
    }

    loadScene(id: string | number, initialView: Position): any {
        const levels = [
            { "tileSize": 256, "size": 256, "fallbackOnly": true},
            { "tileSize": 512, "size": 512},
            { "tileSize": 512, "size": 1024},
            { "tileSize": 512, "size": 2048},
            { "tileSize": 512, "size": 4096}
        ];

        const geometry = new Marzipano.CubeGeometry(levels);
        const source = Marzipano.ImageUrlSource.fromString(`./tiles/${id}/{z}/{f}/{y}/{x}.jpg`);
        const limiter = Marzipano.RectilinearView.limit.traditional(100, 120*Math.PI/180);
        const view = new Marzipano.RectilinearView(initialView, limiter);

        this.scene = this.viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true
        });
    }

    showScene() {
        this.scene.switchTo({
            transitionDuration: 1000
        });
    }

    lookTo(pos: Position, transDuration: number) {
        this.scene.lookTo(pos, {transitionDuration: transDuration});
    }

    pinElement(element: HTMLElement, pos: Position) {
        this.scene.hotspotContainer().createHotspot(element, pos);
    }
}