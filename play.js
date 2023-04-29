let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 38.9298, lng: -75.5277 },
    zoom: 8.6,
  });
}

initMap();