const express = require("express");
const friendsRoutes = express.Router();
//Connect to the database
const dbo = require("../db/conn");
const Friends = require("../models/friends");
const User = require('../models/user');

/* This page is the page for requesting the friends, friend requests sent, and friend requests recieved  */


/* The axois method */
// Get User friends List by id.
friendsRoutes.route("/view/:id").get((req, res) => {
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
  let db_connect = dbo.getDb("employees");
  let myquery = { id: req.body.id };
  let newvalues = {
    $set: {

    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});

// accept friend request
friendsRoutes.route("/accept/:id").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { id: req.body.id };
  let newvalues = {
    $set: {

    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});


// remove friends
friendsRoutes.route("/remove/:id").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { id: req.body.id };
  let newvalues = {
    $set: {

    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});


module.exports = friendsRoutes;


