const { ObjectID } = require('bson');
const { json } = require('express');

const express = require('express');
const mongoose = require('mongoose');
const Enrolled = require('../models/Enrolled');
const enrollRoutes = express.Router();
const Course = require('../models/Courses');
const User = require('../models/user');

//Gets all courses a user has registered in
enrollRoutes.route("/getCourses/:sid").get((req, res) => {
    Enrolled.findOne({"user":req.params.sid}).populate("courses").then(enrol =>{
        console.log(enrol);
        res.json(enrol);
    }).catch(err =>{
        console.log(err);
        res.status(400).json({ msg: err.msg });
    })
});

//Adds a course to a user's courses
enrollRoutes.route("/add/:sid/:cid").post((req, res) => {
    Enrolled.findOne({"user":req.params.sid}).then(enrol =>{
        enrol.courses.push(req.params.cid);
        enrol.save();
        res.json({ msg: "You have successfully enrolled." });
    }).catch(err =>{
        let newEnrollment = new Enrolled({
            user:req.params.sid,
            courses:[req.params.cid]
        });
        newEnrollment.save().then(after =>{
            res.json({ msg: "You have successfully enrolled."});
        }).catch(err =>{
            res.status(400).json({ msg: err.msg });
        })
    })
});

//Removes a course from a user's courses
enrollRoutes.route("/remove/:sid/:cid").post((req, res) =>{
    Enrolled.findOne({"user":req.params.sid}).then(enrol => {
        enrol.courses.pull(req.params.cid);
        enrol.save();
        res.status(200).json({msg: "Successfully unenrolled!"});
    }).catch(err =>{
        res.status(400).json({msg: err.msg});
    })
})

module.exports = enrollRoutes;