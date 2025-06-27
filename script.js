const api_key = "769e40911d30325b75b717b8e94940ff";

function getWeather(event) {
  event.preventDefault();
  const city = document.getElementById("cityinput").value.trim();
  const errorDiv = document.getElementById("error");
  const card = document.getElementById("weatherCard");

  if (city === "") {
    errorDiv.textContent = "Please enter a city name.";
    card.classList.add("hidden");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then(data => {
      document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}`;
      document.getElementById("humidity").textContent = `${data.main.humidity}`;
      document.getElementById("wind").textContent = `${data.wind.speed}`;
      document.getElementById("feels_like").textContent = `${Math.round(data.main.feels_like)}`;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("icon").alt = data.weather[0].main;

      card.classList.remove("hidden");
      errorDiv.textContent = "";
    })
    .catch(error => {
      card.classList.add("hidden");
      errorDiv.textContent = "❌ " + error.message;
    });
}

document.getElementById("weather-form").addEventListener("submit", getWeather);