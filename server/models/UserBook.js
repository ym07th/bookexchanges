const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookISBN: String,
  condition: String,
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

module.exports = mongoose.model('UserBook', userBookSchema);
