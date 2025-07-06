const axios = require('axios');
const Book = require('../models/Book'); // Adjust path as needed

const apiController = {};

/**
 * Middleware to check if book exists in DB and store it in res.locals.bookInDB
 */
apiController.checkBookInDB = async (req, res, next) => {
  const { isbn } = req.body;
  try {
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      res.locals.bookInDB = existingBook;
    }
    return next();
  } catch (err) {
    return next({
      log: 'apiController.checkBookInDB: Error querying MongoDB',
      message: { err: 'Database lookup failed' }
    });
  }
};

/**
 * Fetch book info from OpenLibrary and store in res.locals.book
 */
apiController.findBook = async (req, res, next) => {
  if (res.locals.bookInDB) return next();
  const { isbn } = req.body;

  try {
    const response = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
    const bookInfo = response.data;

    const title = bookInfo.title || 'Unknown Title';
    const subjects = bookInfo.subjects?.[0] || 'Unknown';
    const authorEndpoint = bookInfo.authors?.[0]?.key || null;

    res.locals.book = {
      isbn_13: isbn,
      title,
      subjects,
    };

    res.locals.authorEndpoint = authorEndpoint;
    return next();
  } catch (err) {
    return next({
      log: 'apiController.findBook: Error fetching book info',
      message: { err: `OpenLibrary request failed: ${err.message}` }
    });
  }
};

/**
 * Fetch author info from OpenLibrary and update res.locals.book.author
 */
apiController.findAuthor = async (req, res, next) => {
  if (res.locals.bookInDB) return next();

  const { authorEndpoint } = res.locals;

  if (!authorEndpoint) {
    res.locals.book.author = 'Unknown';
    return next();
  }

  try {
    const response = await axios.get(`https://openlibrary.org${authorEndpoint}.json`);
    const author = response.data?.name || 'Unknown';
    res.locals.book.author = author;
    return next();
  } catch (err) {
    res.locals.book.author = 'Unknown';
    return next({
      log: 'apiController.findAuthor: Error fetching author info',
      message: { err: `Failed to fetch author info: ${err.message}` }
    });
  }
};

/**
 * Save book to MongoDB
 */
apiController.saveBookToDB = async (req, res, next) => {
  if (res.locals.bookInDB) return next();

  const { isbn_13, title, subjects, author } = res.locals.book;

  try {
    const newBook = await Book.create({
      isbn: isbn_13,
      title,
      author,
      genre: subjects,
    });

    res.locals.bookInDB = newBook;
    return next();
  } catch (err) {
    return next({
      log: 'apiController.saveBookToDB: Error saving book to MongoDB',
      message: { err: `Failed to save book: ${err.message}` }
    });
  }
};

module.exports = apiController;
