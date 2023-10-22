document.addEventListener('DOMContentLoaded', () => {
  const weatherDataContainer = document.getElementById('weather-data');
  const weatherForm = document.getElementById('weather-form');
  const cityInput = document.getElementById('city-input');

  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cityName = cityInput.value;

    fetch(`/weather?city=${cityName}`)
      .then((response) => response.json())
      .then((data) => {
        const weatherHtml = `
          <p>Temperature: ${data.temperature} K</p>
          <p>Description: ${data.description}</p>
          <p>Coordinates: Latitude ${data.coordinates.lat}, Longitude ${data.coordinates.lon}</p>
          <p>Feels Like Temperature: ${data.feels_like} K</p>
          <p>Humidity: ${data.humidity}%</p>
          <p>Pressure: ${data.pressure} hPa</p>
          <p>Wind Speed: ${data.wind_speed} m/s</p>
          <p>Country Code: ${data.country_code}</p>
          <p>Rain Volume (last 3 hours): ${data.rain_volume} mm</p>
        `;
        weatherDataContainer.innerHTML = weatherHtml;
      })
      .catch((error) => {
        weatherDataContainer.textContent = 'Failed to fetch weather data.';
        console.error(error);
      });
  });
});
