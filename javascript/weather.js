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

  return `${day} ${hours}:${minutes}`;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCityWeather);
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
