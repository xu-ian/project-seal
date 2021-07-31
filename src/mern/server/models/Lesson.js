const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	course: {
		type: String,
		required: true
	},
	video_id:{
		type: String,
	},
	description:{
		type: String,
	},
});

module.exports = mongoose.model('Lesson', LessonSchema, 'lessons');