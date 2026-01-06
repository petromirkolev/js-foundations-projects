/**
 * Todo List App (vanilla JS)
 *
 * - State: tasks.items (array of task objects)
 * - Features: add, search, sort, filter, toggle completed, delete, seed, clear all/completed
 * - Rendering: buildTaskList(viewTasks) + loadTasksStatus() from full state
 *
 * This file is intentionally framework-free to practice DOM, state, and events.
 */

/* ========= 1) STATE + DOM REFERENCES ========= */

const tasks = {
  items: [],
};

const els = {
  list: document.querySelector('[data-view="items"]'),
  inputNew: document.querySelector('[data-input="new-todo"]'),
  search: document.querySelector('[data-input="search"]'),
  filterStatus: document.querySelector('[data-input="filter-status"]'),
  sort: document.querySelector('[data-input="sort"]'),
  total: document.querySelector('[data-view="count-total"]'),
  active: document.querySelector('[data-view="count-active"]'),
  completed: document.querySelector('[data-view="count-completed"]'),
  clearAll: document.querySelector('[data-action="clear-all"]'),
  clearCompleted: document.querySelector('[data-action="clear-completed"]'),
  seed: document.querySelector('[data-action="seed"]'),
  empty: document.querySelector('[data-view="empty"]'),
  addTaskByClick: document.querySelector('[data-action="add-todo"]'),
  addTaskByKey: document.querySelector('[data-input="new-todo"]'),
};

function Task(text) {
  this.id = crypto.randomUUID();
  this.text = text;
  this.completed = false;
  this.createdAt = Date.now();
}

/* ========= 2) PURE / DATA HELPERS (NO DOM) ========= */

function sortHelper(key) {
  return function (a, b) {
    const valA = a[key];
    const valB = b[key];

    if (typeof valA === 'string' && typeof valB === 'string') {
      const aStr = valA.toLowerCase();
      const bStr = valB.toLowerCase();
      if (aStr > bStr) return 1;
      if (aStr < bStr) return -1;
      return 0;
    }

    if (valA > valB) return 1;
    if (valA < valB) return -1;
    return 0;
  };
}

function findTaskById(id) {
  return tasks.items.find((t) => t.id === id) || null;
}

/* ========= 3) RENDERING (DOM FROM GIVEN DATA) ========= */

function loadTasksStatus() {
  const total = tasks.items.length;
  let active = 0;
  let completed = 0;

  tasks.items.forEach((task) => {
    if (task.completed) {
      completed++;
    } else {
      active++;
    }
  });

  els.total.textContent = `Total: ${total}`;
  els.active.textContent = `Active: ${active}`;
  els.completed.textContent = `Completed: ${completed}`;
}

function buildTaskList(viewTasks = tasks.items) {
  loadTasksStatus();
  els.list.innerHTML = '';

  if (!tasks.items.length) {
    if (els.empty) els.empty.style.display = 'block';
    return;
  }
  if (els.empty) els.empty.style.display = 'none';

  viewTasks.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = item.id;
    if (item.completed) li.classList.add('completed');

    // checkbox
    const checkboxBtn = document.createElement('button');
    checkboxBtn.type = 'button';
    checkboxBtn.className = 'todo-checkbox';
    checkboxBtn.dataset.action = 'toggle-completed';

    const checkboxInner = document.createElement('span');
    checkboxInner.className = 'todo-checkbox-inner';
    checkboxBtn.appendChild(checkboxInner);

    // main
    const main = document.createElement('div');
    main.className = 'todo-main';

    const textEl = document.createElement('div');
    textEl.className = 'todo-text';
    if (item.completed) textEl.classList.add('completed');
    textEl.textContent = item.text;

    const meta = document.createElement('div');
    meta.className = 'todo-meta';
    meta.textContent = `Created: ${new Date(item.createdAt).toLocaleString()}`;

    main.appendChild(textEl);
    main.appendChild(meta);

    // actions
    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.dataset.action = 'edit-todo';
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.dataset.action = 'delete-todo';
    deleteBtn.className = 'danger';
    deleteBtn.textContent = 'Delete';

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkboxBtn);
    li.appendChild(main);
    li.appendChild(actions);

    els.list.appendChild(li);
  });
}

/* ========= 4) CONTROLLERS (STATE CHANGES + RENDER CALLS) ========= */

function addTask() {
  const value = els.inputNew.value.trim();
  if (value === '') return;

  const exists = tasks.items.find(
    (item) => item.text.toLowerCase() === value.toLowerCase()
  );
  if (exists) {
    alert('There is such item already!');
    return;
  }

  const newTask = new Task(value);
  tasks.items.push(newTask);

  buildTaskList(tasks.items);
  els.inputNew.value = '';
}

function searchTaskList() {
  const query = els.search.value.toLowerCase();
  const foundTasks = tasks.items.filter((task) =>
    task.text.toLowerCase().includes(query)
  );
  buildTaskList(foundTasks);
}

function sortTasks(target) {
  let sorted;
  switch (target.value) {
    case 'textAsc':
      sorted = tasks.items.toSorted(sortHelper('text'));
      buildTaskList(sorted);
      break;
    case 'textDesc':
      sorted = tasks.items.toSorted(sortHelper('text'));
      buildTaskList(sorted.reverse());
      break;
    case 'createdAsc':
      sorted = tasks.items.toSorted(sortHelper('createdAt'));
      buildTaskList(sorted);
      break;
    case 'createdDesc':
      sorted = tasks.items.toSorted(sortHelper('createdAt'));
      buildTaskList(sorted.reverse());
      break;
    default:
      break;
  }
}

function filterByStatus(target) {
  switch (target.value) {
    case 'all': {
      buildTaskList(tasks.items);
      break;
    }
    case 'completed': {
      const completeTasks = tasks.items.filter((task) => task.completed);
      buildTaskList(completeTasks);
      break;
    }
    case 'active': {
      const activeTasks = tasks.items.filter((task) => !task.completed);
      buildTaskList(activeTasks);
      break;
    }
    default:
      break;
  }
}

function clearAllTasks() {
  tasks.items = [];
  buildTaskList(tasks.items);
}

function clearCompleteTasks() {
  const remainingTasks = tasks.items.filter((task) => !task.completed);
  tasks.items = remainingTasks;
  buildTaskList(tasks.items);
}

function seedSample() {
  tasks.items = [];
  tasks.items.push(
    new Task('Cook'),
    new Task('Laundry'),
    new Task('Walk the dog')
  );
  buildTaskList(tasks.items);
}

function handleListClick(e) {
  const itemEl = e.target.closest('.todo-item');
  if (!itemEl) return;

  const id = itemEl.dataset.id;
  const task = findTaskById(id);
  if (!task) return;

  // Toggle completed
  const toggleBtn = e.target.closest('[data-action="toggle-completed"]');
  if (toggleBtn) {
    task.completed = !task.completed;

    itemEl.classList.toggle('completed', task.completed);

    const textEl = itemEl.querySelector('.todo-text');
    if (textEl) {
      textEl.classList.toggle('completed', task.completed);
    }

    loadTasksStatus();
    return;
  }

  // Delete
  const deleteBtn = e.target.closest('[data-action="delete-todo"]');
  if (deleteBtn) {
    tasks.items = tasks.items.filter((t) => t.id !== id);
    buildTaskList(tasks.items);
    return;
  }

  // Edit
  const editBtn = e.target.closest('[data-action="edit-todo"]');
  if (editBtn) {
    const nextText = prompt('Edit task', task.text);
    if (!nextText || nextText.trim() === '') return;

    task.text = nextText.trim();
    buildTaskList(tasks.items);
    return;
  }
}

/* ========= 5) EVENT WIRING ========= */

function bindEvents() {
  // Add new task by click
  els.addTaskByClick.addEventListener('click', addTask);

  // Add new task by Enter key
  els.addTaskByKey.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Search
  els.search.addEventListener('input', searchTaskList);

  // Sort
  els.sort.addEventListener('change', (e) => {
    sortTasks(e.target);
  });

  // Filter
  els.filterStatus.addEventListener('change', (e) => {
    filterByStatus(e.target);
  });

  // Clear all
  els.clearAll.addEventListener('click', clearAllTasks);

  // Clear completed
  els.clearCompleted.addEventListener('click', clearCompleteTasks);

  // Seed sample
  els.seed.addEventListener('click', seedSample);

  // Delegated list handler (toggle / delete / edit)
  els.list.addEventListener('click', handleListClick);
}

/* ========= 6) INIT ========= */

function init() {
  bindEvents();
  buildTaskList(tasks.items);
}

init();
