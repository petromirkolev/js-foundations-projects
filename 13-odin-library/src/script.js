// Global variables
const myLibrary = [];
const bookTable = document.querySelector('[data-view="rows"]');
const filterStatus = document.querySelector('[data-input="filter-status"]');
const sortStatus = document.querySelector('[data-input="sort"]');
const totalBooks = document.querySelector('[data-view="count-total"]');
const totalRead = document.querySelector('[data-view="count-read"]');
const totalUnread = document.querySelector('[data-view="count-unread"]');
const searchBox = document.querySelector('[data-input="search"]');
const emptyList = document.querySelector('[data-view="empty"]');
const modal = document.querySelector('[data-view="modal"]');
const submitBook = document.querySelector('[data-form="book"]');

// Book constructor
function Book(title, author, year, pages) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.read = false;
  this.createdAt = new Date().toDateString();
}

// Add new book
function addNewBook() {
  submitBook.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.querySelector('[data-field="author"]').value;
    const title = document.querySelector('[data-field="title"]').value;
    const year = document.querySelector('[data-field="year"]').value;
    const pages = document.querySelector('[data-field="pages"]').value;
    const newBook = new Book(title, author, year, pages);
    myLibrary.push(newBook);
    displayBooks(myLibrary);
    loadBookStats();
    modal.classList.add('hidden');
  });
}

// Add book modal listeners
function modalListeners() {
  // Open modal
  document
    .querySelector('[data-action="open-add-modal"]')
    .addEventListener('click', (e) => {
      modal.classList.remove('hidden');
    });
  // Close modal
  document.querySelectorAll('[data-action="close-modal"]').forEach((button) => {
    button.addEventListener('click', (e) => {
      modal.classList.add('hidden');
    });
  });
}

// Display books in table
function displayBooks(books) {
  bookTable.textContent = '';

  books.forEach((book) => {
    const tableRow = document.createElement('tr');

    for (const key in book) {
      if (key === 'id') continue;

      const tableData = document.createElement('td');
      const element = book[key];

      if (key === 'title') {
        let link = document.createElement('a');
        link.href = '#';
        link.textContent = element;
        link.dataset.id = book.id;
        tableData.appendChild(link);
      } else if (key === 'read') {
        tableData.textContent = element ? 'Read' : 'Not read';
      } else {
        tableData.textContent = element;
      }

      tableRow.appendChild(tableData);
    }

    bookTable.appendChild(tableRow);
  });
}

// Filter books by status
function filterBooks() {
  filterStatus.addEventListener('change', (e) => {
    switch (e.target.value) {
      case 'all':
        displayBooks(myLibrary);
        break;
      case 'read':
        const readBooks = myLibrary.filter((book) => {
          if (book.read) return book;
        });
        displayBooks(readBooks);
        break;
      case 'unread':
        const unreadBooks = myLibrary.filter((book) => {
          if (!book.read) return book;
        });
        displayBooks(unreadBooks);
        break;
      default:
        return;
    }
  });
}

// Sort books helper
function sortHelper(key) {
  return function (a, b) {
    const valA = a[key].toLowerCase();
    const valB = b[key].toLowerCase();
    if (valA > valB) return 1;
    if (valA < valB) return -1;
    return 0;
  };
}

// Sort books in table
function sortBooks() {
  sortStatus.addEventListener('change', (e) => {
    let sorted;
    switch (e.target.value) {
      case 'authorAsc':
        sorted = myLibrary.toSorted(sortHelper('author'));
        displayBooks(sorted);
        break;
      case 'authorDesc':
        sorted = myLibrary.toSorted(sortHelper('author'));
        displayBooks(sorted.reverse());
        break;
      case 'titleAsc':
        sorted = myLibrary.toSorted(sortHelper('title'));
        displayBooks(sorted);
        break;
      case 'titleDesc':
        sorted = myLibrary.toSorted(sortHelper('title'));
        displayBooks(sorted.reverse());
        break;
      case 'createdAsc':
        sorted = myLibrary.toSorted(sortHelper('createdAt'));
        displayBooks(sorted);
        break;
      case 'createdDesc':
        sorted = myLibrary.toSorted(sortHelper('createdAt'));
        displayBooks(sorted.reverse());
        break;
      default:
        break;
    }
  });
}

// Manual search of books
function manualSearch() {
  searchBox.addEventListener('input', (e) => {
    const foundBooks = myLibrary.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchBox.value.toLowerCase()) ||
        book.author.toLowerCase().includes(searchBox.value.toLowerCase())
      );
    });
    displayBooks(foundBooks);
  });
}

// Load total/read/unread count
function loadBookStats() {
  let readCount = 0;
  let unreadCount = 0;
  myLibrary.forEach((book) => {
    if (book.read === true) {
      readCount++;
    } else {
      unreadCount++;
    }
  });
  totalBooks.textContent = `Total: ${myLibrary.length}`;
  totalRead.textContent = `Read: ${readCount}`;
  totalUnread.textContent = `Unread: ${unreadCount}`;
}

// Initialize library
function init() {
  const newBook1 = new Book('East of eden', 'John Steinbeck', 1952, 601);
  const newBook2 = new Book('Of mice and men', 'John Steinbeck', 1937, 107);
  const newBook3 = new Book('1984', 'George Orwell', 1949, 326);
  const newBook4 = new Book('To kill a mockingbird', 'Harper Lee', 1960, 333);
  const newBook5 = new Book('The great Gatsby', 'Francis Scott', 1925, 123);
  const newBook6 = new Book('Meditations', 'Marcus Aurelius', 161, 105);
  const newBook7 = new Book('My favourite book', 'Petromir Kolev', 123, 321);

  myLibrary.push(
    newBook1,
    newBook2,
    newBook3,
    newBook4,
    newBook5,
    newBook6,
    newBook7
  );
  newBook3.read = true;
  newBook2.read = true;

  loadBookStats();
  displayBooks(myLibrary);
  addNewBook();
  modalListeners();
  filterBooks();
  sortBooks();
  manualSearch();
}

// Init library
init();
