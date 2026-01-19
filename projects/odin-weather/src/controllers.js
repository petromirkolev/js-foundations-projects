import { els, state } from './state.js';
import { renderCurrentWeather } from './renderers.js';
import { showStatus } from './helpers.js';

// Controllers
async function getWeather() {
  const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${state.lat}&longitude=${state.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,surface_pressure,cloud_cover&daily=temperature_2m_max,temperature_2m_min&forecast_days=6&timezone=auto`;

  const response = await fetch(weatherApiUrl);
  if (!response.ok) {
    throw new Error('Cannot get forecast!');
  }

  const data = await response.json();

  state.elevation = data.elevation;
  state.currentWeather = data.current;
  state.currentWeatherUnits = data.current_units;
  state.dailyWeather = data.daily;
  state.dailyWeatherUnits = data.daily_units;

  renderCurrentWeather();
}

async function getUserLocation(location) {
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    location
  )}&count=10&language=en&format=json`;

  try {
    showStatus('Loading...');

    const res = await fetch(geocodeUrl);
    if (!res.ok) {
      throw new Error('Cannot get location!');
    }

    const data = await res.json();

    if (!Array.isArray(data.results) || data.results.length === 0) {
      throw new Error('Location not found');
    }

    state.lat = Number(data.results[0].latitude);
    state.lon = Number(data.results[0].longitude);
    state.city = data.results[0].name;
    els.updatedAt.textContent =
      'Updated at: ' + new Date().toLocaleTimeString();

    await getWeather();
    showStatus('');
  } catch (error) {
    console.error(error);
    showStatus('No results found.');
  }
}

export { getWeather, getUserLocation };
