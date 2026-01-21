/* 
Todo List App (vanilla JS)
- State: tasks.items (array of task objects); tasks.ui (object holding sort/filter actions)
- Features: add, search, sort, filter, toggle completed, delete, seed, clear all/completed
- Rendering: buildTaskList(viewTasks) + loadTasksStatus() from full state
*/

import { render } from './render.js';
import { bindEvents } from './controllers.js';

// Init
function init() {
  bindEvents();
  render();
}

init();
