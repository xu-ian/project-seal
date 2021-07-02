const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Courses = new Schema(
  {
    name: {type: String, required: true},
    desc: {type: String, required: true, default: ''}
  }
);

module.exports = mongoose.model('Courses', Courses);
