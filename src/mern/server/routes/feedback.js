const express = require('express');
const { ObjectID } = require('bson');
const mongoose = require("mongoose");
const feedbackRoutes = express.Router();
const Feedback = require('../models/Feedback');
const Deliverable = require('../models/Deliverable');

// get all the feed back
feedbackRoutes.route("/").get((req,res) =>{
	Feedback.find({})
			.then(feedback => {
				res.json(feedback);
			})
			.catch(err => {
				res.status(400).json({ msg: err.msg });
			})
})

// get the feedback with specific deliverable id
feedbackRoutes.route("/:deliverableID").get((req,res) =>{
	Feedback.findOne({deliverable: req.params.deliverableID})
			.populate('instructor', 'username')
			.then(feedback => {
				res.json(feedback);
			})
			.catch(err => {
				res.status(400).json({ msg: err.msg });
			})
})

// // Update feedback
// feedbackRoutes.route("/update/:id").post((req, res) => {
// 	let newFeedback = new Feedback({
// 		instructor: req.body.instructor,
// 		deliverable: req.body.deliverable,
// 		feedback: req.body.feedback
// 	});

//   newFeedback.save()
// })

// Create a feedback
feedbackRoutes.route("/add/:deliverableID/:instructorID").post((req, res) => {
  let newFeedback = new Feedback({
    // instructor: req.body.instructor,
    instructor: ObjectID(req.params.instructorID),
    deliverable: ObjectID(req.params.deliverableID),
    comment: req.body.comment,
  });

  console.log(newFeedback);

  newFeedback.save().then(feedback => {
    res.status(201).json(feedback);
    })
    .catch(err => {
      res.status(400).json({ msg: err.msg });
    });
});

module.exports = feedbackRoutes;

