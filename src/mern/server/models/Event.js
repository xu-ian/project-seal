const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	course: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		required: true
	},
		zoom_url: {
		type: String,
	}
});

module.exports = mongoose.model('Event', EventSchema, 'events');
