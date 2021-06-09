const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");// Load input validation


const mongoose = require("mongoose");
const User = require('../models/user');


// POST for register
// Register User
// Todo: add selection of different user types
router.post("register", (req, res) => {

    //sanitize and conform data with express-validator functions
    body('username', 'Username required').trim().isLength({ min: 4}).escape(),
    body('email', 'Email required').trim().isLength({ min: 4}).normalizeEmail().isEmail().escape(),
    body('password', 'Password required').trim().isLength({ min: 8}).escape(),
    body('passwordagain', 'Password required').trim().isLength({ min: 8}).equals('password').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        //create a user object with parsed and sanitized data
        var user = new User(
            { 
                username: req.body.username,
                email: req.body.email,
                password: req.body.password 
            }
        )
        

        //encrypt password becore saving to database
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                user.password = hash;
            });
        });


        // if all the previous pass, attempt to register
        if (!errors.isEmpty()) {
            res.render('register',  { title: 'Create User', user: user, errors: errors.array()});
        }else {
            //If user exists, add to database, else...
            User.findOne({$or: [{email: req.body.email}, {username: req.body.username}] })
              .exec( function(err, found_user) {
                 if (err) { return next(err); }
      
                 if (found_user) {
                   // User exists, go back to register page 
                    res.render('register',  { title: 'Register', user: user, errors: errors.array()});
                    return;
                }
                 else {
                     // User does not exist, save to database
                   user.save(function (err) {
                     if (err) { return next(err); }
                     res.redirect("/catalog");
                   });
      
                 }
      
               });
          }

    }


});

//Post for login 
router.post("/login", (req, res) => {

    const password = req.body.password;// Find user by email
    User.findOne({ email }).then(user => {
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