const express = require("express");
const searchRoutes = express.Router();

const mongoose = require("mongoose");
const Company = require('../models/Company');

// Route for Initial state
searchRoutes.route('/listcompanies').get((req, res) => {
  // Get 15 companies information 
  Company.find({}, {company_title:1, tagline:1, logo:1}, {limit: 15}).then(companies => {
    res.json(companies);

  }).catch(err => {
    res.status(400).json({ msg: err.msg });
  })
});


module.exports = searchRoutes;