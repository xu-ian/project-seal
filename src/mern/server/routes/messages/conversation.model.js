const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Conversations = new Schema(
  {
    participants: {type: Array, required: true}
  }
);

module.exports = mongoose.model('Conversations', Conversations);
