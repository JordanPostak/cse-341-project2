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
    const blog = {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        published_date: req.body.published_date,
        tags: req.body.tags,
        format: req.body.format
    };

    const response = await mongodb.getDatabase().db('project2').collection('blogs').insertOne(blog);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the blog.');
    }
};

const updateBlog = async (req, res) => {
    //#swagger.tags=['blogs']
    const blogId = new ObjectId(req.params.id);
    const blog = {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        published_date: req.body.published_date,
        tags: req.body.tags,
        format: req.body.format
    };

    const response = await mongodb.getDatabase().db('project2').collection('blogs').replaceOne({ _id: blogId }, blog);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the blog.');
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