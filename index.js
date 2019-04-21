function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);

  let units = "metric";
  let apiKey = "e4e4d6ef596a82924b1c141ba55e4e37";
  let apiUrl = "https://api.openweathermap.org/data/2.5";
  let apiParams = `lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  let apiPath = `weather?${apiParams}`;

  axios.get(`${apiUrl}/${apiPath}`).then(function(response){
    let currentCity = response.data.name;
    let currentCountry = response.data.sys.country;
    let currentTemperature = Math.round(response.data.main.temp);
    let currentWind = Math.round(response.data.wind.speed * 3.6);
    let currentDescription = response.data.weather[0].description;
    let currentHumidity = response.data.main.humidity;

    let sunriseTime = response.data.sys.sunrise;
    let sunsetTime = response.data.sys.sunset;

    let sunsetUnix = new Date(sunsetTime*1000);
    let sunsetHours= sunsetUnix.getHours();
    let sunsetMinutes = sunsetUnix.getMinutes();
    if (sunsetMinutes < 10) {
      return `0${sunsetMinutes}`;
    } 

    let sunriseUnix = new Date(sunriseTime*1000);
    let sunriseHours= "0" + sunriseUnix.getHours();
    let sunriseMinutes = sunriseUnix.getMinutes();
    if (sunriseMinutes < 10) {
      return `0${sunriseMinutes}`;
    }

    let currentSunrise = `${sunriseHours}:${sunriseMinutes}`;
    let currentSunset = `${sunsetHours}:${sunsetMinutes}`;
    
// Converter PT em Portugal 
    
    document.querySelector(".current-city").innerHTML = `${currentCity}`;
    document.querySelector(".current-temperature").innerHTML = `${currentTemperature}&#176;</span>C`;
    document.querySelector(".current-description").innerHTML = `${currentDescription}`;
    document.querySelector(".current-humidity").innerHTML = `Humidity: ${currentHumidity}%`;
    document.querySelector(".current-wind").innerHTML = `Wind: ${currentWind} km/h`;
    document.querySelector(".current-country").innerHTML = `${currentCountry}`;
    document.querySelector(".current-sunrise").innerHTML = `${currentSunrise}`;
    document.querySelector(".current-sunset").innerHTML = `${currentSunset}`;
  });
};

navigator.geolocation.getCurrentPosition(handlePosition);

let now = new Date();
console.log(now);

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

  let timeSearch = document.querySelector(".time-search")
  timeSearch.innerHTML = `${searchTime}`;

  let timeCurrentLocation = document.querySelector(".current-time-location");
  timeCurrentLocation.innerHTML = `${hoursNow}:${minutesNow}`;

}

let nowDate = formatDate(now);
