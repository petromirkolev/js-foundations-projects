import { els, state } from './state.js';
import { formatTemp } from './helpers.js';

// Renderers
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

export { renderCurrentWeather, renderForecast };
