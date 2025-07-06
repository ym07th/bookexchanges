const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: String,
  author: String,
  genre: String, // corresponds to "subjects"
});

module.exports = mongoose.model('Book', bookSchema);
