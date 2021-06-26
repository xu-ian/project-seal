const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Deliverable = require('../models/Deliverable'); 
const deliverableRoutes = express.Router();

const deliverableStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/deliverables');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
});

const deliverableUpload = multer({ storage: deliverableStorage });

// GET: All deliverables
deliverableRoutes.route('/').get((req, res) => {
    Deliverable.find()
               .then(deliverables => {
                   res.json(deliverables);
               })
               .catch(err => {
                   res.status(400).json({ msg: err.msg });
               });
});


// GET: One homework via filename
deliverableRoutes.route('/').get((req, res) => {

});

// POST: (Upload) a single file
deliverableRoutes.route('/upload/single').post(deliverableUpload.single('deliverable'), (req, res) => {
    const newDeliverable = {
        name: req.file.filename,
        course: req.body.course
    }
    
    Deliverable.create(newDeliverable, err => {
        if (err) {
            res.json({ msg: err.msg });
        } else {
            res.json('Deliverable successfully uploaded.');
        }
    });
               /*.then(() => {
                   res.json({ msg: 'File has successfully been uploaded.' });
               })
               .catch(err => {
                   res.status(400).json({ msg: err.msg });
               });*/
});

// POST: (Upload) multiple files
deliverableRoutes.route('/upload/multiple').post(deliverableUpload.array('deliverables'), (req, res) => {
    res.json('Deliverable successfully uploaded.');
});

// DELETE: A file
deliverableRoutes.route('/delete').delete((req, res) => {

});


module.exports = deliverableRoutes;