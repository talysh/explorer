var googleAPI = "AIzaSyAM97bjZTktK2J_CFUnFfSZI1lEQKMtSHo";

var map;
var service;
var infowindow;

var latGlobal;
var lonGlobal;
var businessTypeGlobal;
var searchRadiusGlobal;
var zoomLevelGlobal;


function setSearchParameters(lat, lon, businessType, searchRadius, zoomLevel) {
    latGlobal = lat;
    lonGlobal = lon;
    businessTypeGlobal = businessType;
    searchRadiusGlobal = searchRadius;
    zoomLevelGlobal = zoomLevel;
}

setSearchParameters(42.3601, -71.0589, "bar", '10000', 15);

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


function createMarker(place) {
    const request = {
        placeId: place.place_id,
        fields: ["name", "formatted_address", "place_id", "geometry", "rating", "icon", "website", "formatted_phone_number"],
    };
    service.getDetails(request, (markerPlace, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const marker = new google.maps.Marker({
                map,
                position: markerPlace.geometry.location
            });
            createWebsiteListElement(markerPlace);
            const infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, "click", function () {
                console.log("marker place");
                console.log(markerPlace);
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

function createWebsiteListElement(place) {
    console.log("printing place ");
    console.log(place);
    const placesList = document.getElementById("search-list");
    console.log(placesList);

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
    console.log(placesList);

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