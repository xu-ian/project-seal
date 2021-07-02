const mongoose = require('mongoose');

const DeliverableSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	duedate: {
		type: Date,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	attachments: {
		type: Array,
	}
});

module.exports = mongoose.model('contentStream', DeliverableSchema);