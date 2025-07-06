const express = require('express');
const router = express.Router();

const dbController = require('../controllers/dbController');
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');

// route to find book
router.get('/findBook', apiController.checkBookInDB,
  apiController.findBook,
  apiController.findAuthor,
  apiController.saveBookToDB, (req, res) => {
  return res.status(200).json(res.locals.bookInDB);
});

// route to add old book
router.post('/addOldBook', dbController.findBook, apiController.findBook, apiController.findAuthor, dbController.addBook, dbController.addOldBook, (req, res) => {
  return res.status(200).json(res.locals);
});

// route to find old book
router.post('/findOldBook', dbController.findOldBook, (req, res) => {
  return res.status(200).json(res.locals.oldbooks);
});

// route to request book
router.post('/requestBook', dbController.requestBook, (req, res) => {
  return res.status(200).json(res.locals.requestBooks)
});

//route to get incoming requests
router.get('/getIncomingInfo/:userId', dbController.getMyBookRequests, (req, res) => {
  return res.status(200).json(res.locals.incomingRequests)
})

//route to get outgoing requests
router.get('/getOutgoingInfo/:userId', dbController.getOutgoingRequests, (req, res) => {
  return res.status(200).json(res.locals.outgoingRequests)
})

//route to ship book
router.post('/shipped', dbController.shipBook, (req, res) => {
  return res.status(200).json(res.locals.shipped)
})

//route to delete old book
router.post('/deleteOldBook', dbController.deleteOldBook, (req, res) => {
  return res.status(200).json(req.body.myOldBookId);
});

//route to get my old book list
router.get('/getMyOldBookList/:userId', dbController.findMyBookList, (req, res) => {
  return res.status(200).json(res.locals.mybooks);
});

//route to register
router.post('/register', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals);
});

//route to login
router.post('/verifyUser', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals);
});


module.exports = router;