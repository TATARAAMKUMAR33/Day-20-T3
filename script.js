// Container Element Creation
let container = document.createElement("div");
container.className = "container";

// h1 Element Creation
let heading = document.createElement("h1");
heading.className = "mt-4 mb-4 title";
heading.id = "title";
heading.innerHTML = "Check Weather";

// Form Element Creation
let form = document.createElement("div");
form.className = "form-group";
form.innerHTML = `<label for="cityInput" class="form-group__label">Enter City:</label>
<input type="text" class="form-control" id="cityInput" placeholder="E.g., Chennai">`;

// Button Element Creation
let button = document.createElement("button");
button.id = "searchBtn";
button.className = "btn btn-primary";
button.setAttribute("onclick", "searchWeather()");
button.innerHTML = "Search";

// Card Element Creation
let card = document.createElement("div");
card.id = "weatherCard";
card.className = "card";
card.setAttribute("style", "display: none;");
card.innerHTML = `<div class="card-body">
<h5 class="card-title">Weather Details<span id="card-city-name"></span></h5>
<div id="weatherDetails"></div>
</div>`;

// Append all the Elements into document
container.append(heading, form, button, card);
document.body.append(container);

// =======================================================

// Weather API Key
const apiKey = "5dbbbdb19a15927fa1338b574ea61c22";

let cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const weatherDetails = document.getElementById("weatherDetails");

// Search and fetch data from API
let searchWeather = async () => {
  try {
    const city = cityInput.value.trim();
    if (city) {
      let apiData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      let data = await apiData.json();
      weatherDetails.innerHTML = `
            <p><strong>City:</strong> ${data.name}</p>
            <p><strong>Weather:</strong> ${data.weather[0].main}</p>
            <p><strong>Temperature:</strong> ${(
              data.main.temp - 273.15
            ).toFixed(2)} °C</p>
            <p><strong>Description:</strong> ${data.weather[0].description}</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} mph</p>`;

      // Show the weather card
      weatherCard.style.display = "block";
    }
  } catch (error) {
    alert("Please Enter valid city");
    console.log("Error fetching weather data:", error);
  }
};