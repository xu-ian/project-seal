const express = require("express");
const searchRoutes = express.Router();

const mongoose = require("mongoose");
const Company = require('../models/Company');

// Route for Initial state for company search
searchRoutes.route('/listcompanies').get((req, res) => {
  // Get 15 companies information 
  Company.find({}, {company_title:1, tagline:1, logo:1}).then(companies => {
    res.json(companies);

  }).catch(err => {
    res.status(400).json({ msg: err.msg });
  })
});

//  Company.find({}, {company_title:1, tagline:1, logo:1}, {limit: 15}).then(companies => {


// For search input by name
searchRoutes.route('/:name').get((req, res) => {
  let name = new RegExp(req.params.name, 'i');
  // Get maximum 15 companies which company_title contains "name" as substring.
  Company.find({company_title : name}, {company_title:1, tagline:1, logo:1}, {limit: 15}).then(companies => {
    res.json(companies);

  }).catch(err => {
    res.status(400).json({ msg: err.msg });
  })
});


module.exports = searchRoutes;
