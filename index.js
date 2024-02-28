function refreshWeather (response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector ("#icon");
cityElement.innerHTML = response.data.city;
timeElement.innerHTML = formatDate(date);
iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}"/>`;
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
speedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    displayForecast(response.data.city);
}
function formatDate(date){
let minutes = date.getMinutes();
let hours = date.getHours();
let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
if (minutes < 10) {
    minutes = `0${minutes}`;
}
if (hours < 10){
    hours = `0${hours}`;
}
return `${day} ${hours}:${minutes}`
}

function searchCity (city){
    let apiKey ="4b5at78o546f39c2e18ee9634f6ba403";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);
}



function handleSearchSubmit (event){
event.preventDefault();
let searchInput = document.querySelector("#search-form-input");

searchCity(searchInput.value);
}

function getForecast (city){
    let apiKey = "4b5at78o546f39c2e18ee9634f6ba403";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}
function displayForecast(response){

let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
let forecastHtml = "";
days.forEach (function (day) {
forecastHtml = forecastHtml + `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day} </div> <div class="weather-forecast-icon">
<img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png" alt="" width="32px"></div>
  <div class="weather-forecast-temperature"><span class="weather-forecast-temperature-max"><strong>18&deg;</strong></span> <span class="weather-forecast-temperature-min">12&deg;</span></div> 
</div>
`;
});
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener ("submit", handleSearchSubmit);
searchCity("Paris");
getForecast("Paris");






