// Add console.log to check to see if our code is working
console.log("working");

// Create the map object with a center and a zoom level
let map = L.map("mapid").setView([40.7, -94.5], 4); // the 4 outside the lat/lon array is the zoom level on a scale of 0-18
// setting the map object (L.map()), referencing "#mapid" in the html file, to the variable "map"
// setView establishes the default center of our map, which takes in the arguments for where (lat/lon array) and how much zoom (4/18 in this case)

// an alternative is using curly brace notation, which is useful when the map starts to include many layers
// let map = L.map("mapid", {
//     center: [40.7, -94.5
//     ],
//     zoom: 4
// });

// add tile layer to our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, // sets the maximum zoom level
    accessToken: API_KEY // adds our API key to the access token
});
// then we'll add our 'graymap' tile layer to the map
streets.addTo(map); // this will add the graymap object tile layer to our variable "map"

