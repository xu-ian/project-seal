const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");// Load input validation
const { body ,validationResult } = require('express-validator');

const mongoose = require("mongoose");
const User = require('../models/user');


// POST for register
// Register User
// Todo: add selection of different user types
router.post("/register", [
  body('username', 'Username required').trim().isLength({ min: 4}).not().isEmpty().withMessage("The username field is mandatory"),
  body('email', 'Email required').trim().isLength({ min: 4}).normalizeEmail().isEmail().not().isEmpty().withMessage("The email field is mandatory"),
  body('password', 'Password required').trim().isLength({ min: 8}).not().isEmpty().withMessage("The password field is mandatory")
  ], (req, res) => {

    //sanitize and conform data with express-validator functions

    const errors = validationResult(req);

    //create a user object with parsed and sanitized data
    var user = new User(
        { 
            username: req.body.username,
            email: req.body.email,
            password: req.body.password 
        }
    )
    var pw = req.body.password;

    //encrypt password becore saving to database
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(pw, salt, function(err, hash){
            if(err){
                console.log();
            }
            user.password = hash;
        });
    });

    user.role = "student";

    // if all the previous pass, attempt to register
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }else {
        //If user exists, add to database, else...
        User.findOne({$or: [{email: req.body.email}, {username: req.body.username}] })
          .exec( function(err, found_user) {
              if (err) { return next(err); }
  
              if (found_user) {
                // User exists, go back to register page 
                return res.status(400).json({ email: "User already exists" });
            }
              else {
                  // User does not exist, save to database
                user.save(function (err) {
                  if (err) { return res.status(400).json({username: "failed to register"}); }
                  console.log("successfully registered");
                });
  
              }
  
            });
      }





});

//Post for login 
router.post("/login", (req, res) => {
  var username = req.body.username;
  const password = req.body.password;// Find user by email
  User.findOne({$or: [{username: req.body.email}, {username: req.body.username}] }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Incorrect info" });
    }
    
    
    
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };// Sign token
        jwt.sign(payload,keys.secret,
          {
            expiresIn: 31556926/2 // half a year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
            console.log("Login Success");
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Incorrect info" });
      }
    });
  });
});



module.exports = router;