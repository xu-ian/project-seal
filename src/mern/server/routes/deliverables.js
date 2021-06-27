const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
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

/* const deliverableFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] == "pdf") {
        cb(null, true);
    } else {
        cb (new Error("The uploaded file is not a PDF file."), false);
    }
} */

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

// GET: One homework via filename(?)
deliverableRoutes.route('/:name').get((req, res) => {
    Deliverable.findOne({ name: req.params.name })
               .then(deliverable => {
                   res.json(deliverable);
               })
               .catch(err => {
                   res.status(400).json({ msg: err.msg });
               })
    
});

// POST: (Upload) a single file
deliverableRoutes.route('/upload/single').post(deliverableUpload.single('deliverable'), (req, res) => {
    const newDeliverable = {
        name: req.file.filename,
        course: req.body.course,
        assignment: req.body.assignment,
        path: req.file.path
    }
    
    Deliverable.create(newDeliverable, err => {
        if (err) {
            res.json({ msg: err.msg });
        } else {
            res.json({ msg: 'Deliverable successfully uploaded.' });
            console.log(req.file.path);
        }
    });
});

// POST: (Upload) multiple files
// Note: Need to modify so that files get added to the actual database
deliverableRoutes.route('/upload/multiple').post(deliverableUpload.array('deliverables'), (req, res) => {
    res.json('Deliverable successfully uploaded.');
});

// DELETE: A file using the file's name
deliverableRoutes.route('/delete/:name').delete((req, res) => {
    
});

module.exports = deliverableRoutes;