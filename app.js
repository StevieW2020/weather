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
let minute = now.getMinutes();
let year = now.getFullYear();
h3.innerHTML = `${day} , ${month} ${date}, ${hour}:${minute} / ${year}`;

function showTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${response.data.name}`;
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
  temperature.innerHTML = `18`;
}
let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  let fahrenheit = 53;
  temperature.innerHTML = `${fahrenheit}`;
}
let farrenheitTemp = document.querySelector("#fahrenheit-link");
farrenheitTemp.addEventListener("click", changeFahrenheit);

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
