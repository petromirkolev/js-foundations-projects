// Global variables
const myLibrary = [];
const bookTable = document.querySelector('[data-view="rows"]');
const filterStatus = document.querySelector('[data-input="filter-status"]');
const totalBooks = document.querySelector('[data-view="count-total"]');
const totalRead = document.querySelector('[data-view="count-read"]');
const totalUnread = document.querySelector('[data-view="count-unread"]');

// Book constructor
function Book(title, author, year, pages) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.read = false;
  this.createdAt = Date.now();
}

// Open modal
document
  .querySelector('[data-action="open-add-modal"]')
  .addEventListener('click', (e) => {
    const modal = document.querySelector('[data-view="modal"]');
    modal.classList.remove('hidden');
  });

// Close modal
document.querySelectorAll('[data-action="close-modal"]').forEach((button) => {
  button.addEventListener('click', (e) => {
    const modal = document.querySelector('[data-view="modal"]');
    modal.classList.add('hidden');
  });
});

const newBook = new Book('East of eden', 'Stein', 1992, 230);
const newBook1 = new Book('East of eden', 'Steinb', 1992, 230);
const newBook2 = new Book('East of eden', 'Steinbe', 1992, 230);
const newBook3 = new Book('East of eden', 'Steinbeck', 1992, 230);

newBook3.read = true;
newBook2.read = true;

myLibrary.push(newBook, newBook1, newBook2, newBook3);
// console.log(myLibrary);

// Display books in table
myLibrary.forEach((book) => {
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

filterStatus.addEventListener('change', (e) => {
  console.log(e);

  for (const element of e.target.children) {
    switch (element) {
      case 'all':
        console.log('all');
        break;

      case 'read':
        console.log('read');
        break;

      case 'unread':
        console.log('unread');
        break;

      default:
        break;
    }
  }
});
// Minimum feature set

// 1. Add a book (validate title/author)
// 2. Render table rows from state
// 3. Toggle read/unread (button per row)
// 4. Delete a book
// 5. Edit a book (reuse the same modal)
// 6. Search by title/author
// 7. Filter by read/unread
// 8. Sort

// <tr>
//             <td>3,000</td>
//             <td>3,000</td>
//             <td>3,000</td>
//             <td>3,000</td>
//             <td>3,000</td>
//             <td>3,000</td>
//           </tr>

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
