const express = require('express');
const contactsModel = require('./contacts.model');

const getContacts = (req, res, next) => {
    console.log(req.body);
    const queryUserId = 1;
    contactsModel.find({ userid: queryUserId }).then(payload => {
        const contacts = payload[0].contacts;
        res.json({
            status: 200,
            contacts: contacts
        })
    })
};

const getConversation = (req, res, next) => {};

const sendMessage = (req, res, next) => {};

const editMessage = (req, res, next) => {};

const addContact = (req, res, next) => {};

const router = express.Router();
router.post('/addContact', addContact);
router.get('/getContacts', getContacts);
router.post('/sendMessage', sendMessage);
router.post('/editMessage', editMessage);
router.post('/getConversation', getConversation)

module.exports = router;