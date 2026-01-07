import {
  createBook,
  getBookStats,
  filterBooksByStatus,
  searchBooks,
  sortBooks,
} from './core/libraryCore.js';

/**
 * Library App (vanilla JS)
 *
 * - State: state.books (array of book objects)
 * - Features: add / edit, filter, sort, search, stats
 */

// State
const state = {
  books: [],
};

// DOM references
const els = {
  bookTable: document.querySelector('[data-view="rows"]'),
  filterStatus: document.querySelector('[data-input="filter-status"]'),
  sortStatus: document.querySelector('[data-input="sort"]'),
  totalBooks: document.querySelector('[data-view="count-total"]'),
  totalRead: document.querySelector('[data-view="count-read"]'),
  totalUnread: document.querySelector('[data-view="count-unread"]'),
  searchBox: document.querySelector('[data-input="search"]'),
  modal: document.querySelector('[data-view="modal"]'),
  submitBook: document.querySelector('[data-form="book"]'),
  openModalBtn: document.querySelector('[data-action="open-add-modal"]'),
  closeModalBtns: document.querySelectorAll('[data-action="close-modal"]'),
  seedSample: document.querySelector('[data-action="seed"]'),
  clearAll: document.querySelector('[data-action="clear-all"]'),
};

// Rendering
function renderStats() {
  const { total, read, unread } = getBookStats(state.books);
  els.totalBooks.textContent = `Total: ${total}`;
  els.totalRead.textContent = `Read: ${read}`;
  els.totalUnread.textContent = `Unread: ${unread}`;
}

function renderBooks(viewBooks) {
  els.bookTable.textContent = '';

  viewBooks.forEach((book) => {
    const row = document.createElement('tr');

    const keys = ['title', 'author', 'year', 'pages', 'read', 'createdAt'];

    keys.forEach((key) => {
      const td = document.createElement('td');
      const value = book[key];

      if (key === 'title') {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = value;
        link.dataset.action = 'edit-book';
        link.dataset.id = book.id;
        td.appendChild(link);
      } else if (key === 'read') {
        td.textContent = value ? 'Read' : 'Not read';
      } else {
        td.textContent = value;
      }

      row.appendChild(td);
    });

    els.bookTable.appendChild(row);
  });
}

// Render everything from full state
function renderMainView() {
  renderStats();
  renderBooks(state.books);
}

// Modal + form
function openModalForNewBook() {
  const form = els.submitBook;
  if (!form) return;

  form.reset();
  const idField = form.querySelector('[data-field="id"]');
  if (idField) idField.value = '';

  els.modal.classList.remove('hidden');
}

function openModalForEdit(book) {
  const form = els.submitBook;
  if (!form) return;

  els.modal.classList.remove('hidden');

  form.querySelector('[data-field="id"]').value = book.id;
  form.querySelector('[data-field="title"]').value = book.title;
  form.querySelector('[data-field="author"]').value = book.author;
  form.querySelector('[data-field="year"]').value = book.year;
  form.querySelector('[data-field="pages"]').value = book.pages;
  form.querySelector('[data-field="read"]').checked = book.read;
}

function closeModal() {
  els.modal.classList.add('hidden');
}

function handleFormSubmit(e) {
  e.preventDefault();

  const form = els.submitBook;

  const id = form.querySelector('[data-field="id"]').value;
  const title = form.querySelector('[data-field="title"]').value;
  const author = form.querySelector('[data-field="author"]').value;
  const year = form.querySelector('[data-field="year"]').value;
  const pages = form.querySelector('[data-field="pages"]').value;
  const isRead = form.querySelector('[data-field="read"]').checked;

  if (id) {
    // edit existing
    const book = state.books.find((b) => b.id === id);
    if (book) {
      book.title = title;
      book.author = author;
      book.year = Number(year);
      book.pages = Number(pages);
      book.read = isRead;
    }
  } else {
    // add new
    const newBook = createBook({ title, author, year, pages, read: isRead });
    state.books.push(newBook);
  }

  renderMainView();
  closeModal();
}

// Table / filter / sort / search events
function handleTableClick(e) {
  const link = e.target.closest('[data-action="edit-book"]');
  if (!link) return;

  const selectedId = link.dataset.id;
  const foundBook = state.books.find((book) => book.id === selectedId);
  if (!foundBook) return;

  openModalForEdit(foundBook);
}

function handleFilterChange(e) {
  const status = e.target.value;
  const filtered = filterBooksByStatus(state.books, status);
  renderBooks(filtered);
}

function handleSortChange(e) {
  const sortKey = e.target.value;
  const sorted = sortBooks(state.books, sortKey);
  renderBooks(sorted);
}

function handleSearchInput() {
  const query = els.searchBox.value;
  const found = searchBooks(state.books, query);
  renderBooks(found);
}

function handleClearAllBooks() {
  state.books = [];
  renderBooks(state.books);
}

// Seed sample data
function seedSample() {
  const b1 = createBook({
    title: 'East of Eden',
    author: 'John Steinbeck',
    year: 1952,
    pages: 601,
  });
  const b2 = createBook({
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
    year: 1937,
    pages: 107,
    read: true,
  });
  const b3 = createBook({
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    pages: 326,
    read: true,
  });
  const b4 = createBook({
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    pages: 333,
  });
  const b5 = createBook({
    title: 'The Great Gatsby',
    author: 'Francis Scott',
    year: 1925,
    pages: 123,
  });
  const b6 = createBook({
    title: 'Meditations',
    author: 'Marcus Aurelius',
    year: 161,
    pages: 105,
  });
  const b7 = createBook({
    title: 'My Favourite Book',
    author: 'Petromir Kolev',
    year: 123,
    pages: 321,
  });

  state.books = [];
  state.books.push(b1, b2, b3, b4, b5, b6, b7);
  renderBooks(state.books);
}

// Bind events + init
function bindEvents() {
  // table click -> edit
  els.bookTable.addEventListener('click', handleTableClick);
  // seed sample
  els.seedSample.addEventListener('click', seedSample);
  // clear all books
  els.clearAll.addEventListener('click', handleClearAllBooks);
  // form submit
  els.submitBook.addEventListener('submit', handleFormSubmit);
  // filter / sort / search
  els.filterStatus.addEventListener('change', handleFilterChange);
  els.sortStatus.addEventListener('change', handleSortChange);
  els.searchBox.addEventListener('input', handleSearchInput);
  // modal open/close
  els.openModalBtn.addEventListener('click', openModalForNewBook);
  els.closeModalBtns.forEach((btn) =>
    btn.addEventListener('click', closeModal)
  );
}

function init() {
  renderMainView();
  bindEvents();
}

init();
