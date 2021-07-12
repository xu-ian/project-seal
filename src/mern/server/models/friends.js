var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendSchema = new Schema(
  {

    friends:  [{type: String}],
    friendrequestsent: [{type: String}],
    friendrequestrecieved:  [{type: String}],
  }
);


//Export model
module.exports = mongoose.model('Friends', FriendSchema);
