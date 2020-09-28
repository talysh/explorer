var googleAPI = "AIzaSyAM97bjZTktK2J_CFUnFfSZI1lEQKMtSHo";

var map;
var service;
var infowindow;


// Global search parameters
var latGlobal;
var lonGlobal;
var businessTypeGlobal;
var searchRadiusGlobal;
var zoomLevelGlobal;


// Update search parameters
function setSearchParameters(lat, lon, businessType, searchRadius, zoomLevel) {
    latGlobal = lat;
    lonGlobal = lon;
    businessTypeGlobal = businessType;
    searchRadiusGlobal = searchRadius;
    zoomLevelGlobal = zoomLevel;
}



var map;
var service;
var infowindow;

function initMap() {
    var searchedPlace = new google.maps.LatLng(latGlobal, lonGlobal);

    map = new google.maps.Map(document.getElementById('map'), {
        center: searchedPlace,
        zoom: zoomLevelGlobal
    });

    var request = {
        location: searchedPlace,
        radius: searchRadiusGlobal,
        type: [businessTypeGlobal],
        // fields: ["name", "formatted_address", "place_id", "geometry"],
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}



function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);

        }
    }
}

// Clear the search-list to get it ready for new list of locations
function clearWebsiteListDiv() {
    var searchList = $("#search-list");
    searchList.empty();
    searchList.append("<h5 class='info'>Information</h5>");
}

// Create individual markers for each business of the given type in a given city
function createMarker(place) {
    const request = {
        placeId: place.place_id,
        fields: ["name", "formatted_address", "place_id", "geometry", "rating", "icon", "website", "formatted_phone_number"],
    };
    // Get the requested details for given business
    service.getDetails(request, (markerPlace, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const marker = new google.maps.Marker({
                map,
                position: markerPlace.geometry.location
            });
            createWebsiteListElement(markerPlace);
            const infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, "click", function () {
                // console.log("marker place");
                // console.log(markerPlace);
                infowindow.setContent(
                    "<div class='info-field'><strong>" +
                    markerPlace.name +
                    "</strong>" +
                    "<img class='place-icon' src='" +
                    markerPlace.icon + "'>"
                    + "<br> <span class='rating'>Rating: </span><strong>" +
                    markerPlace.rating
                    + "</strong> <i class='far fa-star'></i><br><span class='address'>Address:</span> " +
                    markerPlace.formatted_address +
                    "</div>"
                );
                infowindow.open(map, this);

            });
        }
    });


}


// Create the list of businesses and set up links to their websites
function createWebsiteListElement(place) {
    // console.log("printing place ");
    // console.log(place);
    const placesList = document.getElementById("search-list");
    // console.log(placesList);

    placeWebsite = document.createElement("a");
    placeWebsite.textContent = place.name;
    placeWebsite.setAttribute('target', "_blank")
    placeWebsite.setAttribute('href', place.website);
    console.log(placeWebsite);

    photo = document.createElement("img");
    photo.classList.add("list-place-icon");
    photo.setAttribute("src", place.icon);
    photo.setAttribute("alt", place.name);

    phoneNumber = document.createElement("p");
    phoneNumber.classList.add("phone-number");
    phoneNumber.textContent = place.formatted_phone_number;

    searchListDiv = document.createElement("div");
    searchListDiv.setAttribute("class", "searchlist-item");
    searchListDiv.appendChild(placeWebsite);
    searchListDiv.appendChild(photo);
    searchListDiv.appendChild(phoneNumber);
    placesList.appendChild(searchListDiv);
    // console.log(placesList);

}



// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: -33.866, lng: 151.196 },
//         zoom: 15,
//     });
//     const request = {
//         placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
//         fields: ["name", "formatted_address", "place_id", "geometry"],
//     };
//     const infowindow = new google.maps.InfoWindow();
//     const service = new google.maps.places.PlacesService(map);
//     service.getDetails(request, (place, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             const marker = new google.maps.Marker({
//                 map,
//                 position: place.geometry.location,
//             });
//             google.maps.event.addListener(marker, "click", function () {
//                 infowindow.setContent(
//                     "<div><strong>" +
//                     place.name +
//                     "</strong><br>" +
//                     "Place ID: " +
//                     place.place_id +
//                     "<br>" +
//                     place.formatted_address +
//                     "</div>"
//                 );

//                 infowindow.open(map, this);
//             });
//         }
//     });
// }


// Search for restaurants in a given city
$("#restaurants").click(function () {
    businessTypeGlobal = "restaurant";
    redrawMap();

});


// Search for hotels in a given city
$("#hotels").click(function () {
    businessTypeGlobal = "hotel";
    redrawMap();

});

// Search for entertainment for given city
$("#entertainment").click(function () {
    businessTypeGlobal = "entertainment";
    redrawMap();

});

// Search for churches in a given city
$("#spiritualWelfare").click(function () {
    businessTypeGlobal = "church";
    redrawMap();

});

// Redraw map with the current values of search parameters.
function redrawMap() {
    clearWebsiteListDiv();
    setSearchParameters(latGlobal, lonGlobal, businessTypeGlobal, searchRadiusGlobal, zoomLevelGlobal);
    initMap();
}


$(document).ready(function () {

    var city = "";
    var APIKey = "";
    var currentWeatherUrl = "";
    var weatherUrl = "";
    searchClicker();
    var hiddenDiv = document.getElementById("#hidDiv");


    function searchClicker() {

        $("#submitBtn").on("click", function (event) {
            $("#hidDiv").css("display", "block");
            $("#recommendedActivities").css("display", "block");
            event.preventDefault();
            city = $("#searched-city").val().trim();
            APIcalls();
        })


        function APIcalls() {
            weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
            APIkey = "&appid=ea42a1210d1c0c2d7b6990d0d1323fe7";
            currentWeatherUrl = weatherUrl + city + APIkey;
            $("#cityName").text("Today's Weather in " + jsUcFirst(city));
            $.ajax({
                url: currentWeatherUrl,
                method: "GET",
            }).then(function (currentData) {
                console.log(currentData);
                console.log(currentData);
                var temp = Math.round(((currentData.main.temp - 273.15) * 9 / 5 + 32))
                console.log("The temperature in " + city + " is: " + temp);
                $("#todayTemp").text("Temperature: " + temp + String.fromCharCode(176) + "F");
                $("#todayHumidity").text("Humidity: " + currentData.main.humidity);
                $("#todayWindSpeed").text("Wind Speed: " + currentData.wind.speed);
                $("#todayImgSection").attr({
                    "src": "http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png",
                    "height": "100px", "width": "100px"
                });


                latGlobal = currentData.coord.lat;
                lonGlobal = currentData.coord.lon;
                redrawMap();

            })

        }
    }
    function jsUcFirst(string) {
        return string.charAt().toUpperCase() + string.slice(1);
    }
});


// Default search is for restaurants within 10km range of Boston
setSearchParameters(42.3601, -71.0589, "restaurant", '10000', 12);