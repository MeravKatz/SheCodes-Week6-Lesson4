let currentTime = new Date();

let time = document.querySelector(".time");

function formatDate(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];

  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

time.innerHTML = formatDate(currentTime);

function searchCelsius(city) {
  let apiKey = "861aadcbcec3a81c62e577eccbc0bb70";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemp);
}

function showCityTemp(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCelsius(city);
}

let cityForm = document.querySelector("#city-search");
cityForm.addEventListener("submit", handleSubmit);

function findCity(position) {
  let apiKey = "861aadcbcec3a81c62e577eccbc0bb70";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemp);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(findCity);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCityTemp);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

searchCelsius("Austin");
let celsiusTemp = 0;
