/**
 * Weather App (vanilla JS)
 *
 * - State: location + current + daily + units
 * - Flow: user types city -> geocode -> weather -> render
 * - Pattern: state -> render -> events/controllers
 */

/* =========================== 1. STATE + DOM REFERENCES =========================== */

const state = {
  lat: 0,
  lon: 0,
  city: undefined,
  elevation: 0,
  currentWeather: undefined,
  currentWeatherUnits: undefined,
  dailyWeather: undefined,
  dailyWeatherUnits: undefined,
  units: 'metric', // 'metric' | 'imperial'
};

const els = {
  searchButton: document.querySelector('[data-action="search"]'),
  city: document.querySelector('[data-input="location"]'),
  currentLocation: document.querySelector('[data-view="current-location"]'),
  currentTemp: document.querySelector('[data-view="current-temp"]'),
  currentFeels: document.querySelector('[data-view="current-feels"]'),
  description: document.querySelector('[data-view="current-description"]'),
  updatedAt: document.querySelector('[data-view="current-updated"]'),
  humidity: document.querySelector('[data-view="current-humidity"]'),
  wind: document.querySelector('[data-view="current-wind"]'),
  pressure: document.querySelector('[data-view="current-pressure"]'),
  forecast: document.querySelector('[data-view="forecast"]'),
  units: document.querySelectorAll('[data-action="set-units"]'),
  status: document.querySelector('[data-view="status"]'),
  currentPlaceholder: document.querySelector('[data-view="current-empty"]'),
  forecastPlaceholder: document.querySelector('[data-view="forecast-empty"]'),
};

/* =============== 2. HELPERS =============== */

function cToF(celsius) {
  return (celsius * 9) / 5 + 32;
}

function formatTemp(valueC) {
  if (state.units === 'metric') {
    return `${Math.round(valueC)}°C`;
  }
  const valueF = cToF(valueC);
  return `${Math.round(valueF)}°F`;
}

function showStatus(message) {
  if (!els.status) return;
  els.status.textContent = message || '';
}

/* ================== 3. RENDER FUNCTIONS ================== */

function renderCurrentWeather() {
  if (!state.city || !state.currentWeather) {
    if (els.currentPlaceholder) {
      els.currentPlaceholder.classList.remove('hidden');
    }
    return;
  }

  if (els.currentPlaceholder) {
    els.currentPlaceholder.classList.add('hidden');
  }

  const current = state.currentWeather;

  els.currentLocation.textContent = state.city;
  els.currentTemp.textContent = formatTemp(current.temperature_2m);
  els.currentFeels.textContent =
    'Feels like: ' + formatTemp(current.apparent_temperature);

  if (typeof current.cloud_cover === 'number') {
    if (current.cloud_cover < 30) {
      els.description.textContent = 'Clear sky';
    } else if (current.cloud_cover < 70) {
      els.description.textContent = 'Intermittent clouds';
    } else {
      els.description.textContent = 'Cloudy';
    }
  } else {
    els.description.textContent = '';
  }

  els.humidity.textContent = `${current.relative_humidity_2m}%`;
  els.wind.textContent = `${current.wind_speed_10m} m/s`;
  els.pressure.textContent = `${current.surface_pressure} hPa`;

  renderForecast();
}

function renderForecast() {
  if (!state.dailyWeather) {
    if (els.forecastPlaceholder) {
      els.forecastPlaceholder.classList.remove('hidden');
    }
    els.forecast.innerHTML = '';
    return;
  }

  if (els.forecastPlaceholder) {
    els.forecastPlaceholder.classList.add('hidden');
  }

  els.forecast.innerHTML = '';

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  state.dailyWeather.time.forEach((day, index) => {
    const li = document.createElement('li');
    li.classList.add('forecast-item');

    const divDate = document.createElement('div');
    divDate.classList.add('forecast-date');
    divDate.textContent = daysOfWeek[new Date(day).getDay()];

    const divTemp = document.createElement('div');
    divTemp.classList.add('forecast-temp');

    const maxC = state.dailyWeather.temperature_2m_max[index];
    const minC = state.dailyWeather.temperature_2m_min[index];
    divTemp.textContent = `${formatTemp(maxC)} / ${formatTemp(minC)}`;

    li.append(divDate, divTemp);
    els.forecast.appendChild(li);
  });
}

/* ================= 4. CONTROLLERS ================= */

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
  const geocodeApiKey = '695cd59b14895283892160dlc574d13';
  const geocodeApiUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(
    location
  )}&api_key=${geocodeApiKey}`;

  try {
    showStatus('Loading...');

    const res = await fetch(geocodeApiUrl);
    if (!res.ok) {
      throw new Error('Cannot get location!');
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Location not found');
    }

    state.lat = Number(data[0].lat).toFixed(2);
    state.lon = Number(data[0].lon).toFixed(2);
    state.city = data[0].name;
    els.updatedAt.textContent =
      'Updated at: ' + new Date().toLocaleTimeString();

    await getWeather();
    showStatus('');
  } catch (error) {
    console.error(error);
    showStatus('Could not load weather. Please try again.');
  }
}

function switchUnits(nextUnits) {
  if (nextUnits === state.units) return;
  state.units = nextUnits;
  renderCurrentWeather();
}

/* ================= 5. EVENT WIRING ================= */

function bindEvents() {
  // City search (button)
  els.searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const value = els.city.value.trim();
    if (!value) return;
    getUserLocation(value);
    els.city.value = '';
  });

  // Unit toggle buttons
  els.units.forEach((unitBtn) => {
    unitBtn.addEventListener('click', (e) => {
      const nextUnits = e.target.dataset.units;
      if (!nextUnits) return;
      switchUnits(nextUnits);
    });
  });
}

/* ========= 6. INIT ========= */

function init() {
  bindEvents();
  renderCurrentWeather();
}

init();
