const express = require('express');
const mongoose = require('mongoose');
const Relation = require('../models/Relation'); 
const Message = require('../models/Message');
const User = require('../models/user');
const { ObjectID } = require('bson');
const { ObjectId } = require('bson');
const { json } = require('express');
const postsRoutes = require('./posts');
const messagesRoutes = express.Router();

// Getting conversation
messagesRoutes.route("/messages/getMessages/:mid/:uid").get((req, res) => {
    Relation.find({relation:[req.params.mid, req.params.uid]})
        .populate("conversation")
        .select("-content -_id -__v")
        .then(comments => {
            if(comments.length > 0){
            if(comments.length == 0){
                res.json(comments);
            }
            else{
                res.json(comments[0]);
            }
            }
            else {
                Relation.find({relation:[req.params.uid, req.params.mid]})
        .populate("conversation")
        .select("-content -_id -__v")
        .then(comments => {
            if(comments.length == 0){
                res.json(comments);
            }
            else{
                res.json(comments[0]);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: err.msg });
        });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: err.msg });
        });
});

//Getting username of a user from their id
messagesRoutes.route("/messages/username/:id").get((req, res) => {
    User.findById(req.params.id)
        .then(user =>{
            res.json(user.username)
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});

// Getting message by message ID
messagesRoutes.route("/messages/specific/:id").get((req, res) => {
    Message.findById(req.params.id)
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});   

// Adding a message to conversation
messagesRoutes.route("/messages/addMessage/:body/:mid/:uid").post((req, res) => {
    let newComment = new Message({
        content: req.params.body,
        author: req.params.mid
    });

    newComment.save()
              .then(() => {
                Relation.find({relation:[req.params.mid, req.params.uid]})
                    .then(post => {
                        if(post.length > 0){
                            post[0].conversation.push(newComment);
                            post[0].save();
                            res.json({ msg: "New message has been added." });
                        }
                        else{
                            Relation.find({relation:[req.params.uid, req.params.mid]})
                                .then(post => {
                                    console.log(post);
                                    post[0].conversation.push(newComment);
                                    post[0].save();
                                    res.json({ msg: "New message has been added." });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(404).json({msg:err.msg});
                                });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(404).json({ msg: err.msg });
                    });
              })
              .catch(err => {
                    console.log(err);
                    res.status(400).json({ msg: err.msg });
              });
        
});

// Updating a message
messagesRoutes.route("/messages/updateMessage/:id/:body").post((req, res) => {
    Message.findById(req.params.id)
        .then(
            Message.updateOne({ _id: ObjectId(req.params.id) }, {
                $set: {
                    content: req.params.body
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

module.exports = messagesRoutes;