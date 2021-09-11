const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({

    comment: {
      type: String,
      required: true
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // type: String,
      required: true
    },

    deliverable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'content',
      // type: String,
      required: true
    },

}, { 
    timestamps: true
});

module.exports = mongoose.model('Feedback', FeedbackSchema);