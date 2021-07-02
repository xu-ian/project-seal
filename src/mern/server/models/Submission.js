const mongoose = require('mongoose');

const SubmissionSchema = mongoose.Schema({
    name: {
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
    assignment: {
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

module.exports = mongoose.model('Deliverable', SubmissionSchema);