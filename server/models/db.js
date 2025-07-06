const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ak25117:AE1sg8yVMdwQYooA@cluster0.28v8jbi.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
