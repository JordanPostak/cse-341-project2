//...This is the controllers/authors.js file...


const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllAuthors = async (req, res) => {
    //#swagger.tags=['authors']
    try {
        const result = await mongodb.getDatabase().db('project2').collection('authors').find();
        result.toArray().then((authors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(authors);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleAuthor = async (req, res) => {
    //#swagger.tags=['authors']
    try {
        const authorId = req.params.id;
        if (!ObjectId.isValid(authorId)) {
            return res.status(400).json({ error: 'Invalid author ID' });
        }

        const result = await mongodb.getDatabase().db('project2').collection('authors').find({ _id: new ObjectId(authorId) });
        result.toArray().then((authors) => {
            if (authors.length === 0) {
                return res.status(404).json({ error: 'Author not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(authors[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createAuthor = async (req, res) => {
    //#swagger.tags=['authors']
    try {
        const author = {
            authorname: req.body.authorname,
            email: req.body.email,
        };

        const response = await mongodb.getDatabase().db('project2').collection('authors').insertOne(author);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the author.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateAuthor = async (req, res) => {
    //#swagger.tags=['authors']
    try {
        const authorId = new ObjectId(req.params.id);
        const author = {
            authorname: req.body.authorname,
            email: req.body.email,
        };

        const response = await mongodb.getDatabase().db('project2').collection('authors').replaceOne({ _id: authorId }, author);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the author.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteAuthor = async (req, res) => {
    //#swagger.tags=['authors']
    try {
        const authorId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('project2').collection('authors').deleteOne({ _id: authorId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the author.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
};