const bcrypt = require('bcryptjs');
const User = require('../models/User');
const userController = {};

// Create user
userController.createUser = async (req, res, next) => {
  const { username, password, email, phone, address } = req.body;
  console.log('createUser body: ', req.body);

  try {
    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hash,
      email,
      phone,
      address
    });

    res.locals.user = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address
    };
    res.locals.loggedIn = true;
    return next();
  } catch (err) {
    console.error(err);
    return next({
      log: 'Error creating user',
      message: { err: 'User creation failed' }
    });
  }
};

// Verify user
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.locals.loggedIn = false;
      return next({
        log: 'User not found',
        message: { err: 'Invalid credentials' }
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.locals.user = {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address
      };
      res.locals.loggedIn = true;
    } else {
      res.locals.loggedIn = false;
      res.locals.user = { _id: 'imnotreal' };
    }

    return next();
  } catch (err) {
    return next({
      log: 'Error verifying user',
      message: { err: 'Error in user verification' }
    });
  }
};

// Select all users
userController.selectAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.locals.users = users;
    return next();
  } catch (err) {
    return next({
      log: 'Error fetching users',
      message: { err: 'Could not fetch users' }
    });
  }
};

module.exports = userController;
