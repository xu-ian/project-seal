const { ObjectID } = require('bson');
const { json } = require('express');

const express = require('express');
const mongoose = require('mongoose');
const Offer = require('../models/Offer');
const user = require('../models/user');
const offersRoutes = express.Router();
const User = require('../models/user');

// Get a list of all the offers.
offersRoutes.route('/').get((req, res) => {
    if (Object.keys(req.query).length === 0) {
        Offer.find()
            .populate({
                path: 'offercomments',
                populate: {
                    path: 'author'
                }
            })
            .populate('author')
            .then(offers => {
                res.json(offers);
            })
            .catch(err => {
                res.status(400).json({ msg: err.msg });
            });
    } else {
        Offer.find({ tags: req.query.tags })
            .populate({
                path: 'offercomments',
                populate: {
                    path: 'author'
                }
            })
            .populate('author')
            .then(offers => {
                res.json(offers);
            })
            .catch(err => {
                res.status(400).json({ msg: err.msg });
            });
    }
});

// Get a specific offer by ID.
offersRoutes.route('/:id').get((req, res) => {
    Offer.findById(req.params.id)
        .populate({
            path: 'offercomments',
            populate: {
                path: 'author'
            }
        })
        .populate('author')
        .then(offer => {
            res.json(offer);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});

// Create a offer.
offersRoutes.route("/add/:id").post((req, res) => {
    let newOffer = new Offer({
        author: ObjectID(req.params.id),
        title: req.body.title,
        content: req.body.content,
        // tags: req.body.tags
    });
    newOffer.save()
        .then(offer => {
            res.status(201).json(offer);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });

});

// Update a specific offer by ID.
offersRoutes.route("/update/:id").patch((req, res) => {
    if (Offer.findById(req.params.id)) {
        Offer.updateOne({ _id: ObjectID(req.params.id) }, {
            $set: {
                content: req.body.content,
                tags: req.body.tags
            }
        })
            .then(() => {
                res.json({ msg: "Offer has been updated." });
            })
            .catch(err => {
                res.status(400).json({ msg: err.msg });
            });
    }
});

// Deleting a specific offer by ID.
offersRoutes.route("/delete/:id").delete((req, res) => {
    if (Offer.findById(req.params.id)) {
        Offer.deleteOne({ _id: ObjectID(req.params.id) })
            .then(() => {
                res.json({ msg: "Offer has been deleted." });
            })
            .catch(err => {
                res.status(400).json({ msg: err.msg });
            });
    }
});

module.exports = offersRoutes;