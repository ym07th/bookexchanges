const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: String,
  phone: String,
  address: String
});

module.exports = mongoose.model('User', userSchema);
