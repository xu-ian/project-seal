const mongoose = require('mongoose');

const RelationSchema = mongoose.Schema(
    {
        relation: {
            type: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
            }],
            validate: [arraySize, '{PATH} is not a pair']
        },
        conversation:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }]
    }
);

function arraySize(val){
    return val.length = 2;
}

module.exports = mongoose.model('Relation', RelationSchema);