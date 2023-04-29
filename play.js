let map;
const markerArray = []
const coords = { 
    lat: 39.68141109865876, 
    lng: -75.75283527374268
}

document.getElementById("image").src = "1.png";

function calcDistance(x1, x2, y1, y2){
    let distance = Math.pow(Math.pow((x2-x1) * 53, 2) + Math.pow((y2-y1) * 69, 2), .5)
    let miles = distance
    console.log(miles)
    displayPoints(calcPoints(miles))
}

function calcPoints(distance){
    if(distance > 15){
        return 0;
    } else if (distance < 1) {
        return 10;
    }
    return (10 - (distance * 0.66666666666))
}

function displayPoints(points){
    document.getElementById("points").innerHTML = "Points: " + points.toFixed(3)
}

document.getElementById("submit-button").addEventListener("click", function() {
    console.log("Run")
    if(markerArray[0] == null){
        return;
    }
    let guessedLat = markerArray[0].getPosition().lat();
    let guessedLng = markerArray[0].getPosition().lng();
    console.log(guessedLat.toFixed(20) + guessedLng.toFixed(20));

    calcDistance(coords.lat, guessedLat, coords.lng, guessedLng)
});

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    })

    if (markerArray.length > 0){
        markerArray[0].setMap(null)
        markerArray[0] = null
        markerArray.shift()
    }

    markerArray.push(marker)
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.9298, lng: -75.5277 },
    zoom: 8.6,
  });

  map.addListener("click", function (event) {
    console.log('sdflkjsdflkjsdflkj')
    placeMarker(event.latLng)

  });
}

initMap();