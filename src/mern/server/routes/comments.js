const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post'); 
const Comment = require('../models/Comment');
const { ObjectID } = require('bson');
const { ObjectId } = require('bson');
const postsRoutes = require('./posts');
const commentsRoutes = express.Router();

// Getting comments from a post
commentsRoutes.route("/posts/:id/comments").get((req, res) => {
    Post.findById(req.params.id)
        .populate("comments")
        .select("-tags -content -createdAt -updatedAt -_id -author -title -__v")
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});

// Get a specific comment
commentsRoutes.route("/posts/:postId/comments/:commentId").get((req, res) => {
    Post.findById(req.params.postId)
        .then(
            Comment.findById(req.params.commentId)
                   .then(comment => {
                       res.json(comment);
                   })
                   .catch(err => {
                       res.status(400).json({ msg: err.msg });
                   })
        );
});

// Adding a comment
commentsRoutes.route("/posts/:id/comments/add").post((req, res) => {
    let newComment = new Comment({
        author: req.body.author,
        content: req.body.content
    });

    newComment.save()
              .then(() => {
                Post.findById(req.params.id)
                    .then(post => {
                        post.comments.push(newComment);
                        post.save();
                        res.json({ msg: "New comment has been added." });
                    })
                    .catch(err => {
                        res.status(404).json({ msg: err.msg });
                    });
              })
              .catch(err => {
                    res.status(400).json({ msg: err.msg });
              });
        
});

// Updating a comment
commentsRoutes.route("/posts/:postId/comments/update/:commentId").patch((req, res) => {
    Post.findById(req.params.postId)
        .then(
            Comment.updateOne({ _id: ObjectId(req.params.commentId) }, {
                $set: {
                    content: req.body.content
                }
            })
                   .then(() => {
                       res.json({ msg: "Comment has been updated." });
                   })
                   .catch(err => {
                       res.status(400).json({ msg: err.msg });
                   })
        )
        .catch(err => {
            res.status(404).json({ msg: err.msg });
        }) 
});

// Deleting a comment
commentsRoutes.route("/posts/:postId/comments/delete/:commentId").delete((req, res) => {
     Comment.deleteOne({ _id: ObjectId(req.params.commentId) })
           .then(() => {
               res.json({ msg: "Comment has been deleted." });
           })
           .catch(err => {
               res.status(400).json({ msg: err.msg });
           });  
     Post.findByIdAndUpdate(req.params.id, {
        $pull: {
            comments: req.params.commentId
        }
    })
        .then((post) => {
            post.save();
            res.json({ msg: "Comment has been deleted." });
        })
        .catch(err => {
            res.json({ msg: err.msg });
        }); 
});

module.exports = commentsRoutes;