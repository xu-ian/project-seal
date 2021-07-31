const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
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
    // tags: [{
    //     type: String
    // }],
    offercomments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OfferComment'
    }]
}, { 
    timestamps: true
});

module.exports = mongoose.model('Offer', OfferSchema);