///<reference path="../../node_modules/@types/jquery/index.d.ts"/>
import {NavSlider} from "./uiElements/navSlider";
import {SearchBar} from "./uiElements/searchBar";
import {Map2d} from "./uiElements/map2d";

$(function () {
    //Init uiElements
    NavSlider.init();
    SearchBar.init();
    Map2d.init();
});