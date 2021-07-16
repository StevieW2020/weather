function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
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
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day} , ${month}, ${hours}:${minutes} / ${year}`;
}

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}
function displayOvercast(response) {
  let overcast = response.data.daily;

  let overcastElement = document.querySelector("#overcast");

  let overcastHTML = `<div class="row">`;

  overcast.forEach(function (overcastDay, index) {
    if (index < 6) {
      overcastHTML =
        overcastHTML +
        `
       <div class="col">
        <div class="weather-overcast-date">${formateDay(overcastDay.dt)}</div>
        <img
         src="http://openweathermap.org/img/wn/${
           overcastDay.weather[0].icon
         }@2x.png"
         alt=""
         width="50"
        />
        <div class="weather-overcast-temperature">
         <span class="weather-overcast-temperature-max"> ${Math.round(
           overcastDay.temp.max
         )}° </span>
         /
         <span class="weather-overcast-temperature-min"> ${Math.round(
           overcastDay.temp.min
         )}° </span>
        </div>
       </div>
      `;
    }
  });

  overcastHTML = overcastHTML + `</div>`;
  overcastElement.innerHTML = overcastHTML;
}

function getOvercast(coordinates) {
  let apiKey = "f45e557c26b84f8d37509b2f9860a5f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayOvercast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getOvercast(response.data.coord);
}

function search(city) {
  let apiKey = "f45e557c26b84f8d37509b2f9860a5f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
}

function changeCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farrenheitLink = document.querySelector("#fahrenheit-link");
farrenheitLink.addEventListener("click", changeFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeCelsius);

search("St John's");
