const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Messages = new Schema(
  {
    convoID: {type: Number, required: true},
    senderID: {type: Number, required: true},
    recieverID: {type: Number, required: true},
    messageText: {type: String, required: true},
    timeStamp: {type: Date, required: true}
  }
);

module.exports = mongoose.model('Messages', Messages);
