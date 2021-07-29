var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema(
    {
        name: {type:String, required:true},
        desc: {type:String, required:true},
        lessons:[{type:mongoose.Schema.Types.ObjectId, ref:'lessfolder'}],
        assignments:[{type:mongoose.Schema.Types.ObjectId, ref:'assfolder'}]
    }
)

module.exports = mongoose.model('courses', CourseSchema);