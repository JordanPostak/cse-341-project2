//...This is the routes/comments.js file...

const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');

const { isAuthenticated } = require('../middleware/authenticate');

// GET all comments
router.get('/', commentsController.getAllComments);

// GET a single comment by ID
router.get('/:id', commentsController.getSingleComment);

// POST a new comment (logged in)
router.post('/', isAuthenticated, commentsController.createComment);

// PUT (update) a comment by ID (logged in)
router.put('/:id', isAuthenticated, commentsController.updateComment);

// DELETE a comment by ID (logged in)
router.delete('/:id', isAuthenticated, commentsController.deleteComment);

module.exports = router;