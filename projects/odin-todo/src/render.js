import { tasks, getViewItems } from './state.js';
import { els } from './dom.js';

function render() {
  buildTaskList(getViewItems());
}

function buildTaskList(viewTasks = tasks.items) {
  loadTasksStatus();
  els.list.innerHTML = '';
  els.empty.textContent = 'No tasks yet. Add your first todo above.';

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

    const checkboxBtn = document.createElement('button');
    checkboxBtn.type = 'button';
    checkboxBtn.className = 'todo-checkbox';
    checkboxBtn.dataset.action = 'toggle-completed';

    const checkboxInner = document.createElement('span');
    checkboxInner.className = 'todo-checkbox-inner';
    checkboxBtn.appendChild(checkboxInner);

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

  if (els.list.childElementCount === 0) {
    els.empty.style.display = 'block';
    els.empty.textContent = 'No matching tasks';
  }
}

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

export { render };
