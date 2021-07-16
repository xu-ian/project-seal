const express = require('express');
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

const createOffer = (req, res, next) => {}
const deleteOffer = (req, res, next) => {}
const editOffer = (req, res, next) => {

}

const router = express.Router();
router.get('/getOffers', getOffers);
router.post('/createOffer', createOffer);
router.post('/deleteOffer', deleteOffer);
router.post('/editOffer', editOffer);

module.exports = router;