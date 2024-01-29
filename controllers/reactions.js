// controllers/reactions.js

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllReactions = async (req, res) => {
    //#swagger.tags=['reactions']
    try {
        const result = await mongodb.getDatabase().db('project2').collection('reactions').find();
        result.toArray().then((reactions) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(reactions);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleReaction = async (req, res) => {
    //#swagger.tags=['reactions']
    try {
        const reactionId = req.params.id;
        if (!ObjectId.isValid(reactionId)) {
            return res.status(400).json({ error: 'Invalid reaction ID' });
        }

        const result = await mongodb.getDatabase().db('project2').collection('reactions').find({ _id: new ObjectId(reactionId) });
        result.toArray().then((reactions) => {
            if (reactions.length === 0) {
                return res.status(404).json({ error: 'Reaction not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(reactions[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createReaction = async (req, res) => {
    //#swagger.tags=['reactions']
    try {
        const reaction = {
            commentId: req.body.commentId,
            reactionType: req.body.reactionType,
            author: req.body.author,
        };

        const response = await mongodb.getDatabase().db('project2').collection('reactions').insertOne(reaction);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the reaction.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateReaction = async (req, res) => {
    //#swagger.tags=['reactions']
    try {
        const reactionId = new ObjectId(req.params.id);
        const reaction = {
            commentId: req.body.commentId,
            reactionType: req.body.reactionType,
            author: req.body.author,
        };

        const response = await mongodb.getDatabase().db('project2').collection('reactions').replaceOne({ _id: reactionId }, reaction);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the reaction.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteReaction = async (req, res) => {
    //#swagger.tags=['reactions']
    try {
        const reactionId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('project2').collection('reactions').deleteOne({ _id: reactionId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the reaction.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllReactions,
    getSingleReaction,
    createReaction,
    updateReaction,
    deleteReaction
};