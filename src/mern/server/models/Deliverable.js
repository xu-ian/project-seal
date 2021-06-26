const mongoose = require('mongoose');

const DeliverableSchema = mongoose.Schema({
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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Deliverable', DeliverableSchema);