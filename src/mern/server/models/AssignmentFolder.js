var mongoose = require('mongoose');

var AFolderSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        assignments:[{type:mongoose.Schema.Types.ObjectId, ref:'Content'}]
    }
)

module.exports = mongoose.model('assfolder',AFolderSchema);