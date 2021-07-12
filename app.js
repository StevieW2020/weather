let now = new Date();
let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let year = now.getFullYear();
h3.innerHTML = `${day} , ${month} ${date}, ${hour}:${minute} / ${year}`;

function showTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = `${response.data.name}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searching(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#change-city");
  let apiKey = "f45e557c26b84f8d37509b2f9860a5f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searching);

function changeCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
}
let farrenheitLink = document.querySelector("#fahrenheit-link");
farrenheitLink.addEventListener("click", changeFahrenheit);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f45e557c26b84f8d37509b2f9860a5f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

