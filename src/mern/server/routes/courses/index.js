const express = require('express');
const mongoose = require('mongoose');
const Course = require('./../../models/Courses.js');

const Deliverable = require('./../../models/Deliverable.js');
const { ObjectId } = require('bson');
const { ObjectID } = require('bson');
const courseRouter = express.Router();
const AFolder = require('../../models/AssignmentFolder');
const LFolder = require('../../models/LessonFolder');

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
    Course.find().populate({
        path: 'lessons',
        /*populate: {
            path: 'lessons'
        }*/
    }).populate({
        path: 'assignments',
        populate: {
            path: 'assignments'
        }
    }).then(courses => {
        console.log(courses);
        if(Array.isArray(courses)){
            res.json(courses);
        }
        else{
            res.json([courses]);
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json({ msg: err.msg });
    });
});

//Gets a course by its' Id
courseRouter.route("/course/:id").get((req, res) =>{
    Course.findById(req.params.id).populate({
        path: 'lessons',
        /*populate: {
            path: 'lessons'
        }*/
    }).populate({
        path: 'assignments',
        populate: {
            path: 'assignments'
        }
    })
    .then(course =>{
        console.log(course);
        res.json(course);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ msg: err.msg});
    })
});

//Adding an assignment folder to a course
courseRouter.route("/course/addafolder/:id/:fname").post((req, res) =>{
	let newFolder = new AFolder({
		name:req.params.fname,
		assignments:[]
	});
	newFolder.save().then(content => {
		Course.findById(req.params.id).then(course => {
			course.assignments.push(newFolder);
			course.save();
			console.log('Folder Created Successfully');
			res.status(201).json(content);
		}).catch(err =>{
			res.stats(400).json({msg:err.msg});
		});
	});
});

//Deleting an assignment folder from a course
courseRouter.route("/course/removeafolder/:id/:fid").post((req, res) =>{
    AFolder.findByIdAndDelete(req.params.fid).then(out =>{
        Course.findByIdAndUpdate(req.params.id, {
            $pull: {
                assignments: req.params.fid
            }}).then(done => {
                console.log('Folder Deleted Successfully');
                res.status(201);
            }).catch(err =>{
                res.status(400).json({msg:err.msg});
            });
        }).catch(err =>{
            res.status(400).json({msg:err.msg});
        });
    });

//Adding a lessons folder to a course
courseRouter.route('/course/addlfolder/:id/:fname').post((req, res) => {
    let newFolder = LFolder({
        name:req.params.fname,
        lessons:[]
    })
    newFolder.save().then(content => {
		Course.findById(req.params.id).then(course => {
			course.lessons.push(newFolder);
			course.save();
			console.log('Folder Created Successfully');
			res.status(201).json(content);
		}).catch(err =>{
			res.stats(400).json({msg:err.msg});
		});
	});
});

//Deleting an lessons folder from a course
courseRouter.route("/course/removelfolder/:id/:fid").post((req, res) => {
    LFolder.findByIdAndDelete(req.params.fid).then(out =>{
        Course.findByIdAndUpdate(req.params.id, {
            $pull: {
                lessons: req.params.fid
        }}).then(done => {
                console.log('Folder Deleted Successfully');
                res.status(201);
        }).catch(err =>{
                res.status(400).json({msg:err.msg});
        });
    }).catch(err =>{
        res.status(400).json({msg:err.msg});
    });
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