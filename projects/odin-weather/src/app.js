/* Weather App (vanilla JS) */

import { bindEvents } from './controllers.js';
import { renderCurrentWeather } from './renderers.js';

function init() {
  bindEvents();
  renderCurrentWeather();
}

init();
