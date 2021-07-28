const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    lesson: {
        // NOTE: Needs to refer to Lesson schema but it does not exist yet
        //       String will be temp placeholder
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', VideoSchema);