const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contacts = new Schema(
  {
    userid: {type: Number, required: true},
    contacts: {type: Array, required: true}
  }
);

module.exports = mongoose.model('Contacts', Contacts);
