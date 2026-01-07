// Create a new book object
function createBook({ title, author, year, pages, read = false }) {
  return {
    id: crypto.randomUUID(),
    title,
    author,
    year: Number(year),
    pages: Number(pages),
    read: Boolean(read),
    createdAt: new Date().toDateString(),
  };
}

// Compute stats: total / read / unread
function getBookStats(books) {
  const total = books.length;
  let read = 0;
  let unread = 0;

  books.forEach((book) => {
    if (book.read) read++;
    else unread++;
  });

  return { total, read, unread };
}

// Filter by status: all / read / unread
function filterBooksByStatus(books, status) {
  switch (status) {
    case 'read':
      return books.filter((b) => b.read);
    case 'unread':
      return books.filter((b) => !b.read);
    case 'all':
    default:
      return books.slice();
  }
}

// Search by title or author
function searchBooks(books, query) {
  const q = query.trim().toLowerCase();
  if (!q) return books.slice();

  return books.filter((book) => {
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q)
    );
  });
}

// Sort helper factory
function makeSortHelper(key) {
  return (a, b) => {
    const va = String(a[key]).toLowerCase();
    const vb = String(b[key]).toLowerCase();
    if (va > vb) return 1;
    if (va < vb) return -1;
    return 0;
  };
}

// Sort books by various options
function sortBooks(books, sortKey) {
  const copy = books.slice();

  switch (sortKey) {
    case 'authorAsc':
      return copy.toSorted(makeSortHelper('author'));
    case 'authorDesc':
      return copy.toSorted(makeSortHelper('author')).reverse();
    case 'titleAsc':
      return copy.toSorted(makeSortHelper('title'));
    case 'titleDesc':
      return copy.toSorted(makeSortHelper('title')).reverse();
    case 'createdAsc':
      return copy.toSorted(makeSortHelper('createdAt'));
    case 'createdDesc':
      return copy.toSorted(makeSortHelper('createdAt')).reverse();
    default:
      return copy;
  }
}

export {
  createBook,
  getBookStats,
  filterBooksByStatus,
  searchBooks,
  sortBooks,
};
