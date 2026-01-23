/* Todo List App (vanilla JS) */

import { render } from './render.js';
import { bindEvents } from './controllers.js';
import { updateStateOnLoad } from './state.js';

// Init
function init() {
  updateStateOnLoad();
  bindEvents();
  render();
}

init();
