const express = require('express');
const mongoose = require('mongoose');
const Course = require('./../../models/Courses.js');

const Deliverable = require('./../../models/Deliverable.js');
const { ObjectId } = require('bson');
const { ObjectID } = require('bson');
const courseRouter = express.Router();

/*const defaultRes = (req, res, next) => {
    coursesModel.find({}).then(payload => {
        res.json({
            status: 200,
            payload: payload
        })
    })
}*/

//Returns all courses 
courseRouter.route("/course/courses").get((req, res) => {
    Course.find().populate('lessons').populate('assignments')
    .then(courses => {
        console.log(courses);
        res.json(courses);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ msg: err.msg });
    });
});

//Gets a course by its' Id
courseRouter.route("/course/:id").get((req, res) =>{
    Course.findById(req.params.id).populate('lessons').populate('assignments')
    .then(course =>{
        console.log(course);
        res.json(course);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ msg: err.msg});
    })
});

//Adds a new course to the possible courses
courseRouter.route("/course/add").post((req, res) => {
    
    //Creates a new Course Object
    let newCourse = new Course({
        name: req.body.name,
        desc: req.body.desc,
        lessons:[],
        assignments:[]
    });
    
    newCourse.save().then( () =>{
        res.json({ msg: "New course has been added." });
    }).catch(err => {
        
        res.status(400).json({ msg: err.msg });
    })
});

module.exports = courseRouter;