// Global variables
const myLibrary = [];
const bookTable = document.querySelector('[data-view="rows"]');
const filterStatus = document.querySelector('[data-input="filter-status"]');
const totalBooks = document.querySelector('[data-view="count-total"]');
const totalRead = document.querySelector('[data-view="count-read"]');
const totalUnread = document.querySelector('[data-view="count-unread"]');
const searchBox = document.querySelector('[data-input="search"]');
const emptyList = document.querySelector('[data-view="empty"]');
const modal = document.querySelector('[data-view="modal"]');

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

// Add new book manually

// submitBook.addEventListener('click', (e) => {
//   console.log(e);
//   // const title = document.querySelector('[data-field="title"]');
//   // const author = document.querySelector('[data-field="author"]');
//   // const pages = document.querySelector('[data-field="pages"]');
//   // const year = document.querySelector('[data-field="year"]');
// });

// function addNewBook() {
//   const title = document.querySelector('[data-field="title"]');
//   const author = document.querySelector('[data-field="author"]');
//   const pages = document.querySelector('[data-field="pages"]');
//   const year = document.querySelector('[data-field="year"]');

//   const newBook = new Book();
//   myLibrary.push(newBook);
// }

const asd = document.querySelector('[data-form="book"]');
asd.addEventListener('submit', (e) => {
  e.preventDefault();
  const author = document.querySelector('[data-field="author"]').value;
  const title = document.querySelector('[data-field="title"]').value;
  const year = document.querySelector('[data-field="year"]').value;
  const pages = document.querySelector('[data-field="pages"]').value;

  // if (year.length !== 4) alert('Invalid year!');

  // modal.classList.add('hidden');
});

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

// Misc
const newBook = new Book('East of eden', 'Stein', 1992, 230);
const newBook1 = new Book('East of eden', 'Steinb', 1992, 230);
const newBook2 = new Book('East of eden', 'Steinbe', 1992, 230);
const newBook3 = new Book('East of eden', 'Steinbeck', 1992, 230);
const newBook4 = new Book('West of eden', 'Steinbeck', 1992, 230);
myLibrary.push(newBook, newBook1, newBook2, newBook3, newBook4);
newBook3.read = true;
newBook2.read = true;
//

// Display books in table
function displayBooks(books) {
  bookTable.textContent = '';
  books.forEach((book) => {
    const tableRow = document.createElement('tr');
    for (const key in book) {
      const element = book[key];
      const tableData = document.createElement('td');
      if (key === 'id') continue;
      tableData.textContent = element;
      if (key === 'read') {
        element === true
          ? (tableData.textContent = 'Read')
          : (tableData.textContent = 'Not read');
      }
      tableRow.appendChild(tableData);
    }
    bookTable.appendChild(tableRow);
  });
}

// Filter books by status
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

// Manual search of books
searchBox.addEventListener('input', (e) => {
  const foundBooks = myLibrary.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchBox.value.toLowerCase()) ||
      book.author.toLowerCase().includes(searchBox.value.toLowerCase())
    );
  });
  displayBooks(foundBooks);
});

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

// myLibrary.forEach((book) => {
//   let count = 0;
//   if (book.read === false) count++;
//   totalUnread.textContent = `Unread: ${count}`;
// });

// Init library
loadBookStats();
displayBooks(myLibrary);
