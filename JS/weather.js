const weather = document.querySelector(".js-weather");

const API_KEY = "dd49b595ecca5f37b6724c5a28c4fd80";
const COORDS = "coords";

// JS의 특정 URL 호출 & handleGeoSucces에서 호출
function getWeather(lat, lng) {
  // fetch안에 가져올 데이터가 들어가면 됨!! 여기서 https:// 넣어주며, backtick(`) 사용!!
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    // 데이터가 우리한테 넘어 왔을 때, 시간이 걸리는 경우가 있다 & 기본적으로 함수를 호출하나 데이터가 완전히 들어온 다음 호출하기!
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      // console.log를 통해 json 안에 온도와 장소 요소 확인해서 가져옴!
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// localStorage에 좌표값이 없을 때에만 실행됨
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // 객체에 변수의 이름과 객체의 key의 이름을 같게 하려면 아래처럼 작성
    latitude, // latitude: latitued,
    longitude, // longitued: longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {}

function askForCoords() {
  // 위치 정보 읽기
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    // getWeather
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
