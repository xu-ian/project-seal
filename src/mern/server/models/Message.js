const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Message', MessageSchema);