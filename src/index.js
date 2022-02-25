let now = new Date();

function formatDate(currentDate) {
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  let fullDate = `${day}, ${month} ${date}, ${year}`;
  return fullDate;
}
let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = formatDate(now);

function formatTime(currentTime) {
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let suffix = hour >= 12 ? "PM" : "AM";
  let options = { timeZone: "EST", timeZoneName: "short" };
  let timeZone = currentTime.toLocaleTimeString("en-US", options);
  hour = hour % 12;
  hour = hour ? hour : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let fullTime = `last updated: ${timeZone}`;
  return fullTime;
}

let updatedTime = document.querySelector("#last-update-time");
updatedTime.innerHTML = formatTime(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let month = now.getMonth();
let date = now.getDate();

let nextDay = document.querySelector("#tomorrow");
nextDay.innerHTML = `${days[now.getDay() + 1]} ${now.getMonth() + 1}/${
  now.getDate() + 1
}`;

let secondDay = document.querySelector("#second-day");
secondDay.innerHTML = `${days[now.getDay() + 2]} ${now.getMonth() + 1}/${
  now.getDate() + 2
}`;

let thirdDay = document.querySelector("#third-day");
thirdDay.innerHTML = `${days[now.getDay() + 3]} ${now.getMonth() + 1}/${
  now.getDate() + 3
}`;

let fourthDay = document.querySelector("#fourth-day");
fourthDay.innerHTML = `${days[now.getDay() - 3]} ${now.getMonth() + 1}/${
  now.getDate() + 4
}`;

let fifthDay = document.querySelector("#fifth-day");
fifthDay.innerHTML = `${days[now.getDay() - 2]} ${now.getMonth() + 1}/${
  now.getDate() + 5
}`;

function showTemperature(response) {
  console.log(response);
  let currentTemp = Math.round(response.data.main.temp);
  let todayTempNumber = document.querySelector("#today-temp-number");
  todayTempNumber.innerHTML = `${currentTemp}°C`;

  let currentFeelsLike = Math.round(response.data.main.feels_like);
  let todayFeelsLike = document.querySelector("#today-feels-like");
  todayFeelsLike.innerHTML = `Feels like ${currentFeelsLike}°C`;
}

function showLocation(response) {
  console.log(response.data.name);
  let currentLocationName = response.data.name;
  let forecastCity = document.querySelector("#current-forecast");
  forecastCity.innerHTML = `Current forecast for: ${currentLocationName}`;
}

function showWeatherIcon(response) {
  console.log(response.data.weather[0].main);
  let currentWeatherIcon = response.data.weather[0].main;
  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.innerHTML = `${currentWeatherIcon}`;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-text-input");

  let currentForecast = document.querySelector("#current-forecast");
  if (cityInput.value) {
    currentForecast.innerHTML = `Current forecast for: ${cityInput.value}`;
  } else {
    currentForecast.innerHTML = `No city selected`;
    alert("Please choose a city");
  }
  let apiKey = "e4386934c81dcc4d977985af91d7aadd";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showWeatherIcon);
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", search);

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "e4386934c81dcc4d977985af91d7aadd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showLocation);
  axios.get(apiUrl).then(showWeatherIcon);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentPosition);

function fahrTemp(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#today-temp-number");
  changeTemp.innerHTML = "17°F";
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrTemp);

function celsiusTemp(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#today-temp-number");
  changeTemp.innerHTML = "-10°C";
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusTemp);
