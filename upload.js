var fileInput = document.getElementById("input")
const output = document.getElementById("input-wrapper")
var title = document.getElementById("text-title")
var description = document.getElementById("text-input")
var image = document.getElementById("image");
var latitude = document.getElementById("latitude")
var longitude = document.getElementById("longitude")
let imagesArray = []
var file;

document.getElementById("auto-location").onclick = function() { // Fill latitude and longitude textareas automatically
  
  navigator.geolocation.getCurrentPosition(success, error);

  function success(pos) {
    const crd = pos.coords;

    latitude.value = crd.latitude;
    longitude.value = crd.longitude;
  }

  function error() {
    document.getElementById("auto-location").textContent = "Location not supported"
  }

}

input.onchange = () => { // Handle file upload
    file = fileInput.files[0];
  console.log(file);
  image.src = URL.createObjectURL(file);

  const url = image.src;

  document.getElementById("upload-photo").style.visibility = "visible"
  
}

document.getElementById("upload-photo").onclick = function() { // Make POST request to Java webserver

  // Text POST request
  if (title.value != null && description.value != null && latitude.value != null && longitude.value != null){
  var nhr = new XMLHttpRequest();
  nhr.open('POST', 'http://localhost:8080/POST/', true);
  nhr.setRequestHeader('Content-Type', 'image/jpeg');

  nhr.onload = function() {
    if (nhr.status === 200) {
      console.log(nhr.responseText);
    } else {
      console.log('Request failed. Returned status of ' + nhr.status);
    }
  };

  var data = file;
  nhr.send(data);
  
  // File POST request
    var xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://localhost:8080/POST/', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log('Request failed. Returned status of ' + xhr.status);
    }
  };

  var data = `{ "name": "` + title.value +  `", "latitude": "` + latitude.value + `", "longitude": "` + longitude.value + `", "description": "` + description.value + `" }'`;
  console.log(JSON.stringify(data))
  xhr.send(data);
  }

  title = document.getElementById("text-title").value = "Image Title Here"
  description = document.getElementById("text-input").value = "Image Description Here"
  image = document.getElementById("image").src = ""
  latitude = document.getElementById("latitude").value = "Latitude Here"
  longitude = document.getElementById("longitude").value = "Longitude Here"

}
