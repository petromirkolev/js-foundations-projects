// State object
const state = {
  lat: 0,
  lon: 0,
  city: undefined,
  elevation: 0,
  currentWeather: undefined,
  currentWeatherUnits: undefined,
  dailyWeather: undefined,
  dailyWeatherUnits: undefined,
  metricUnits: 'imperial',
};

// Global variables
const els = {
  searchButton: document.querySelector('[data-action="search"]'),
  city: document.querySelector('[data-input="location"]'),
  currentLocation: document.querySelector('[data-view="current-location"]'),
  currentTemp: document.querySelector('[data-view="current-temp"]'),
  currentFeels: document.querySelector('[data-view="current-feels"]'),
  description: document.querySelector('[data-view="current-description"]'),
  updatedAt: document.querySelector('[data-view="current-updated"]'),
  himidity: document.querySelector('[data-view="current-humidity"]'),
  wind: document.querySelector('[data-view="current-wind"]'),
  pressure: document.querySelector('[data-view="current-pressure"]'),
  forecast: document.querySelector('[data-view="forecast"]'),
  units: document.querySelectorAll('[data-action="set-units"]'),
};
// Get current weather at the specified location - DONE
async function getWeather() {
  const weather_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${state.lat}&longitude=${state.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,surface_pressure&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`;

  const response = await fetch(weather_API_URL);
  if (!response.ok) throw Error('Error in fetch!');
  const data = await response.json();

  state.elevation = data.elevation;
  state.currentWeather = data.current;
  state.currentWeatherUnits = data.current_units;
  state.dailyWeather = data.daily;
  state.dailyWeatherUnits = data.daily_units;

  renderCurrentWeather();
}
// Get user location - DONE
async function getUserLocation(location) {
  const geocode_API_KEY = '695cd59b14895283892160dlc574d13';
  const geocode_API_URL = `https://geocode.maps.co/search?q=${location}&api_key=${geocode_API_KEY}`;

  const res = await fetch(geocode_API_URL);
  if (!res.ok) throw Error('Error in fetch!');
  const data = await res.json();

  state.lat = Number(data[0].lat).toFixed(2);
  state.lon = Number(data[0].lon).toFixed(2);
  state.city = data[0].name;

  getWeather();
}
// Render current weather
function renderCurrentWeather() {
  if (state.city === undefined) {
    document.querySelector('.placeholder').classList.remove('hidden');
    return;
  }
  document.querySelector('.placeholder').classList.add('hidden');
  els.currentLocation.innerHTML = state.city;
  els.currentTemp.innerHTML =
    state.currentWeather.temperature_2m +
    state.currentWeatherUnits.temperature_2m;
  els.currentFeels.innerHTML =
    'Feels like: ' +
    state.currentWeather.apparent_temperature +
    state.currentWeatherUnits.apparent_temperature;
  if (state.currentWeather.cloud_cover < 30) {
    els.description.innerHTML = 'Clear sky';
  } else if (
    state.currentWeather.cloud_cover > 30 &&
    state.currentWeather.cloud_cover < 70
  ) {
    els.description.innerHTML = 'Intermittent clouds';
  } else {
    els.description.innerHTML = 'Cloudy';
  }
  els.updatedAt.innerHTML = 'Updated at: ' + new Date().toLocaleTimeString();
  els.himidity.innerHTML =
    state.currentWeather.relative_humidity_2m +
    state.currentWeatherUnits.relative_humidity_2m;
  els.wind.innerHTML =
    state.currentWeather.wind_speed_10m +
    state.currentWeatherUnits.wind_speed_10m;
  els.pressure.innerHTML =
    state.currentWeather.surface_pressure +
    state.currentWeatherUnits.surface_pressure;
  renderForecast();
}
// Render forecast
function renderForecast() {
  document
    .querySelector('[data-view="forecast-empty"]')
    .classList.add('hidden');

  els.forecast.innerHTML = '';
  let dayCount = 0;

  state.dailyWeather.time.forEach((day) => {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const li = document.createElement('li');
    li.classList.add('forecast-item');
    const divDate = document.createElement('div');
    divDate.classList.add('forecast-date');
    divDate.textContent = days[new Date(day).getDay()];
    const divTemp = document.createElement('div');
    divTemp.classList.add('forecast-temp');
    divTemp.textContent =
      state.dailyWeather.temperature_2m_max[dayCount] +
      state.dailyWeatherUnits.temperature_2m_max +
      ' / ' +
      state.dailyWeather.temperature_2m_min[dayCount] +
      state.dailyWeatherUnits.temperature_2m_min;

    li.append(divDate, divTemp);
    els.forecast.appendChild(li);

    dayCount++;
  });
}
// Event listeners
function bindEvents() {
  // Get user city input
  els.searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (els.city.value === '') return;
    getUserLocation(els.city.value.trim());
    els.city.value = '';
  });
  // Switch units
  els.units.forEach((unit) => {
    unit.addEventListener('click', (e) => {
      switchUnits(e.target.dataset.units);
    });
  });
}
// Switch C/F
function switchUnits(e) {}
// Init
function init() {
  bindEvents();
  renderCurrentWeather();
}

init();
