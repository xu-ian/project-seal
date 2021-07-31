var mongoose = require('mongoose');

var LFolderSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        lessons:[{type:mongoose.Schema.Types.ObjectId/*, DOES NOT EXIST, DO NOT UNCOMMENT ref:'Lessons'*/}]
    }
)

module.exports = mongoose.model('lessfolder',LFolderSchema);