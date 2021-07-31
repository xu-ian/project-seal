const mongoose = require('mongoose');

const EnrolledSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    }]
});

module.exports = mongoose.model('Enrolled', EnrolledSchema);