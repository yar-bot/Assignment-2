const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const apiKey = '3d4370ca2bef0077c0a2848354af1bd7';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/weather', async (req, res) => {
  try {
    const cityName = req.query.city;
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    const weatherData = {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      coordinates: data.coord,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      country_code: data.sys.country,
    };

    // Check for rain data availability
    if (data.rain) {
      weatherData.rain_volume = data.rain['3h'];
    } else {
      weatherData.rain_volume = 0;
    }

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Обработка корневого маршрута
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname)); // Для обслуживания файлов в текущем каталоге

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
