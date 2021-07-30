const express = require('express');
const mongoose = require('mongoose');
const Offer = require('../models/Offer');
const OfferComment = require('../models/OfferComment');
const user = require('../models/user');
const { ObjectID } = require('bson');
const { ObjectId } = require('bson');
const offersRoutes = require('./offers');
const offercommentsRoutes = express.Router();

// Getting offercomments from a offer
offercommentsRoutes.route("/offers/:id/offercomments").get((req, res) => {
    Offer.findById(req.params.id)
        .populate({
            path: "offercomments",
            populate: {
                path: "author"
            }
        })
        .select("-tags -content -createdAt -updatedAt -_id -author -title -__v")
        .then(offercomments => {
            res.json(offercomments);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});

// Get a specific offercomment
offercommentsRoutes.route("/offers/:offerId/offercomments/:offercommentId").get((req, res) => {
    Offer.findById(req.params.offerId)
        .then(
            OfferComment.findById(req.params.offercommentId)
                .populate("author")
                .then(offercomment => {
                    res.json(offercomment);
                })
                .catch(err => {
                    res.status(400).json({ msg: err.msg });
                })
        );
});

// Adding a offercomment
offercommentsRoutes.route("/offers/:id/offercomments/add/:aid").post((req, res) => {

    let newComment = new OfferComment({
        author: ObjectID(req.params.aid),
        content: req.body.content
    });

    newComment.save()
        .then(() => {
            Offer.findById(req.params.id)
                .then(offer => {
                    offer.offercomments.push(newComment);
                    offer.save();
                    res.json({ msg: "New offercomment has been added." });
                })
                .catch(err => {
                    res.status(404).json({ msg: err.msg });
                });
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });

});

// Updating a offercomment
offercommentsRoutes.route("/offers/:offerId/offercomments/update/:offercommentId").patch((req, res) => {
    if (OfferComment.findById(req.params.offercommentId)) {
        Offer.findById(req.params.offerId)
            .then(
                OfferComment.updateOne({ _id: ObjectId(req.params.offercommentId) }, {
                    $set: {
                        content: req.body.content
                    }
                })
                    .then(() => {
                        res.json({ msg: "OfferComment has been updated." });
                    })
                    .catch(err => {
                        res.status(400).json({ msg: err.msg });
                    })
            )
            .catch(err => {
                res.status(404).json({ msg: err.msg });
            });
    }
});

// Deleting a offercomment
offercommentsRoutes.route("/offers/:offerId/offercomments/delete/:offercommentId").delete((req, res) => {
    if (OfferComment.findById(req.params.offercommentId)) {
        OfferComment.deleteOne({ _id: ObjectId(req.params.offercommentId) })
            .then(() => {
                res.json({ msg: "OfferComment has been deleted." });
            })
            .catch(err => {
                res.status(400).json({ msg: err.msg });
            });
        Offer.findByIdAndUpdate(req.params.id, {
            $pull: {
                offercomments: req.params.offercommentId
            }
        })
            .then((offer) => {
                offer.save();
                res.json({ msg: "OfferComment has been deleted." });
            })
            .catch(err => {
                res.json({ msg: err.msg });
            });
    }
});

module.exports = offercommentsRoutes;