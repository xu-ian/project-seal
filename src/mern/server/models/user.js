var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    role:[{type: String, required: true}],
    date_joined: {type: Date},
  }
);


//Export model
module.exports = mongoose.model('User', UserSchema);
