import { test, expect } from '../scripts/testRunner.js';
import {
  createBook,
  getBookStats,
  filterBooksByStatus,
  searchBooks,
  sortBooks,
} from '../core/libraryCore.js';

function sampleBooks() {
  const b1 = createBook({
    title: '1984',
    author: 'George Orwell',
    year: '1949',
    pages: '326',
    read: true,
  });
  const b2 = createBook({
    title: 'East of Eden',
    author: 'John Steinbeck',
    year: 1952,
    pages: 601,
    read: false,
  });
  const b3 = createBook({
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
    year: 1937,
    pages: 107,
    read: false,
  });

  b1.id = 'b1';
  b2.id = 'b2';
  b3.id = 'b3';

  return [b1, b2, b3];
}

// createBook
test('createBook converts year/pages to numbers and sets defaults', () => {
  const book = createBook({
    title: 'Test Book',
    author: 'Someone',
    year: '2000',
    pages: '123',
  });

  expect(book.title).toBe('Test Book');
  expect(book.author).toBe('Someone');
  expect(book.year).toBe(2000);
  expect(book.pages).toBe(123);
  expect(book.read).toBe(false);
  expect(typeof book.id).toBe('string');
  expect(typeof book.createdAt).toBe('string');
});

test('createBook respects read flag when provided', () => {
  const book = createBook({
    title: 'Read Book',
    author: 'A',
    year: 2020,
    pages: 10,
    read: true,
  });

  expect(book.read).toBe(true);
});

// getBookStats
test('getBookStats counts total/read/unread correctly', () => {
  const books = sampleBooks();
  const stats = getBookStats(books);

  expect(stats.total).toBe(3);
  expect(stats.read).toBe(1);
  expect(stats.unread).toBe(2);
});

// filterBooksByStatus
test('filterBooksByStatus("all") returns copy of all books', () => {
  const books = sampleBooks();
  const result = filterBooksByStatus(books, 'all');

  expect(result.length).toBe(3);
  expect(result === books).toBe(false);
});

test('filterBooksByStatus("read") returns only read books', () => {
  const books = sampleBooks();
  const result = filterBooksByStatus(books, 'read');

  expect(result.length).toBe(1);
  expect(result[0].title).toBe('1984');
});

test('filterBooksByStatus("unread") returns only unread books', () => {
  const books = sampleBooks();
  const result = filterBooksByStatus(books, 'unread');

  expect(result.length).toBe(2);
  const titles = result.map((b) => b.title).sort();
  expect(titles).toEqual(['East of Eden', 'Of Mice and Men'].sort());
});

// searchBooks
test('searchBooks finds by title (case-insensitive, partial)', () => {
  const books = sampleBooks();
  const result = searchBooks(books, 'east');

  expect(result.length).toBe(1);
  expect(result[0].title).toBe('East of Eden');
});

test('searchBooks finds by author (case-insensitive)', () => {
  const books = sampleBooks();
  const result = searchBooks(books, 'steinbeck');

  expect(result.length).toBe(2);
  const titles = result.map((b) => b.title).sort();
  expect(titles).toEqual(['East of Eden', 'Of Mice and Men'].sort());
});

test('searchBooks with empty query returns all books', () => {
  const books = sampleBooks();
  const result = searchBooks(books, '   ');

  expect(result.length).toBe(3);
});

// sortBooks
test('sortBooks authorAsc sorts by author name A→Z', () => {
  const books = sampleBooks();
  const sorted = sortBooks(books, 'authorAsc');
  const authors = sorted.map((b) => b.author);

  expect(authors).toEqual([
    'George Orwell',
    'John Steinbeck',
    'John Steinbeck',
  ]);
});

test('sortBooks titleAsc sorts by title A→Z', () => {
  const books = sampleBooks();
  const sorted = sortBooks(books, 'titleAsc');
  const titles = sorted.map((b) => b.title);

  expect(titles).toEqual(['1984', 'East of Eden', 'Of Mice and Men']);
});

test('sortBooks createdAsc keeps same length and does not mutate source', () => {
  const books = sampleBooks();
  const copyBefore = books.map((b) => b.id);

  const sorted = sortBooks(books, 'createdAsc');

  expect(sorted.length).toBe(3);
  expect(books.map((b) => b.id)).toEqual(copyBefore);
  expect(sorted === books).toBe(false);
});
