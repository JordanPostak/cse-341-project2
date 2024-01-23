//...This is the routes/users.js file...

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

// GET all users
router.get('/', usersController.getAll);

// GET a single user by ID
router.get('/:id', usersController.getSingle);

// POST a new user
router.post('/', usersController.createUser);

// PUT (update) a user by ID
router.put('/:id', usersController.updateUser);

// DELETE a user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;