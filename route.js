'use strict';

import { updateWeather, error404 } from "./app.js";
const defaultLocation = "#/weather?lat=22.71237410645836&lon=88.47995631557455" // Barasat, India

const currentLocation = function () {
    window.navigator.geolocation.getCurrentPosition(res => {
        const { latitude, longitude } = res.coords;

        updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLocation;
    });
}

/**
 * 
 * @param {string} query searched query
 */

const searchedLocation = query => updateWeather(...query.split("&"));
// updateWeather("lat=22.71237410645836", "lon=88.47995631557455")

const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes ? requestURL.split("?") : [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function() {
    if (!this.window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
});