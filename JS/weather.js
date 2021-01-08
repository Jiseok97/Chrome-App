const COORDS = "coords";

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsOjb));
}

function handleGetSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // 객체에 변수의 이름과 객체의 key의 이름을 같게 하려면 아래처럼 작성
    latitude, // latitude: latitued,
    longitude, // longitued: longitude
  };
  saveCoords(coordsObj);
}

function handleGeoError() {}

function askForCoords() {
  // 위치 정보 읽기
  navigator.geolocation.getCurrentPosition(handleGetSucces, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCoords == null) {
    askForCoords();
  } else {
    // getWeather
  }
}

function init() {
  loadCoords();
}
init();
