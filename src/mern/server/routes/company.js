const express = require("express");

// companyRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const companyRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");


// This section will help you get a list of all the records.
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


// This section will help you create a new record.
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


// This section will help you update a record by id.
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


  