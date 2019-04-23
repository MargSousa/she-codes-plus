let icon = document.querySelector("#current-weather");

let units = "metric";
let apiKey = "e4e4d6ef596a82924b1c141ba55e4e37";
let apiUrl = "https://api.openweathermap.org/data/2.5";

let buttonLocation = document.querySelector("#location-button");
let form = document.querySelector("#weather-form");

function getWeather(response){
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentTemperature = Math.round(response.data.main.temp);
  let currentWind = Math.round(response.data.wind.speed * 3.6);
  let currentDescription = response.data.weather[0].description;
  let currentHumidity = response.data.main.humidity;

  let currentIcon = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/w/${currentIcon}.png`;
  icon.setAttribute("src",iconUrl);
  icon.setAttribute("alt",currentDescription);

  let sunriseTime = response.data.sys.sunrise;
  let sunsetTime = response.data.sys.sunset;
  let nowTime = response.data.dt;

  let sunsetUnix = new Date(sunsetTime*1000);
  let sunsetHours = sunsetUnix.getHours();
  let sunsetMinutes = sunsetUnix.getMinutes();
  if (sunsetMinutes < 10) {
    return `0${sunsetMinutes}`;
  };

  let sunriseUnix = new Date(sunriseTime*1000);
  let sunriseHours= "0" + sunriseUnix.getHours();
  let sunriseMinutes = sunriseUnix.getMinutes();
  if (sunriseMinutes < 10) {
    return `0${sunriseMinutes}`;
  }

  let getNewTime = new Date(nowTime*1000);
  let currentHours = getNewTime.getHours();
  let currentMinutes = getNewTime.getMinutes();
  if (currentHours < 10) {
    currentHours = "0" + currentHours;
  };
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  };

  let currentSunrise = `${sunriseHours}:${sunriseMinutes}`;
  let currentSunset = `${sunsetHours}:${sunsetMinutes}`;
  let currentTime = `${currentHours}:${currentMinutes}`;

// Converter códigos dos paísesm, ex: PT em Portugal 
  document.querySelector("#current-country").innerHTML = `${currentCountry}`;
  document.querySelector("#current-city").innerHTML = `${currentCity}`;
  document.querySelector("#current-sunrise").innerHTML = `${currentSunrise}`;
  document.querySelector("#current-sunset").innerHTML = `${currentSunset}`;
  document.querySelector("#current-temperature").innerHTML = `${currentTemperature}°C`;
  document.querySelector("#current-description").innerHTML = `${currentDescription}`;
  document.querySelector("#current-humidity").innerHTML = `Humidity: ${currentHumidity}%`;
  document.querySelector("#current-wind").innerHTML = `Wind: ${currentWind} km/h`;
  document.querySelector("#current-time-location").innerHTML = `${currentTime}`;
};

let now = new Date();
console.log(now);

// Date-Search Function

function formatDate(date) {
  let monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
  let weekNow = weekDays[now.getDay()];
  let monthNow = monthNames[now.getMonth()];
  let dayNow = now.getDate();
  let yearNow = now.getFullYear();
  let hoursNow = now.getHours();
  let minutesNow = now.getMinutes();

  if (minutesNow < 10) {
    return `0${minutesNow}`;
  }

  if (hoursNow < 10) {
    periodTime = "AM";
    hoursNow = `0${hoursNow}`
  } else {
    periodTime = "PM";
  };

  let searchTime = `${weekNow} ${hoursNow}:${minutesNow} ${periodTime}`;

  let timeSearch = document.querySelector("#time-search")
  timeSearch.innerHTML = `${searchTime}`;
};

let nowDate = formatDate(now);

// Search functionality

function handleSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#weather-form-input");

  if (input.value.length > 0) {
    console.log(input.value);
    let apiParams = `q=${input.value}&appid=${apiKey}&units=${units}`;
    let apiPath = `weather?${apiParams}`;
    axios.get(`${apiUrl}/${apiPath}`).then(getWeather);
  } else {
    alert("Please enter a city");
  }
};

form.addEventListener("submit",handleSearch);

// Current Location 

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);

  let apiParams = `lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  let apiPath = `weather?${apiParams}`;

  axios.get(`${apiUrl}/${apiPath}`).then(getWeather);
}

function getCurrentPositionNow(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

buttonLocation.addEventListener("click",getCurrentPositionNow);
