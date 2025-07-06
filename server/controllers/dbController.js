const Book = require('../models/Book');
const UserBook = require('../models/UserBook');
const User = require('../models/User');

const dbController = {};

// Check if book already exists in DB
dbController.findBook = async (req, res, next) => {
  const { isbn } = req.body;
  try {
    const book = await Book.findOne({ isbn });
    res.locals.bookInDB = !!book;
    next();
  } catch (err) {
    next(err);
  }
};

// Add a book to the DB if it doesn't already exist
dbController.addBook = async (req, res, next) => {
  if (res.locals.bookInDB) return next();
  const { isbn_13, title, author, subjects } = res.locals.book;
  try {
    await Book.create({
      isbn: isbn_13,
      title,
      author,
      genre: subjects
    });
    next();
  } catch (err) {
    next(err);
  }
};

// Search books owned by users by keyword
dbController.findOldBook = async (req, res, next) => {
  console.log('findOldBook body:', req.body);
  const keyword = req.body.searchString;
  try {
    // console.log('Keyword:', keyword);
    const matchingBooks = await Book.find({ title: { $regex: keyword, $options: 'i' } });
    // console.log('Matching books:', matchingBooks);
    const bookISBNs = matchingBooks.map(book => book.isbn);
    // console.log('Book ISBNs:', bookISBNs);
    const userBooks = await UserBook.find({ bookISBN: { $in: bookISBNs } }).populate('userId');
    console.log('User books:', userBooks);

    const result = userBooks.map(ub => {
      const book = matchingBooks.find(b => b.isbn === ub.bookISBN);
      console.log('Book found:', ub);
      return {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        condition: ub.condition,
        username: ub.userId.username,
        email: ub.userId.email
      };
    });
    res.locals.oldbooks = result;
    next();
  } catch (err) {
    next(err);
  }
};

// Add an old book to the user's collection
dbController.addOldBook = async (req, res, next) => {
  const { isbn, condition, userId } = req.body;
  try {
    console.log('addOldBook body:', req.body);
    await UserBook.create({ userId, bookISBN: isbn, condition });
    next();
  } catch (err) {
    next(err);
  }
};

// Delete an old book from the user's collection
dbController.deleteOldBook = async (req, res, next) => {
  const _id = req.body.myOldBookId;
  console.log('myOldBookId:', _id);
  try {
    await UserBook.findByIdAndDelete(_id);
    next();
  } catch (err) {
    next(err);
  }
};

// Get all books owned by a specific user
dbController.findMyBookList = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userBooks = await UserBook.find({ userId }).lean();
    const books = await Book.find().lean();
    const result = userBooks.map(ub => {
      const book = books.find(b => b.isbn === ub.bookISBN);
      return {
        title: book?.title,
        author: book?.author,
        isbn: ub.bookISBN,
        condition: ub.condition,
        users_books_id: ub._id
      };
    });
    res.locals.mybooks = result;
    next();
  } catch (err) {
    next(err);
  }
};

// Get books other users requested from the current user
dbController.getMyBookRequests = async (req, res, next) => {
  const { userId } = req.params;
  console.log('userId:', userId);
  try {
    const requests = await UserBook.find({ userId, requester: { $ne: null } }).populate('requester').lean();
    console.log('requests:', requests);
    const books = await Book.find().lean();
    console.log('books:', books);
    res.locals.incomingRequests = requests.map(req => ({
      title: books.find(b => b.isbn === req.bookISBN)?.title,
      username: req.requester.username,
      email: req.requester.email
    }));
    next();
  } catch (err) {
    next({ log: 400, message: 'Failed to get users incoming books request' });
  }
};

// Get books the current user has requested from others
dbController.getOutgoingRequests = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const outRequests = await UserBook.find({ requester: userId }).populate('userId').lean();
    const books = await Book.find().lean();
    res.locals.outgoingRequests = outRequests.map(req => ({
      title: books.find(b => b.isbn === req.bookISBN)?.title,
      username: req.userId.username,
      email: req.userId.email
    }));
    next();
  } catch (err) {
    next({ log: 400, message: 'Failed to get users outgoing books request' });
  }
};

// Request a book from another user
dbController.requestBook = async (req, res, next) => {
  const { userId, username, isbn } = req.body;
  try {
    const owner = await User.findOne({ username });
    const result = await UserBook.findOneAndUpdate({ userId: owner._id, bookISBN: isbn }, { requester: userId });
    next();
  } catch (err) {
    next(err);
  }
};

// Confirm a book has been shipped and remove it from DB
dbController.shipBook = async (req, res, next) => {
  const { title, username } = req.body;
  console.log('shipBook body: ', req.body);
  try {
    const book = await Book.findOne({ title });
    const requester = await User.findOne({ username });
    const result = await UserBook.findOneAndDelete({ bookISBN: book.isbn, requester: requester._id });

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = dbController;
