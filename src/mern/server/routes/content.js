const express = require('express');
const Deliverable = require('../models/Deliverable');
const contentRoutes = express.Router();

contentRoutes.route("/").get((req,res) =>{
	Deliverable.find({})
			.then(deliverables => {
				res.json(deliverables);
			})
			.catch(err => {
				res.status(400).json({ msg: err.msg });
			})
})

contentRoutes.route("/add").post((req, res) => {
	let newContent = new Deliverable({
		name: req.body.name,
		duedate: req.body.duedate,
		description: req.body.description,
		attachments: req.body.attachments,
		mandatory: req.body.mandatory,
	});
	console.log(newContent)
	console.log(req.body)
	newContent.save()
		.then(content => {
			console.log('Assignment Successful')
			res.status(201).json(content);
		})
		.catch(err => {
			res.status(400).json({ msg: err.msg });
			console.log('Assignment Unsuccessful')
		});
})

module.exports = contentRoutes;