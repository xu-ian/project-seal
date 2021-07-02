const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
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

// GET: One homework via filename
deliverableRoutes.route('/:name').get((req, res) => {
    Deliverable.findOne({ name: req.params.name })
               .then(deliverable => {
                   res.json(deliverable);
               })
               .catch(err => {
                   res.status(400).json({ msg: err.msg });
               })
    
});

// POST: Upload a single file
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
        }
    });
});

// POST: Upload multiple files
// Note: Need to fix bug where there is an error when sending a response  
//       The uploaded files are sent to the database and into local storage,
//       But there is an issue when creating the Postman request, where a response
//       Was unable to be received.  
deliverableRoutes.route('/upload/multiple').post(deliverableUpload.array('deliverables'), (req, res) => {
    var newDeliverable;
    req.files.map(file => {
        newDeliverable = new Deliverable({
            name: file.filename,
            course: req.body.course,
            assignment: req.body.assignment,
            path: file.path
        });

        newDeliverable.save();
    }, err => {
        if (err) {
            res.status(400).json({ msg: err.msg });
        } else {
            res.json({ msg: 'Deliverables have been successfully uploaded.' });
        }
    })
});

// DELETE: A file using the file's name
deliverableRoutes.route('/delete/:filename').delete((req, res) => {
    const pathLocation = path.join(__dirname, "..", "uploads", "deliverables", req.params.filename);

    fs.unlink(pathLocation, err => {
        if (err) {
            res.status(400).json({ msg: err.msg });
            return;
        } 
    });

    Deliverable.deleteOne({ name: req.params.filename })
               .then(() => {
                   res.json({ msg: "File has been successfully deleted." });
               })
               .catch(err => {
                   res.status(400).json({ msg: err.msg });
               });
});

module.exports = deliverableRoutes;