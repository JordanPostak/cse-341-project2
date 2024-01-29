//...This is the routes/authors.js file...

const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authors');

const { isAuthenticated } = require('../middleware/authenticate');

// GET all authors
router.get('/', authorsController.getAllAuthors);

// GET a single author by ID
router.get('/:id', authorsController.getSingleAuthor);

// POST a new author (logged in)
router.post('/', isAuthenticated, authorsController.createAuthor);

// PUT (update) a author by ID (logged in)
router.put('/:id', isAuthenticated, authorsController.updateAuthor);

// DELETE a author by ID (logged in)
router.delete('/:id', isAuthenticated, authorsController.deleteAuthor);

module.exports = router;

