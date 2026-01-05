/**
 * Todo List App (vanilla JS)
 *
 * - State: tasks.items (array of task objects)
 * - Features: add, search, sort, filter, toggle completed, delete, seed, clear all/completed
 * - Rendering: buildTaskList(viewTasks) + loadTasksStatus() from full state
 *
 * This file is intentionally framework-free to practice DOM, state, and events.
 */

// App state
const tasks = {
  items: [],
};
// Global variables
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
};
const taskList = document.querySelector('[data-view="items"]');
// Task object constructor
function Task(text) {
  this.id = crypto.randomUUID();
  this.text = text;
  this.completed = false;
  this.createdAt = Date.now();
}
// Add new task
function addTask() {
  if (els.inputNew.value.trim() === '') return;
  if (
    !tasks.items.find(
      (item) => item.text.toLowerCase() === els.inputNew.value.toLowerCase()
    )
  ) {
    const newTask = new Task(els.inputNew.value);
    tasks.items.push(newTask);
  } else {
    alert('There is such item already!');
    return;
  }
  buildTaskList(tasks.items);
  els.inputNew.value = '';
}
// New task listeners
function addTaskListeners() {
  // Add task by click
  document
    .querySelector('[data-action="add-todo"]')
    .addEventListener('click', addTask);
  // Add task by "Enter" key
  document
    .querySelector('[data-input="new-todo"]')
    .addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });
}
// Build To Do list
function buildTaskList(viewTasks) {
  loadTasksStatus();
  taskList.innerHTML = '';

  const emptyView = document.querySelector('[data-view="empty"]');

  if (!tasks.items.length) {
    if (emptyView) emptyView.style.display = 'block';
    return;
  }
  if (emptyView) emptyView.style.display = 'none';

  viewTasks.forEach((item) => {
    // list item
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

    // build row
    li.appendChild(checkboxBtn);
    li.appendChild(main);
    li.appendChild(actions);

    // add row
    taskList.appendChild(li);
  });
  toggleTaskStatus();
  editTask();
  deleteTask();
}
// Search task list
function searchTaskList() {
  const search = document.querySelector('[data-input="search"]');
  search.addEventListener('input', (e) => {
    const foundTasks = tasks.items.filter((task) => {
      return task.text.toLowerCase().includes(search.value.toLowerCase());
    });
    buildTaskList(foundTasks);
  });
}
// Sort helper
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

    // fallback: numeric / default
    if (valA > valB) return 1;
    if (valA < valB) return -1;
    return 0;
  };
}
// Sort tasks
function sortTasks() {
  document
    .querySelector('[data-input="sort"]')
    .addEventListener('change', (e) => {
      let sorted;
      switch (e.target.value) {
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
    });
}
// Filter tasks by status
function filterByStatus() {
  document
    .querySelector('[data-input="filter-status"]')
    .addEventListener('change', (e) => {
      switch (e.target.value) {
        case 'all':
          buildTaskList(tasks.items);
          break;
        case 'completed':
          const completeTasks = tasks.items.filter((task) => task.completed);
          buildTaskList(completeTasks);
          break;
        case 'active':
          const uncompleteTasks = tasks.items.filter((task) => !task.completed);
          buildTaskList(uncompleteTasks);
          break;
        default:
          return;
      }
    });
}
// Load tasks by status
function loadTasksStatus() {
  let total = tasks.items.length;
  let active = 0;
  let completed = 0;
  tasks.items.forEach((task) => {
    if (task.completed === true) {
      completed++;
    } else {
      active++;
    }
  });
  document.querySelector(
    '[data-view="count-total"]'
  ).textContent = `Total: ${total}`;
  document.querySelector(
    '[data-view="count-active"]'
  ).textContent = `Active: ${active}`;
  document.querySelector(
    '[data-view="count-completed"]'
  ).textContent = `Completed: ${completed}`;
}
// Clear all tasks
function clearAllTasks() {
  document
    .querySelector('[data-action="clear-all"]')
    .addEventListener('click', (e) => {
      tasks.items = [];
      buildTaskList(tasks.items);
    });
}
// Load fake data (seed sample)
function seedSample() {
  document
    .querySelector('[data-action="seed"]')
    .addEventListener('click', (e) => {
      tasks.items = [];
      const taskOne = new Task('Cook');
      const taskTwo = new Task('Laundry');
      const taskThree = new Task('Walk the dog');
      tasks.items.push(taskOne, taskTwo, taskThree);
      buildTaskList(tasks.items);
    });
}
// Toggle task status
function toggleTaskStatus() {
  document
    .querySelectorAll('[data-action="toggle-completed"]')
    .forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        const itemEl = e.target.closest('.todo-item');
        const textEl = itemEl.querySelector('.todo-text');
        const taskId = itemEl.dataset.id;

        const task = tasks.items.find((t) => t.id === taskId);
        if (!task) return;

        const nextCompleted = !task.completed;
        task.completed = nextCompleted;

        if (nextCompleted) {
          itemEl.classList.add('completed');
          textEl.classList.add('completed');
        } else {
          itemEl.classList.remove('completed');
          textEl.classList.remove('completed');
        }

        loadTasksStatus();
      });
    });
}
// Delete task
function deleteTask() {
  document
    .querySelectorAll('[data-action="delete-todo"]')
    .forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', (e) => {
        const task = e.target.closest('.todo-item');
        const id = task.dataset.id;
        const remainingTasks = tasks.items.filter((task) => task.id !== id);
        tasks.items = remainingTasks;

        buildTaskList(tasks.items);
      });
    });
}
// Clear completed
function clearCompleteTasks() {
  document
    .querySelector('[data-action="clear-completed"]')
    .addEventListener('click', (e) => {
      const remainingTasks = tasks.items.filter(
        (task) => task.completed === false
      );
      tasks.items = remainingTasks;
      buildTaskList(tasks.items);
    });
}
// Edit task
function editTask() {
  document.querySelectorAll('[data-action="edit-todo"]').forEach((editBtn) => {
    editBtn.addEventListener('click', (e) => {
      const itemEl = e.target.closest('.todo-item');
      const id = itemEl.dataset.id;
      const task = tasks.items.find((t) => t.id === id);
      if (!task) return;

      const nextText = prompt('Edit task', task.text);
      if (!nextText || nextText.trim() === '') return;

      task.text = nextText.trim();
      buildTaskList(tasks.items);
    });
  });
}

// Init
function init() {
  buildTaskList();
  seedSample();
  addTaskListeners();
  searchTaskList();
  sortTasks();
  clearAllTasks();
  clearCompleteTasks();
  filterByStatus();
}
// Load initial app data
init();
