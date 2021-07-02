const express = require('express');
const Content = require('../models/Deliverable');
const contentRoutes = express.Router();

contentRoutes.route("/").get((req,res) =>{
	Content.find({})
			.then(stream => {
				res.json(stream);
				console.log(stream)
			})
			.catch(err => {
				res.status(400).json({ msg: err.msg });
			})
})

contentRoutes.route("/add").post((req, res) => {
	let newContent = new Post({
		name: req.body.name,
		duedate: req.body.duedate,
		description: req.body.description,
		attachments: req.body.attachments,
	})
	console.log('Assignment Successful')
	newContent.save()
		.then(post => {
				res.status(201).json(post);
		})
		.catch(err => {
				res.status(400).json({ msg: err.msg });
		});
})

module.exports = contentRoutes;