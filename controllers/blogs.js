//...This is the controllers/blogs.js file...


const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBlogs = async (req, res) => {
    //#swagger.tags=['blogs']
    const result = await mongodb.getDatabase().db('project2').collection('blogs').find();
    result.toArray().then((blogs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(blogs);
    });
};

const getSingleBlog = async (req, res) => {
    //#swagger.tags=['blogs']
    const blogId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project2').collection('blogs').find({ _id: blogId });
    result.toArray().then((blogs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(blogs[0]);
    });
};

const createBlog = async (req, res) => {
    //#swagger.tags=['blogs']
    const { title, author, category, content, published_date, tags, format } = req.body;

    // Data validation
    if (!title || !author || !content || !published_date || !tags || !format) {
        return res.status(400).json({ error: "Title, author, content, published date, tags, and format are required." });
    }

    // Create the updated blog object
    const blog = {
        title,
        author,
        category,
        content,
        published_date,
        tags,
        format
    };

    try {
        // Update the blog in the database
        const response = await mongodb.getDatabase().db('project2').collection('blogs').insertOne(blog);
        
        // Check if the blog was successfully updated
        if (response.acknowledged) {
            return res.status(204).send();// Success
        } else {
            return res.status(500).json('Some error occurred while creating the blog.');// Internal server error
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while creating the blog.');// Internal server error
    }
};

const updateBlog = async (req, res) => {
    //#swagger.tags=['blogs']
    const blogId = new ObjectId(req.params.id);

    // Destructure the request body
    const { title, author, category, content, published_date, tags, format } = req.body;

    // Data validation
    if (!title || !author || !content || !published_date || !tags || !format) {
        return res.status(400).json({ error: "Title, author, content, published date, tags, and format are required." });
    }

    // Create the updated blog object
    const updatedBlog = {
        title,
        author,
        category,
        content,
        published_date,
        tags,
        format
    };

    try {
        // Update the blog in the database
        const response = await mongodb.getDatabase().db('project2').collection('blogs').replaceOne({ _id: blogId }, updatedBlog);

        // Check if the blog was successfully updated
        if (response.modifiedCount > 0) {
            return res.status(204).send(); // Success
        } else {
            return res.status(404).json({ error: "Blog not found." }); // Blog with given ID not found
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while updating the blog.'); // Internal server error
    }
};

const deleteBlog = async (req, res) => {
    //#swagger.tags=['blogs']
    const blogId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project2').collection('blogs').deleteOne({ _id: blogId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the blog.');
    }
};

module.exports = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
};