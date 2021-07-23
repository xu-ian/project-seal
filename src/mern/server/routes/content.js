const express = require('express');
const Deliverable = require('../models/Deliverable');
const contentRoutes = express.Router();
const Course = require('../models/Courses');

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
contentRoutes.route("/add/:id").post((req, res) => {
	let newContent = new Deliverable({
		name: req.body.name,
		duedate: req.body.duedate,
		description: req.body.description,
		attachments: req.body.attachments,
	});
	console.log(newContent)
	console.log(req.body)
	newContent.save()
		.then(content => {
			Course.findById(req.params.id).then( course => {
				course.assignments.push(newContent);
				course.save();
				console.log('Assignment Successful')
				res.status(201).json(content);
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