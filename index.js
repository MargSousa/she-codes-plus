function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

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
  } else {
    periodTime = "PM";
  }
  
  console.log(weekNow);
  console.log(monthNow);
  console.log(yearNow);
  console.log(dayNow);
  console.log(periodTime);

  let searchTime = `${weekNow} ${hoursNow}:${minutesNow} ${periodTime}`;
  console.log(searchTime);

  let time1 = document.querySelector(".time-search")
  time1.innerHTML = `${searchTime}`;
}

let nowDate = formatDate(now);

