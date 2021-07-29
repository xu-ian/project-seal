const express = require('express');
const Event = require('../models/Event');
const EventRoutes = express.Router();

EventRoutes.route("/").get((req,res) =>{
	Event.find({"$and":[
				{"date":{"$lt":req.query.b_date, "$gte":req.query.a_date}}
				, {"$or":[{"user_id":req.query.id},{"course":req.query.courses_list}]}
			]})
			.sort({date:1})
			.then(events => {	
				res.json(events);
			})
			.catch(err => {
				res.status(400).json({ msg: err.msg });
			})
})

EventRoutes.route("/add").post((req, res) => {
	let newEvent = new Event({
		name: req.body.name,
		date: req.body.date,
		course: req.body.course,
		user_id: req.body.user_id,
		zoom_url: req.body.zoom_url,
	});
	console.log(1,newEvent)
	console.log(2,req.body)
	newEvent.save()
		.then(event => {
			console.log('Event Successfully Added')
			res.status(201).json(event);
		})
		.catch(err => {
			res.status(400).json({ msg: err.msg });
			console.log('Event Not Added')
		});
})
module.exports = EventRoutes;