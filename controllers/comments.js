//...This is the controllers/comments.js file...

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllComments = async (req, res) => {
    //#swagger.tags=['comments']
    try {
        // Retrieve all comments from the database
        const result = await mongodb.getDatabase().db('project2').collection('comments').find();
        // Convert the result to an array of comments
        result.toArray().then((comments) => {
            // Set the response header
            res.setHeader('Content-Type', 'application/json');
            // Send the comments as a JSON response
            res.status(200).json(comments);
        });
    } catch (error) {
        console.error(error);
        // Handle internal server error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleComment = async (req, res) => {
    //#swagger.tags=['comments']
    try {
        const commentId = req.params.id;
        if (!ObjectId.isValid(commentId)) {
            return res.status(400).json({ error: 'Invalid comment ID' });
        }

        const result = await mongodb.getDatabase().db('project2').collection('comments').find({ _id: new ObjectId(commentId) });
        result.toArray().then((comments) => {
            if (comments.length === 0) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(comments[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createComment = async (req, res) => {
    //#swagger.tags=['comments']
    try {
        const { commentText, author, blogId } = req.body;

        // Create a comment object
        const comment = {
            commentText,
            author,
            blogId: ObjectId(blogId) // Convert the blogId to ObjectId
            // Other fields as needed
        };

        // Insert the comment into the database
        const response = await mongodb.getDatabase().db('project2').collection('comments').insertOne(comment);

        // Check if the comment was successfully inserted
        if (response.acknowledged) {
            return res.status(204).send(); // Success
        } else {
            return res.status(500).json('Some error occurred while creating the comment.'); // Internal server error
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' }); // Internal server error
    }
};

const updateComment = async (req, res) => {
    //#swagger.tags=['comments']
    // Add your code here
};

const deleteComment = async (req, res) => {
    //#swagger.tags=['comments']
    // Add your code here
};

module.exports = {
    getAllComments,
    getSingleComment,
    createComment,
    updateComment,
    deleteComment
};