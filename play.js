let map;
const markerArray = []
const coords = { 
    lat: 39.68141109865876, 
    lng: -75.75283527374268
}
let roundCount = 1;
let totalPoints = 0;
let roundPoints = 0;

const answerMarkers = []

document.getElementById("image").src = "1.png";

document.getElementById("next-round-button").addEventListener("click", function() {
    document.getElementById("round-count").innerHTML = "Round " + roundCount + "/3"
    document.getElementById("next-round-button").style.visibility = "hidden"
    markerArray[0].setMap(null)
    markerArray[0] = null
    markerArray.shift()

    document.getElementById("points").innerHTML = "Points: " + totalPoints.toFixed(2);

    answerMarkers[0].setMap(null)
    answerMarkers[0] = null

    answerMarkers.shift()
})

function endScreen() {
    totalPoints = totalPoints + roundPoints

    let finalscore = document.getElementById("final-score")
    finalscore.style.visibility = "visible"
    finalscore.innerHTML = "Final Score: " + totalPoints.toFixed(2)

    document.getElementById("points").innerHTML = "Points: " + totalPoints.toFixed(2)

}

function nextRound(){
    roundCount = roundCount + 1;
    if (roundCount > 3){
        endScreen()
    } else if (roundCount <= 3){
        console.log("sd")
        document.getElementById("next-round-button").style.visibility = "visible"
        document.getElementById("points").innerHTML = "Points: " + totalPoints.toFixed(2) + " + " + roundPoints.toFixed(2);
        totalPoints = totalPoints + roundPoints
        roundPoints = 0
    }
}

function calcDistance(x1, x2, y1, y2){
    let distance = Math.pow(Math.pow((x2-x1) * 53, 2) + Math.pow((y2-y1) * 69, 2), .5)
    let miles = distance
    console.log(miles)
    calcPoints(miles)
}

function calcPoints(distance){
    if(distance > 15){
        roundPoints = 0;
    } else if (distance < 1) {
        roundPoints = 10;
    }
    roundPoints = 10 - (distance * 0.66666666666)
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

    var answer = new google.maps.Marker({
        position: coords,
        map: map,
        icon: "beachflag.png"
    })

    answerMarkers.push(answer)

    nextRound()
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