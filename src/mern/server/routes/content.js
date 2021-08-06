const express = require('express');
const Deliverable = require('../models/Deliverable');
const contentRoutes = express.Router();
const Course = require('../models/Courses');
const AFolder = require('../models/AssignmentFolder');

contentRoutes.route("/").get((req,res) =>{
	Deliverable.find({})
			.then(deliverables => {
				res.json(deliverables);
			})
			.catch(err => {
				res.status(400).json({ msg: err.msg });
			})
})

//Gets an assignment by its' Id
contentRoutes.route("/:id").get((req, res) =>{
	Deliverable.findById(req.params.id).then(assignment => {
		console.log(assignment);
		res.json(assignment);
	})
	.catch(err => {
		res.status(400).json({ msg: err.msg });
	});
});

//Modifying
contentRoutes.route("/add/:id/:fid").post((req, res) => {
	let newContent = new Deliverable({
		name: req.body.name,
		duedate: req.body.duedate,
		description: req.body.description,
		attachments: req.body.attachments,
		mandatory: req.body.mandatory,
	});
	newContent.save()
		.then(content => {
			Course.findById(req.params.id).populate('assignments').then( course => {
				for(let i = 0; i < course.assignments.length; i++){
					if(course.assignments[i]._id == req.params.fid){
						AFolder.findById(req.params.fid).then(assignments =>{
							console.log(assignments);
							assignments.assignments.push(newContent);
							assignments.save();
							res.status(201).json(content);
						})
					}
				}
			})
			.catch( err => {
				res.status(400).json({ msg: err.msg });
				console.log('Assignment Unsuccessful')
			})
		})
		.catch(err => {
			res.status(400).json({ msg: err.msg });
			console.log('Assignment Unsuccessful')
		});
})

module.exports = contentRoutes;