//...This is the routes/blogs.js file...

const express = require('express');
const router = express.Router();

const blogsController = require('../controllers/blogs');

const { isAuthenticated } = require('../middleware/authenticate');

// GET all blogs
router.get('/', blogsController.getAllBlogs);

// GET a single blog by ID
router.get('/:id', blogsController.getSingleBlog);

// POST a new blog (logged in)
router.post('/', isAuthenticated, blogsController.createBlog);

// PUT (update) a blog by ID (logged in)
router.put('/:id', isAuthenticated, blogsController.updateBlog);

// DELETE a blog by ID (logged in)
router.delete('/:id', isAuthenticated, blogsController.deleteBlog);

module.exports = router;