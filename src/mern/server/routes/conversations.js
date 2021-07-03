const { ObjectID } = require('bson');
const { json } = require('express');

const express = require('express');
const mongoose = require('mongoose');
const Relation = require('../models/Relation'); 
const conversationRoutes = express.Router();

// Get a specific relation by userID.
conversationRoutes.route('/messages/getContacts/:id').get((req, res) => {
    Relation.find({relation:req.params.id})
        .populate('records', 'conversation')
        .then(post => {
            console.log(post);
            res.json(post);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg});
        });
});


module.exports = conversationRoutes;