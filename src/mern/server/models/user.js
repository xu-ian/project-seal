var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    role:[{type: String, required: true}],
    date_joined: {type: Date},

    user_id:  {type: String},
    userbio: {type: String},
    gender:  {type: String},
    links:  [{type: String}],
    belongingCompany:  {type: String},
    position:  {type: String},
    //profileImage: req.body.profileImage,
    //backgroundImage: req.body.backgroundImage,
    //friendsmodel: [ [friends: ], [friendrequestsent: ], [friendrequestreceived: ] ]
    friendsmodel:[{type: String}, {type: String}, {type: String}],
  }
);


//Export model
module.exports = mongoose.model('User', UserSchema);
