const express = require("express");
const userProfilesRoutes = express.Router();
//Connect to the database
const dbo = require("../db/conn");


/* The axois method */
// Get User Profile List.
userProfilesRoutes.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("userProfiles")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get User Profile List by id.
userProfilesRoutes.route("/view/:id").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { id: req.body.id };
  db_connect
    .collection("userProfiles")
    .find({myquery})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


// Create User Profile.
userProfilesRoutes.route("/create").post(function (req, res) {
    let db_connect = dbo.getDb("userProfiles");
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
    db_connect.collection("userProfiles").insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
});


// Update User Profiles by id.
userProfilesRoutes.route("/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { id: req.body.id };
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
    .collection("userProfiles")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});


module.exports = userProfilesRoutes;


