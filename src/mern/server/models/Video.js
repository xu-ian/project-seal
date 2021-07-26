const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    title: {
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
        type: String,
        required: true
    },
    lesson: {
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