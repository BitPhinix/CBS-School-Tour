import {navigate} from "./navigator";
import {NavigationMap} from "./navigator";
import {SearchProvider} from "./searchProvider";

//Search-boxes
SearchProvider.registerSearchBox(document.getElementById("navStart"), document.getElementById("autoCompleteContainerNav"));
SearchProvider.registerSearchBox(document.getElementById("navDestination"), document.getElementById("autoCompleteContainerNav"));
SearchProvider.registerSearchBox(document.getElementById("searchBox"), document.getElementById("autoCompleteContainer"));
SearchProvider.registerSwapButton(document.getElementById("swapButton"), document.getElementById("navDestination"), document.getElementById("navStart"));

/*
const map : NavigationMap = {
    "A":{ connectedTo: ["D"], type: null, position: {x: 1, y: 1}},
    "B":{ connectedTo: ["C", "A"], type: null, position: {x: 20, y: 30}},
    "C":{ connectedTo: ["B", "D"], type: null, position: {x: 1, y: 1}},
    "D":{ connectedTo: ["A", "C"], type: null, position: {x: 20, y: 1}}
};

console.log(navigate("A", "C", map));
*/

/*
const pano = new Panorama(document.getElementById("pano"));
pano.loadScene("1", {fov: 0, pitch: 0, yaw: 2});
pano.pinElement(document.getElementById("red"), {fov: Math.PI / 200, pitch: 0, yaw: -0.15});
pano.showScene();
pano.lookTo({fov: 1, pitch: 0, yaw: -0.15}, 1000);
*/