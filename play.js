let map;
const markerArray = []
var coords = { 
    lat: 39.68141109865876, 
    lng: -75.75283527374268
}
var lat;
var lng;
var description;
var title;
var base64;
let roundCount = 1;
let totalPoints = 0;
let roundPoints = 0;
var id = 0;
const answerMarkers = []
var ids = [ , , ]
var photos;

getPhotos();

function checkIn(j){
    for (let i = 0; i < 3; i++){
        if(ids[i] == j){
            return true;
        }
    }
    return false;
}

function populateIds() {
    for (let i = 0; i < 3; i++){
        while(true){
            let j = Math.floor(Math.random() * photos)
            if(checkIn(j)){
                continue;
            }
            ids[i] = j
            break;
        }
    }
    console.log(ids)
}

function getPhotos() {
    var Http = new XMLHttpRequest();
    var url='http://localhost:8080/'

    fetch(url)
    .then(data=>{return data.json()})
    .then(res=>{
        photos = res;
        populateIds();
        getInfo()
    })
}


function getInfo() {
    let id = ids[roundCount-1].toString()
    var Http = new XMLHttpRequest();
    var url='http://localhost:8080/GET/'+id+'/json';

    fetch(url)
    .then(data=>{return data.json()})
    .then(res=>{
        console.log(res)
        lat = parseFloat(res.latitude);
        lng = parseFloat(res.longitude);
        description = res.description;
        title = res.name;
        console.log(lat + "" + lng)

        coords.lat = lat;
        coords.lng = lng;
    })

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/GET/"+id+"/image", true);
    xhr.responseType = "blob";
    xhr.onload = function() {
    let img = document.getElementById("image")
    img.src = URL.createObjectURL(xhr.response);
    };
    xhr.send();
}



document.getElementById("next-round-button").addEventListener("click", function() {
    document.getElementById("round-count").innerHTML = "Round " + roundCount + "/3"
    document.getElementById("next-round-button").style.visibility = "hidden"
    document.getElementById("submit-button").style.visibility = "visible"
    markerArray[0].setMap(null)
    markerArray[0] = null
    markerArray.shift()

    document.getElementById("points").innerHTML = "Points: " + totalPoints.toFixed(2);

    answerMarkers[0].setMap(null)
    answerMarkers[0] = null

    answerMarkers.shift()
    document.getElementById("description-title").innerHTML = "";
    document.getElementById("description-description").innerHTML = "";

    id = id + 1;
    getInfo()
})

function endScreen() {

    let finalscore = document.getElementById("final-score")
    finalscore.style.visibility = "visible"
    finalscore.innerHTML = "Final Score: " + totalPoints.toFixed(2) + " / 30.00"

    document.getElementById("points").innerHTML = "Points: " + totalPoints.toFixed(2) + " + " + roundPoints.toFixed(2);
    document.getElementById("submit-button").style.visibility = "hidden";
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
        document.getElementById("submit-button").style.visibility = "hidden";
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
        return;
    } else if (distance < 1) {
        roundPoints = 10;
        return;
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

    map.setCenter(answer.getPosition());

    answerMarkers.push(answer)


    document.getElementById("description-title").innerHTML = title;
    document.getElementById("description-description").innerHTML = description;

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