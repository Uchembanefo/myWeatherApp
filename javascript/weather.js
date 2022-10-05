function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function wednesday(wednesdayDate) {
  let date = new Date(wednesdayDate * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let wed = document.querySelector(".wed");
  wed.innerHTML = `${day}`;
}
function thursday(thursdayDate) {
  let date = new Date(thursdayDate * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let thu = document.querySelector(".thu");
  thu.innerHTML = `${day}`;
}
function friday(fridayDate) {
  let date = new Date(fridayDate * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let fri = document.querySelector(".fri");
  fri.innerHTML = `${day}`;
}
function saturday(saturdayDate) {
  let date = new Date(saturdayDate * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let sat = document.querySelector(".sat");
  sat.innerHTML = `${day}`;
}
function sunday(sundayDate) {
  let date = new Date(sundayDate * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let sun = document.querySelector(".sun");
  sun.innerHTML = `${day}`;
}

function getCityForecast(forecast) {
  console.log(forecast);
  let weekday = forecast.data.list;
  let wed = document.querySelector(".wed");
  wed.innerHTML = weekday[0].dt;
  let thu = document.querySelector(".thu");
  thu.innerHTML = weekday[8].dt;
  let fri = document.querySelector(".fri");
  fri.innerHTML = weekday[16].dt;
  let sat = document.querySelector(".sat");
  sat.innerHTML = weekday[24].dt;
  let sun = document.querySelector(".sun");
  sun.innerHTML = weekday[32].dt;
  let wedWeather = document.querySelector(".wedImage");
  wedWeather.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${weekday[0].weather[0].icon}.png`
  );
  let thuWeather = document.querySelector(".thuImage");
  thuWeather.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${weekday[8].weather[0].icon}.png`
  );
  let friWeather = document.querySelector(".friImage");
  friWeather.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${weekday[16].weather[0].icon}.png`
  );
  let satWeather = document.querySelector(".satImage");
  satWeather.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${weekday[24].weather[0].icon}.png`
  );
  let sunWeather = document.querySelector(".sunImage");
  sunWeather.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${weekday[32].weather[0].icon}.png`
  );
  let wedTemp = document.querySelector(".wedTemp");
  wedTemp.innerHTML = `${Math.round(weekday[0].main.temp)}`;
  let thuTemp = document.querySelector(".thuTemp");
  thuTemp.innerHTML = `${Math.round(weekday[8].main.temp)}`;
  let friTemp = document.querySelector(".friTemp");
  fri.innerHTML = `${Math.round(weekday[16].main.temp)}`;
  let satTemp = document.querySelector(".satTemp");
  satTemp.innerHTML = `${Math.round(weekday[24].main.temp)}`;
  let sunTemp = document.querySelector(".sunTemp");
  sunTemp.innerHTML = `${Math.round(weekday[32].main.temp)}`;
  wednesday(weekday[0].dt);
  thursday(weekday[8].dt);
  friday(weekday[16].dt);
  saturday(weekday[24].dt);
  sunday(weekday[32].dt);
}

function getCoordinates(response) {
  latitude = response.lat;
  longitude = response.lon;
  let searchBox = document.querySelector(".typeCity");
  let apiKey = "d78001c6c3e7c07e3d86ba3edcf8ba73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchBox.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCityForecast);
}
function getCityWeather(result) {
  console.log(result);
  celsiusTemp = `${Math.round(result.data.main.temp)}`;
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${Math.round(result.data.main.temp)}`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(result.data.main.humidity)}%`;
  let wind = document.querySelector(".degWind");
  wind.innerHTML = `${Math.round(result.data.wind.speed)}mph`;
  let weatherDescription = document.querySelector(".cloudy");
  weatherDescription.innerHTML = result.data.weather[0].description;
  let bangor = document.querySelector(".bangor");
  bangor.innerHTML = result.data.name;
  let country = document.querySelector(".uk");
  country.innerHTML = result.data.sys.country;
  let weatherIcon = document.querySelector(".weatherImage");
  weatherIcon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${result.data.weather[0].icon}.png`
  );
  getCoordinates(result.data.coord);
  let currentDate = document.querySelector(".currentDate");
  currentDate.innerHTML = formatDate(result.data.dt * 1000);
}

function enterCity(Event) {
  Event.preventDefault();

  let searchBox = document.querySelector(".typeCity");
  let bangor = document.querySelector(".bangor");
  bangor.innerHTML = searchBox.value;
  let apiKey = "d78001c6c3e7c07e3d86ba3edcf8ba73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${bangor.innerHTML}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCityWeather);
}

function presentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d78001c6c3e7c07e3d86ba3edcf8ba73";
  let apiUrlFirst = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlFirst).then(getCityWeather);
  let apiUrlSecond = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlSecond).then(getCityForecast);
}
function currentWeather(Event) {
  Event.preventDefault();
  navigator.geolocation.getCurrentPosition(presentPosition);
}

function changeToFahreinheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  let fahreinheit = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = `${Math.round(fahreinheit)}`;

  degreeFahreinheit.classList.add("active");
  degreeCelsius.classList.remove("active");
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${celsiusTemp}`;
  degreeCelsius.classList.add("active");
  degreeFahreinheit.classList.remove("active");
}

let form = document.querySelector(".cities");
form.addEventListener("submit", enterCity);
let currentCity = document.querySelector(".city");
currentCity.addEventListener("click", currentWeather);
let celsiusTemp = null;
let degreeFahreinheit = document.querySelector("#fahreinheit");
degreeFahreinheit.addEventListener("click", changeToFahreinheit);

let degreeCelsius = document.querySelector("#celsius");
degreeCelsius.addEventListener("click", changeToCelsius);
