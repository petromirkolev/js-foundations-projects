import { els } from './dom.js';
import { tasks, createTask, findTaskHelper } from './state.js';
import { render } from './render.js';

function addTask() {
  const value = els.inputNew.value.trim();
  if (value === '') return;

  const exists = tasks.items.find(
    (item) => item.text.toLowerCase() === value.toLowerCase(),
  );
  if (exists) {
    alert('There is such item already!');
    return;
  }

  tasks.items.push(createTask(value));
  render();
  els.inputNew.value = '';
}

function searchTasks() {
  tasks.ui.searchQuery = els.search.value.toLowerCase();
  render();
}

function clearAll() {
  tasks.items = [];
  render();
}

function clearCompleted() {
  const remainingTasks = tasks.items.filter((task) => !task.completed);
  tasks.items = remainingTasks;
  render();
}

function seedSample() {
  tasks.items = [];
  tasks.items.push(
    createTask('Cook'),
    createTask('Laundry'),
    createTask('Walk the dog'),
  );
  render();
}

function taskControls(e) {
  const itemEl = e.target.closest('.todo-item');
  if (!itemEl) return;

  const id = itemEl.dataset.id;
  const task = findTaskHelper(id);
  if (!task) return;

  // Toggle completed
  const toggleBtn = e.target.closest('[data-action="toggle-completed"]');
  if (toggleBtn) {
    task.completed = !task.completed;
    render();
    return;
  }

  // Delete
  const deleteBtn = e.target.closest('[data-action="delete-todo"]');
  if (deleteBtn) {
    tasks.items = tasks.items.filter((t) => t.id !== id);
    render();
    return;
  }

  // Edit
  const editBtn = e.target.closest('[data-action="edit-todo"]');
  if (editBtn) {
    const nextText = prompt('Edit task', task.text);
    if (!nextText || nextText.trim() === '') return;
    task.text = nextText.trim();
    render();
    return;
  }
}

function bindEvents() {
  els.addTaskByClick.addEventListener('click', addTask);
  els.addTaskByKey.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
  els.search.addEventListener('input', searchTasks);
  els.sort.addEventListener('change', (e) => {
    tasks.ui.sortQuery = e.target.value;
    render();
  });
  els.filterStatus.addEventListener('change', (e) => {
    tasks.ui.filterQuery = e.target.value;
    render();
  });
  els.clearAll.addEventListener('click', clearAll);
  els.clearCompleted.addEventListener('click', clearCompleted);
  els.seed.addEventListener('click', seedSample);
  els.list.addEventListener('click', taskControls);
}

export { bindEvents };
