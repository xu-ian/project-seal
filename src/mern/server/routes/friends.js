const express = require("express");
const userProfilesRoutes = express.Router();
//Connect to the database
const dbo = require("../db/conn");
const User = require('../models/user');

/* This page is the page for requesting the friends, friend requests sent, and friend requests recieved  */


/* The axois method */
// Get friends Profile List. This shouldn't be here
userProfilesRoutes.route("/").get(function (req, res) {import React, { Component } from "react";

  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get User friends List by id.
userProfilesRoutes.route("/view/:id").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { id: req.body.id };
  db_connect
    .collection("users")
    .find({myquery})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});



// Update friends by id.
userProfilesRoutes.route("/update/:id").post(function (req, res) {
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


module.exports = userProfilesRoutes;


