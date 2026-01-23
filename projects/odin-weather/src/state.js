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

export { state, els };
