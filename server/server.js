const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const PORT = 5000;
const app = express();

const apiRouter = require('./routes/api');

app.use(express.json());


mongoose.connect('mongodb+srv://ymcapone184:12zYd3KXImPX1yxe@cluster0.ardprzh.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB Atlas');
});


app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve(__dirname, '../client')));


//API routes
app.use('/api', apiRouter);

//Server Status
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Server Status</title>
      </head>
      <body>
        <h1>✅ Server is up and running!</h1>
      </body>
    </html>
  `);
});

//unrecognized routes
app.use("*", (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error' +err,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;