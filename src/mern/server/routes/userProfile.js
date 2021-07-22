const express = require("express");
const userProfilesRoutes = express.Router();
//Connect to the database
const dbo = require("../db/conn");
const User = require('../models/user');
var ObjectID = require('mongodb').ObjectID;

/* The axois method */
// Get User Profile List.
userProfilesRoutes.route("/").get(function (req, res) {
	try{
		if(req.query.id === undefined){
			//Get list of users
			let db_connect = dbo.getDb("employees");
			db_connect
			.collection("users")
			.find({})
			.toArray(function (err, result) {
				if (err) throw err;
				res.json(result);
			});
		}else{
			//Find specifc user by id
			//console.log(req.query.id);
			User.findById(req.query.id).then(profile => {
				res.json(profile);
			}).catch(err => {
				err.status(400).json({msg: err_msg})
			})
		}
	}catch{
		//Get list of users
		let db_connect = dbo.getDb("employees");
		db_connect
			.collection("users")
			.find({})
			.toArray(function (err, result) {
				if (err) throw err;
				res.json(result);
		});
	}
});

// Get User Profile List by id.
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


// Create User Profile.
userProfilesRoutes.route("/create").post(function (req, res) {
    let db_connect = dbo.getDb("users");
    let myobj = {
      user_id: req.body.user_id,
      username: req.body.username,
      userbio: req.body.userbio,
      gender: req.body.gender,
      email: req.body.email,
      links: req.body.links,
      belongingCompany: req.body.belongingCompany,
      position: req.body.position,
      profileImage: req.body.profileImage,
      backgroundImage: req.body.backgroundImage,

    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
});


// Update User Profiles by id.
userProfilesRoutes.route("/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { _id: ObjectID(req.body.user_id) };
  // console.log("the update id is: " + req.body.username);

  let newvalues = {
    $set: {
      user_id: req.body.user_id,
      username: req.body.username,
      userbio: req.body.userbio,
      gender: req.body.gender,
      email: req.body.email,
      links: req.body.links,
      belongingCompany: req.body.belongingCompany,
      position: req.body.position,
      profileImage: req.body.profileImage,
      backgroundImage: req.body.backgroundImage,
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("the data are: " + newvalues.userbio);
      // console.log("the update id is: " + JSON.stringify(myquery._id));

      //wrong:    60e76a9c685bb537b82973b7
      //correct:  60ea82cced045009c3f074e8
      console.log("1 document updated");
    });
});


module.exports = userProfilesRoutes;


