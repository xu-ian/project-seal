const { ObjectID } = require('bson');
const { json } = require('express');

const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const user = require('../models/user');
const postsRoutes = express.Router();
const User = require('../models/user');

// Get a list of all the posts.
postsRoutes.route('/').get((req, res) => {
    if (Object.keys(req.query).length === 0) {
        Post.find()
            .populate({
                path: 'comments',
                populate: {
                    path: 'author'
                }
            })
            .populate('author')
            .then(posts => {
                res.json(posts);
            })
            .catch(err => {
                res.status(400).json({ msg: err.msg });
            });
    } else {
        Post.find({ tags: req.query.tags })
            .populate({
                path: 'comments',
                populate: {
                    path: 'author'
                }
            })
            .populate('author')
            .then(posts => {
                res.json(posts);
            })
            .catch(err => {
                res.status(400).json({ msg: err.msg });
            });
    }
});

// Get a specific post by ID.
postsRoutes.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        })
        .populate('author')
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});

// Create a post.
postsRoutes.route("/add").post((req, res) => {
    let newPost = new Post({
        author: ObjectID(req.user._id),
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
    });
    newPost.save()
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });

});

// Update a specific post by ID.
postsRoutes.route("/update/:id").patch((req, res) => {
    if (Post.findById(req.params.id).author == req.user._id) {
        Post.updateOne({ _id: ObjectID(req.params.id) }, {
            $set: {
                content: req.body.content,
                tags: req.body.tags
            }
        })
            .then(() => {
                res.json({ msg: "Post has been updated." });
            })
            .catch(err => {
                res.status(400).json({ msg: err.msg });
            });
    }
});

// Deleting a specific post by ID.
postsRoutes.route("/delete/:id").delete((req, res) => {
    if (Post.findById(req.params.id).author == req.user._id) {
        Post.deleteOne({ _id: ObjectID(req.params.id) })
            .then(() => {
                res.json({ msg: "Post has been deleted." });
            })
            .catch(err => {
                res.status(400).json({ msg: err.msg });
            });
    }
});

module.exports = postsRoutes;