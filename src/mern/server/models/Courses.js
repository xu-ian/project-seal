var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema(
    {
        name: {type:String, required:true},
        desc: {type:String, required:true},
        lessons:[{type:mongoose.Schema.Types.ObjectId, ref:'lessons'}],
        assignments:[{type:mongoose.Schema.Types.ObjectId, ref:'Content'}]
    }
)

module.exports = mongoose.model('courses', CourseSchema);