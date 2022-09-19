function getCityWeather(result) {
  console.log(result);
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${Math.round(result.data.main.temp)}°C`;
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
}

function enterCity(Event) {
  Event.preventDefault();
  let now = new Date();
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
  let currentDate = document.querySelector(".currentDate");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10 && minutes < 10) {
    hours = `0${hours}`;
    minutes = `0${minutes}`;
  }
  currentDate.innerHTML = day + " " + hours + ":" + minutes;
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
  let now = new Date();
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
  let currentDate = document.querySelector(".currentDate");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10 && minutes < 10) {
    hours = `0${hours}`;
    minutes = `0${minutes}`;
  }
  currentDate.innerHTML = day + " " + hours + ":" + minutes;
  navigator.geolocation.getCurrentPosition(presentPosition);
}

let form = document.querySelector(".cities");
form.addEventListener("submit", enterCity);
let currentCity = document.querySelector(".city");
currentCity.addEventListener("click", currentWeather);