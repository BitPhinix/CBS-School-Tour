import {Navigator} from "./navigator";
import {NavigationMap} from "./navigator";
import {AutoComplete} from "./uiElements/autoComplete";
import {TextBoxSwapper} from "./uiElements/textBoxSwapper";
import {SlideOut} from "./uiElements/slideOut";

//Search-boxes
new AutoComplete(document.getElementById("autoCompleteContainerNav"), document.getElementById("navStart"), document.getElementById("navDestination"));
new AutoComplete(document.getElementById("autoCompleteContainer"), document.getElementById("searchBox"));

//Swap-Buttons
new TextBoxSwapper(<HTMLInputElement> document.getElementById("navStart"), <HTMLInputElement> document.getElementById("navDestination"), document.getElementById("swapButton"));

//Slide-Out
new SlideOut(document.getElementById("navSlider"), document.getElementById("navBarClose"), document.getElementById("navBarOpen"));

// ------------ Test stuff -------------
const map : NavigationMap = {
    "A":{ connectedTo: ["D"], type: null, position: {x: 1, y: 1}},
    "B":{ connectedTo: ["C", "A"], type: null, position: {x: 20, y: 30}},
    "C":{ connectedTo: ["B", "D"], type: null, position: {x: 1, y: 1}},
    "D":{ connectedTo: ["A", "C"], type: null, position: {x: 20, y: 1}}
};

const navigator = new Navigator(map);
console.log(navigator.navigate("A", "C"));

/*
const pano = new Panorama(document.getElementById("pano"));
pano.loadScene("1", {fov: 0, pitch: 0, yaw: 2});
pano.pinElement(document.getElementById("red"), {fov: Math.PI / 200, pitch: 0, yaw: -0.15});
pano.showScene();
pano.lookTo({fov: 1, pitch: 0, yaw: -0.15}, 1000);
*/