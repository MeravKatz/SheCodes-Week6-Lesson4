let apiKey = "861aadcbcec3a81c62e577eccbc0bb70";
let city = "Austin";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showCityTemp);

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

function getForecast(coordinates) {
  let apiKey = "861aadcbcec3a81c62e577eccbc0bb70";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function formatDay(timestamp) {
  let date = newDate(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-4">
              <div class="forecast-day">${formatDate(
                new Date(forecastDay.dt)
              )}</div>
            </div>
            <div class="col-4">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" />
              <br />
            </div>
            <div class="col-4">
              <div class="forecast-temp">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}℃</span>
              /
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}℃</span>
              <br />
            </div>
            </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showCityTemp(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

searchCelsius("Austin");
