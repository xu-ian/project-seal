const express = require("express");
const companyRoutes = express.Router();
//Connect to the database
const dbo = require("../db/conn");
var ObjectID = require('mongodb').ObjectID;
const User = require('../models/user');

// const { ObjectID } = require('bson');
// const { json } = require('express');
// const mongoose = require('mongoose');
// const Company = require('../models/Company'); 


/* The axois method */
// Get Company Profile List.
companyRoutes.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("companys")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get Company Profile List by id.
companyRoutes.route("/view/:id").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { id: req.body.id };
  db_connect
    .collection("companys")
    .find({myquery})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


// Create Company Profile.
companyRoutes.route("/create").post(function (req, res) {
    let db_connect = dbo.getDb("employees");
    //gotta check for company names
    if (!req.body.company_title){
      res.status(400).json({ msg: "no name given"});
    }
    let myobj = {
      company_title: req.body.company_title,
      tagline: req.body.tagline,
      description: req.body.description,
      emailAddress: req.body.emailAddress,
      logo: req.body.logo,
      links: req.body.links,
      members: req.body.members,
    };
    db_connect.collection("companys").insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
    console.log(req.body.user_id);
    console.log(myobj._id);
    User.updateOne({_id: req.body.user_id}, {
      $addToSet: 
        {companies: myobj._id,}
    }).catch(err => {
      console.log("can't find user!")
      res.status(400).json({ msg: err.msg });
    });
    res.status(200).json({ msg: "its good"});
});


// Update Company Profile by id.
companyRoutes.route("/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { _id: ObjectID(req.body.company_id) };
    // console.log("the update id is: " + req.body.company_id);
    // Kame Yu department stores	


  let newvalues = {
    $set: {
      company_title: req.body.company_title,
      tagline: req.body.tagline,
      description: req.body.description,
      emailAddress: req.body.emailAddress,
      logo: req.body.logo,
      links: req.body.links,
      members: req.body.members,
    },
  };
  db_connect
    .collection("companys")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});


module.exports = companyRoutes;


