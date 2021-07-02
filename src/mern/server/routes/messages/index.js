const express = require('express');
const contactsModel = require('./contacts.model');
const conversationsModel = require('./conversation.model');
const messagesModel = require('./messages.model');

const getContacts = (req, res, next) => {
    const queryUserId = req.body.userID
    contactsModel.findOne({ userid: queryUserId }).then(payload => {
        const contacts = payload.contacts;
        res.json({
            status: 200,
            contacts: contacts
        })
    })
};

const getConversation = (req, res, next) => {
    // check if conversation exists
    const recieverID = req.body.recieverID
    const senderID = req.body.senderID
    const query = { "participants": { $all: [ recieverID, senderID ] } }
    conversationsModel.findOne(query)
    .then(convoDoc => {
        if(convoDoc) {
            // return the conversation message list
            const convoID = convoDov._id
            const query = { "convoID": convoID }
            messagesModel.find(query)
            .then(conversation => {
                res.json({
                    status: 200,
                    "conversation": conversation
                })
            })
            .catch(err => {
                res.json({
                    status: 500,
                    message: "failed to retrieve conversation in messages database"
                })
            })
        } else {
            // create a new conversation
        }
    })
    .catch(err => {
        res.json({
            "status": 500,
            "message": "failed to retrieve the conversation"
        })
    })
};

const sendMessage = (req, res, next) => {
    // check if conversation exists
    const msgText = req.body.messageText
    const recieverID = req.body.recieverID
    const senderID = req.body.senderID
    const query = { "participants": { $all: [ recieverID, senderID ] } }
    conversationsModel.findOne(query)
    .then(convoDoc => {
        if(convoDoc) {
            // add new message into message database
            const convoID = convoDoc._id;
            const timestamp = new Date();
            const newMessage = {
                "convoID": convoID,
                "senderID": senderID,
                "recieverID": recieverID,
                "messageText": msgText,
                "timeStamp": timestamp
            }
            messagesModel.insertOne(newMessage)
                .then(result => {
                    res.json({
                        status: 200
                    })
                })
                .catch(err => {
                    res.json({
                        status: 500,
                        message: "failed to send the message"
                    })
                })

        } else {
            const newConvo = {
                "participants": [ revieverID, senderID ]
            }
            // if it doesn't, create a new conversation
            conversationsModel.insertOne(newConvo)
                .then(result => {
                    convoID = result.insertedId
                    // add new message into message database
                    const timestamp = new Date();
                    const newMessage = {
                        "convoID": convoID,
                        "senderID": senderID,
                        "recieverID": recieverID,
                        "messageText": msgText,
                        "timeStamp": timestamp
                    }
                    messagesModel.insertOne(newMessage)
                        .then(result => {
                            res.json({
                                status: 200
                            })
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                message: "failed to send the message"
                            })
                        })
                })
                .catch(error => {
                    res.json({
                        status: 500,
                        message: "failed to create a new conversation"
                    })
                })
            

            
        }
    })
    .catch(err => {
        res.json({
            status: 500,
            message: "failed to send message"
        })
    })
};

const editMessage = (req, res, next) => {
    const newText = req.body.messageText
    const messageID = req.body.messageID
    const query = { "_id": messageID }
    const update = { "$set": { "messageText": newText } }
    const options = { returnNewDocument: true }
    messagesModel.findOneAndUpdate(query, update, options)
    .then(messageDoc => {
        if(messageDoc) {
            res.json({
                status: 200
            })
        } else {
            res.json({
                status: 404,
                message: "message not found"
            })
        }
    })
    .catch(err => {
        res.json({
            status: 500,
            message: "failed to edit message"
        })
    })
};

const addContact = (req, res, next) => {
    // find reciever contact
    const recieverID = req.body.recieverID
    const newContactID = req.body.newContactID
    const query = { "userid": recieverID }
    const update = { "$push": { "contacts": newContactID } }
    const options = { returnNewDocument: true }
    // add contact
    contactsModel.findOneAndUpdate(query, update, options)
    .then(contactDoc => {
        if(contactDoc) {
            res.json({
                status: 200
            })
        } else {
            res.json({
                status: 404
            })
        }
    })
    .catch(err => {
        res.json({
            status: 500,
            message: "failed to add contact"
        })
    })
};

const router = express.Router();
router.post('/addContact', addContact);
router.post('/getContacts', getContacts);
router.post('/sendMessage', sendMessage);
router.post('/editMessage', editMessage);
router.post('/getConversation', getConversation)

module.exports = router;