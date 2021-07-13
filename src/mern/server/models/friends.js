var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendSchema = new Schema(
  {
    //list of friends
    friends:  [{type: String}],

    //outgoing friend requests
    friendrequestsent: [{type: String}],

    //incoming friend requests
    friendrequestrecieved:  [{type: String}],
  }
);


//Export model
module.exports = mongoose.model('Friends', FriendSchema);
