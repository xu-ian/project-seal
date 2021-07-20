const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { 
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);