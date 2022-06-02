// Add console.log to check to see if our code is working
console.log("working");

// Create the map object with a center and a zoom level
 
// the 4 outside the lat/lon array is the zoom level on a scale of 0-18
// setting the map object (L.map()), referencing "#mapid" in the html file, to the variable "map"
// setView establishes the default center of our map, which takes in the arguments for where (lat/lon array) and how much zoom (4/18 in this case)
//

// add GeoJSON data
// let sanFranAirport = 
// {"type": "FeatureCollection", "features" :[{
//     "type" : "Feature",
//     "properties" :{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "al":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375, 37.61899948120117]
//         }
//     }
// ]};

// L.geoJSON(sanFranAirport, {
//     // we turn each feature into a marker on the map
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng).bindPopup("<h2>" + feature.properties.city + "</h2>" + "<h3>" + feature.properties.country + "</h3>" + "<hr>" +
//         "<h3>" + feature.properties.name + "</h3>");
//     }
        
// }).addTo(map);

// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h2>" + "Airport Name: " + feature.properties.name + "</h2>" + "<hr>" + "<h3>" + "Airport Code: " + feature.properties.faa + "</h3>");
//     }
// }).addTo(map);

//let line = [
//     [33.9416, -118.4085],
//     [37.6213, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
// ];

// let line = [
//     [37.6213, -122.3790],
//     [30.1975, -97.6664],
//     [43.6777, -79.6248],
//     [40.6413, -73.7781]
// ];


// Create a polyline using the line coordinates and make the line red
// L.polyline(line, {
//     color: "blue",
//     opacity: 0.5,
// }).addTo(map);

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

// cityData = cities;

// next we'll iterate through the cities array of objects and add markers at those locations
// cityData.forEach(function(city){
//     console.log(city)
//     L.circleMarker(city.location, {
//         stroke: true,
//         lineWeight: 4,
//         color: "#FFA500",
//         radius: city.population/100000,
//         fillColor: "#FFA500"

        
//     })
//         .bindPopup("<h2>" + city.city + "," + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// });

// add tile layer to our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, // sets the maximum zoom level
    accessToken: API_KEY // adds our API key to the access token
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
    "Streets": streets, // we're storing the the two different map options in a variable to access later
    "Satellite Streets": satelliteStreets
};

let map = L.map("mapid", {
    center: [44.0, -80.0],
    zoom: 11,
    layers: [streets]
});

// pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map); // here we've called the the baseMaps variable and added it to our map

let torontoHoods = "https://raw.githubusercontent.com/BartBachrach/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// accessing the airport geoJSON URL
// let airportData = "https://raw.githubusercontent.com/BartBachrach/Mapping_Earthquakes/main/majorAirports.json";

// let torontoData = "https://raw.githubusercontent.com/BartBachrach/Mapping_Earthquakes/main/torontoRoutes.json";

// create style for the lines
let myStyle = {
    color: "blue",
    fillColor: "yellow",
    weight: 1
}

// grabbing geoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // creating a geoJSON layer with the retrieved data
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
        }
    }).addTo(map);
});

// then we'll add our 'graymap' tile layer to the map
streets.addTo(map); // this will add the graymap object tile layer to our variable "map"

// onEachFeature: function(feature, layer) {
//     layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: "
//     + feature.properties.dst + "</h3>");
// the above code is how to add info to a popup from an external JSON file