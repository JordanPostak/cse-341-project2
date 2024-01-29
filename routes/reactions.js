// routes/reactions.js

const express = require('express');
const router = express.Router();

const reactionsController = require('../controllers/reactions');

const { isAuthenticated } = require('../middleware/authenticate');

// GET all reactions
router.get('/', reactionsController.getAllReactions);

// GET a single reaction by ID
router.get('/:id', reactionsController.getSingleReaction);

// POST a new reaction (logged in)
router.post('/', isAuthenticated, reactionsController.createReaction);

// PUT (update) a reaction by ID (logged in)
router.put('/:id', isAuthenticated, reactionsController.updateReaction);

// DELETE a reaction by ID (logged in)
router.delete('/:id', isAuthenticated, reactionsController.deleteReaction);

module.exports = router;