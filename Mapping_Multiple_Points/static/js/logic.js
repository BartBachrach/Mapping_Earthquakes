// Add console.log to check to see if our code is working
console.log("working");

// Create the map object with a center and a zoom level
let map = L.map("mapid").setView([34.0522, -118.2437], 4); // the 4 outside the lat/lon array is the zoom level on a scale of 0-18
// setting the map object (L.map()), referencing "#mapid" in the html file, to the variable "map"
// setView establishes the default center of our map, which takes in the arguments for where (lat/lon array) and how much zoom (4/18 in this case)

// an alternative is using curly brace notation, which is useful when the map starts to include many layers
// let map = L.map("mapid", {
//     center: [40.7, -94.5
//     ],
//     zoom: 4
// });

// add a marker to the map for Los Angeles, CA
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// L.circle([34.0522, -118.2437], {
    
//     color: "black",

//     fillColor: "blue",
 
//     radius: 300
// }).addTo(map);

let cityData = cities;

// next we'll iterate through the cities array of objects and add markers at those locations
cityData.forEach(function(city){
    console.log(city)
    L.circleMarker(city.location, {
        stroke: true,
        lineWeight: 4,
        color: "#FFA500",
        radius: city.population/100000,
        fillColor: "#FFA500"

        
    })
        .bindPopup("<h2>" + city.city + "," + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});

// add tile layer to our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, // sets the maximum zoom level
    accessToken: API_KEY // adds our API key to the access token
});
// then we'll add our 'graymap' tile layer to the map
streets.addTo(map); // this will add the graymap object tile layer to our variable "map"

