import { state, els } from './state.js';

// Helpers
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

function switchUnits(nextUnits) {
  if (nextUnits === state.units) return;
  state.units = nextUnits;
  renderCurrentWeather();
}

export { cToF, formatTemp, showStatus, switchUnits };
