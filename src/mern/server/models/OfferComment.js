const mongoose = require('mongoose');

const OfferCommentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('OfferComment', OfferCommentSchema);