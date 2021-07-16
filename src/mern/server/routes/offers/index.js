const express = require('express');

const getOffers = (req, res, next) => {}
const getContacts = (req, res, next) => {}
const sendMessage = (req, res, next) => {}
const editMessage = (req, res, next) => {}

const router = express.Router();
router.post('/getOffers', getOffers);
router.post('/createOffer', getContacts);
router.post('/deleteOffer', sendMessage);
router.post('/editOffer', editMessage);

module.exports = router;