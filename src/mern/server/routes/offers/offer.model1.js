const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Offers = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true
    },
    messageText: {
      type: String,
      required: true
    }
  }, { timestamps: true }
);

module.exports = mongoose.model('Offers', Offers);