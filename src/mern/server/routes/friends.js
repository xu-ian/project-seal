const express = require("express");
const friendsRoutes = express.Router();
//Connect to the database
const dbo = require("../db/conn");
const Friends = require("../models/friends");
const User = require('../models/user');
const { ObjectId } = require('bson');
/* This page is the page for requesting the friends, friend requests sent, and friend requests recieved  */


/* The axois method */
// Get User friends List by id.
friendsRoutes.route("/view/:id").get((req, res) => {
  //I'll grab both user's friend lists
  var friendlist = [];
  var friendrequestsent = [];
  var friendrequestrecieved = [];
  User.findById(req.params.id)
  .then(user =>{
      Friends.findById(user.friends)
      .then(friends=>{
        friendlist = friends.friends;
        friendrequestsent = friends.friendrequestsent;
        friendrequestrecieved = friends.friendrequestrecieved;

        //sent info is here, 
        res.json({
          friends: friendlist, 
          friendrequestsent: friendrequestsent,
          friendrequestrecieved: friendrequestrecieved
        })
      })
  })
  .catch(err => {
      res.status(400).json({ msg: err.msg });
  });
});


// send friend request
friendsRoutes.route("/add/:id").post(function (req, res) {
  //I want to do two things: 
  // add the request to the sender's sent box, and 
  // add the request to the reciever's received box
  User.findById(req.params.id)
    .then(user =>{
         Friends.findById(user.friends)
          .then(friends=>{
            //update user's friend request list with outgoing to user B
            Friends.updateOne({_id: ObjectId(user.friends)}, {
              $addToSet: {
                friendrequestrecieved: req.body.user_id
              }
            })
            //sent info is here, 
              .then(() => {
                //sent friend requests B->A
                User.findById(req.body.user_id)
                  .then(user =>{
                      Friends.findById(user.friends)
                        .then(friends=>{
                          //update user's friend request list with outgoing to user B
                          Friends.updateOne({_id: ObjectId(user.friends)}, {
                            $addToSet: 
                              {friendrequestsent: req.params.id,}
                          })
                          //sent info is here, 
                            .then(() => {
                              res.json({
                                msg: " Friend request added A->B + Friend request recieved A->B"
                              })
                            })
                          })
                  })
                  .catch(err => {
                      res.status(400).json({ msg: err.msg });
                  });
              })
          })
          .catch(err => {
            console.log("caught here2")
            res.status(400).json({ msg: err.msg });
          });
    })
    .catch(err => {
        res.status(400).json({ msg: err.msg });
    });


});

// accept friend request
friendsRoutes.route("/accept/:id").post(function (req, res) {
  //I want to do many things:
  // add the friend to both user's friend lists
  // remove both requests from their respective lists
  User.findById(req.params.id)
  .then(user =>{
       Friends.findById(user.friends)
        .then(friends=>{
          //update user's friend  list with outgoing to user B
          Friends.updateOne({_id: ObjectId(user.friends)}, {
            $addToSet: {
              friends: req.body.user_id
            },
            $pull:{
              friendrequestsent: req.body.user_id
            }
          })
          //sent info is here, 
            .then(() => {
              //accept requests B->A
              User.findById(req.body.user_id)
                .then(user =>{
                    Friends.findById(user.friends)
                      .then(friends=>{
                        //update user's friend request list with outgoing to user B
                        Friends.updateOne({_id: ObjectId(user.friends)}, {
                          $addToSet: {
                            friends: req.params.id,
                            },
                          $pull:{
                            friendrequestrecieved: req.params.id,
                          }
                        })
                        //sent info is here, 
                          .then(() => {
                            res.json({
                              msg: " Friend accepted"
                            })
                          })
                        })
                })
                .catch(err => {
                    res.status(400).json({ msg: err.msg });
                });
            })
        })
        .catch(err => {
          res.status(400).json({ msg: err.msg });
        });
  })
  .catch(err => {
      res.status(400).json({ msg: err.msg });
  });


});


// reject friend request
friendsRoutes.route("/reject/:id").post(function (req, res) {
  //I want to do:
  // remove both requests from their respective lists
  User.findById(req.params.id)
  .then(user =>{
       Friends.findById(user.friends)
        .then(friends=>{
          //update user's friend  list with outgoing to user B
          Friends.updateOne({_id: ObjectId(user.friends)}, {
            $pull:{
              friendrequestsent: req.body.user_id
            }
          })
          //sent info is here, 
            .then(() => {
              //reject requests B->A
              User.findById(req.body.user_id)
                .then(user =>{
                    Friends.findById(user.friends)
                      .then(friends=>{
                        //update user's friend request list with outgoing to user B
                        Friends.updateOne({_id: ObjectId(user.friends)}, {
                          $pull:{
                            friendrequestrecieved: req.params.id,
                          }
                        })
                        //sent info is here, 
                          .then(() => {
                            res.json({
                              msg: " Friend rejected"
                            })
                          })
                        })
                })
                .catch(err => {
                    res.status(400).json({ msg: err.msg });
                });
            })
        })
        .catch(err => {
          res.status(400).json({ msg: err.msg });
        });
  })
  .catch(err => {
      res.status(400).json({ msg: err.msg });
  });


});


// nullify outgoing friend request
friendsRoutes.route("/nullify/:id").post(function (req, res) {
  //I want to do:
  // remove both requests from their respective lists
  User.findById(req.body.user_id)
  .then(user =>{
       Friends.findById(user.friends)
        .then(friends=>{
          //update user's friend  list with outgoing to user B
          Friends.updateOne({_id: ObjectId(user.friends)}, {
            $pull:{
              friendrequestsent: req.params.id
            }
          })
          //sent info is here, 
            .then(() => {
              //reject requests B->A
              User.findById(req.params.id)
                .then(user =>{
                    Friends.findById(user.friends)
                      .then(friends=>{
                        //update user's friend request list with outgoing to user B
                        Friends.updateOne({_id: ObjectId(user.friends)}, {
                          $pull:{
                            friendrequestrecieved: req.body.user_id,
                          }
                        })
                        //sent info is here, 
                          .then(() => {
                            res.json({
                              msg: " Friend rejected"
                            })
                          })
                        })
                })
                .catch(err => {
                    res.status(400).json({ msg: err.msg });
                });
            })
        })
        .catch(err => {
          res.status(400).json({ msg: err.msg });
        });
  })
  .catch(err => {
      res.status(400).json({ msg: err.msg });
  });


});

// remove friends
friendsRoutes.route("/remove/:id").post(function (req, res) {
  //I want to remove friend from both user's friend lists
  User.findById(req.params.id)
  .then(user =>{
       Friends.findById(user.friends)
        .then(friends=>{
          //update user's friend  list with outgoing to user B
          Friends.updateOne({_id: ObjectId(user.friends)}, {
            $pull: {
              friends: req.body.user_id
            },
          })
          //sent info is here, 
            .then(() => {
              //remove friend B->A
              User.findById(req.body.user_id)
                .then(user =>{
                    Friends.findById(user.friends)
                      .then(friends=>{
                        //remove the other way
                        Friends.updateOne({_id: ObjectId(user.friends)}, {
                          $pull: {
                            friends: req.params.id,
                            },
                        })
                        //sent info is here, 
                          .then(() => {
                            res.json({
                              msg: " Friend removed"
                            })
                          })
                        })
                })
                .catch(err => {
                    res.status(400).json({ msg: err.msg });
                });
            })
        })
        .catch(err => {
          res.status(400).json({ msg: err.msg });
        });
  })
  .catch(err => {
      res.status(400).json({ msg: err.msg });
  });
});


module.exports = friendsRoutes;


