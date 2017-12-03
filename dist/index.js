"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Panorama_1 = require("./Panorama");
var pano = new Panorama_1.Panorama(document.getElementById("pano"));
pano.loadScene("1", { fov: 0, pitch: 0, yaw: 2 });
pano.pinElement(document.getElementById("red"), { fov: 1, pitch: 0, yaw: -0.15 });
pano.showScene();
pano.lookTo({ fov: 1, pitch: 0, yaw: -0.15 }, 1000);
//# sourceMappingURL=index.js.map