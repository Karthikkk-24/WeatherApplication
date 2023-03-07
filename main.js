const apiKey = "enter_your_api_key_here";

const locationInput = document.querySelector(".location input");
const resultsContainer = document.querySelector(".weather_card .results");
const noResultsContainer = document.querySelector(".weather_card .no_results");

const fetchWeatherData = async (location) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    return data;
};




const renderWeatherData = (data) => {
    const { name, main, weather } = data;
    let weatherCondition;
    if (weather[0].main == 'Clouds') {
        weatherCondition = 'images/clouds.png';
    } else if (weather[0].main == 'Clear') {
        weatherCondition = 'images/sun.png';
    } else {
        weatherCondition = 'images/sun.png';
    }
    const weatherCard = `
    <div class="weather_card_container">
      <h2>${name}</h2>
      <img class="weather_img" src="${weatherCondition}" />
      <p>Temperature: ${main.temp}°C</p>
      <p>Feels like: ${main.feels_like}°C</p>
      <p>Humidity: ${main.humidity}%</p>
    </div>
  `;
    resultsContainer.innerHTML = weatherCard;
    noResultsContainer.style.display = "none";
};

const handleWeatherDataFetchError = () => {
    noResultsContainer.style.display = "flex";
    resultsContainer.innerHTML = "";
};

locationInput.addEventListener("keyup", async (event) => {
    if (event.keyCode === 13) {
        const location = event.target.value;
        try {
            const data = await fetchWeatherData(location);
            renderWeatherData(data);
        } catch (error) {
            handleWeatherDataFetchError();
        }
    }
});
