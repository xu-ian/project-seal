const express = require("express");
const companyRoutes = express.Router();
//Connect to the database
const dbo = require("../db/conn");


// Get Company Profile List.
companyRoutes.route("/company-profile").get(function (req, res) {
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
companyRoutes.route("/company-profile/:id").get(function (req, res) {
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
companyRoutes.route("/company-profile/create").post(function (req, res) {
    let db_connect = dbo.getDb("employees");
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
});


// Update Company Profile by id.
companyRoutes.route("/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let myquery = { id: req.body.id };
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


  