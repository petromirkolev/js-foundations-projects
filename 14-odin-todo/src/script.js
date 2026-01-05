const tasks = {
  items: [],
};

// Global variables
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
  const input = document.querySelector('[data-input="new-todo"]');

  if (input.value === '') return;
  if (
    !tasks.items.find(
      (item) => item.text.toLowerCase() === input.value.toLowerCase()
    )
  ) {
    const newTask = new Task(input.value);
    tasks.items.push(newTask);
  } else {
    alert('There is such item already!');
    return;
  }
  buildTaskList(tasks.items);
  input.textContent = input.value = '';
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
function buildTaskList(tasks) {
  taskList.innerHTML = '';

  tasks.forEach((item) => {
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
    loadTasksStatus();
  });
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
    let valA, valB;
    if (!isNaN(a) && !isNaN(b)) {
      valA = a[key].toLowerCase();
      valB = b[key].toLowerCase();
    } else {
      valA = a[key];
      valB = b[key];
    }

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
          displayBooks(myLibrary);
          break;
        case 'read':
          const readBooks = myLibrary.filter((book) => book.read);
          displayBooks(readBooks);
          break;
        case 'unread':
          const unreadBooks = myLibrary.filter((book) => !book.read);
          displayBooks(unreadBooks);
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
      loadTasksStatus();
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

// Init
function init() {
  seedSample();
  addTaskListeners();
  searchTaskList();
  sortTasks();
  buildTaskList(tasks.items);
  clearAllTasks();
}

init();
