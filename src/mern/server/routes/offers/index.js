const express = require('express');
const offerModel = require('./offer.model');
const offersModel = require('./offer.model');

const getOffers = (req, res, next) => {
  const userID = req.body.userID
  if(userID !== undefined && userID === "") {
    const query = {}
  } else {
    const query = { userID: userID }

  }
  offersModel.find(query).then(payload => {
    const offers = payload
    res.json({
      status: 200,
      offers: offers
    })
  })
}

const createOffer = (req, res, next) => {
  const messageText = req.body.messageText
  const userID = req.body.userID
  const document = { userID: userID, messageText: messageText }
  offersModel.create(document).then(result => {
    if(result) {
      res.json({
        status: 200
      })
    } else {
      res.json({
        status: 404
      })
    }
  })
}

const deleteOffer = (req, res, next) => {
  const offerID = req.body.offerID
  offersModel.deleteOne({ _id: offerID }).then(result => {
    if(result) {
      res.json({
        status: 200
      })
    } else {
      res.json({
        status: 404
      })
    }
  })
}

const editOffer = (req, res, next) => {
  const offerID = req.body.offerid
  const messageText = req.body.messageText

  const query = { _id: offerID }
  const update = { "$set": { "messageText": messageText } }
  const options = { returnNewDocument: true }
  offerModel.findOneAndUpdate(query, update, options).then(doc => {
    if(doc) {
      res.json({
        status: 200
      })
    } else {
      res.json({
        status: 404
      })
    }}
    )
}

const router = express.Router();
router.get('/getOffers', getOffers);
router.post('/createOffer', createOffer);
router.post('/deleteOffer', deleteOffer);
router.post('/editOffer', editOffer);

module.exports = router;