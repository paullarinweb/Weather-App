var images = [
  "./images/day/cloudy.jpg",
  "./images/night/rainy.jpg",
  "./images/day/clear.jpg",
  "./images/night/clear.jpg",
  "./images/day/rainy.jpg",
  "./images/night/cloudy.jpg",
  "./images/day/snowy.jpg",
  "./images/night/snowy.jpg",
];

var currentImg = 0;
var nextImg = 1;
var imgElement = new Image();

function changeBackground() {
  document.body.style.background =
    "url(" + images[currentImg] + ") no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";

  // Preload the next image
  imgElement.src = images[nextImg];

  currentImg++;
  nextImg++;
  if (currentImg == images.length) {
    currentImg = 0;
    nextImg = 1;
  }
}

setInterval(changeBackground, 5000);

// weather app
// Add event listener for search button
document.getElementById("search-btn").addEventListener("click", async () => {
  // Get the city name from the input field
  let city = document.getElementById("city-input").value;

  // Fetch weather data from API
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d058ddc29a7179b3d84e0300ecf6d7ca`;
  const response = await fetch(api_url);
  const data = await response.json();

  // Get the current temperature in Kelvin
  let temperature_kelvin = data.main.temp;

  // convert the temperature from Kelvin to Celsius
  let temperature_celsius = temperature_kelvin - 273.15;

  // Get the current weather conditions
  let conditions = data.weather[0].description;

  // Get the city name and country code
  let city_name = data.name;
  let country_code = data.sys.country;

  // Update the HTML with the current weather data
  document.getElementById(
    "temperature"
  ).innerHTML = `Temperature: ${temperature_celsius.toFixed(2)}°C`;
  document.getElementById("conditions").innerHTML = `Conditions: ${conditions}`;
  document.getElementById(
    "city"
  ).innerHTML = `City: ${city_name}, ${country_code}`;
});

// Function to update the date and time
function updateTime() {
  let date = new Date();
  document.getElementById("date").innerHTML = `Date: ${date.toDateString()}`;
  document.getElementById(
    "time"
  ).innerHTML = `Local Time: ${date.toLocaleString()}`;
}

// Update the date and time every second
setInterval(updateTime, 1000);
