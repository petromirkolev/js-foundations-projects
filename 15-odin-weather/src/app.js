/*
  Weather App (vanilla JS)
 
  - State: location + current + daily + units
  - Flow: user types city -> geocode -> weather -> render
  - Pattern: state -> render -> events/controllers
 */

import { els } from './state.js';
import { renderCurrentWeather } from './renderers.js';
import { getUserLocation } from './controllers.js';

// Event wiring
function bindEvents() {
  els.searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const value = els.city.value.trim();
    if (!value) return;
    getUserLocation(value);
    els.city.value = '';
  });

  els.units.forEach((unitBtn) => {
    unitBtn.addEventListener('click', (e) => {
      const nextUnits = e.target.dataset.units;
      if (!nextUnits) return;
      switchUnits(nextUnits);
    });
  });
}

// Init
function init() {
  bindEvents();
  renderCurrentWeather();
}

init();
