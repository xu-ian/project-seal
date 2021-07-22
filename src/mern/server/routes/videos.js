const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Video = require('../models/Video');
const videoRoutes = express.Router();
const dirLocation = path.join(__dirname, '..', 'uploads', 'videos');

// Storage for videos
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(dirLocation)) {
            fs.mkdir(dirLocation, { recursive: true }, err => {
                if (err) {
                    console.log(err);
                } else {
                    cb(null, dirLocation);
                }
            })
        } else {
            cb(null, dirLocation);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const videoFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] == "mp4") {
        cb(null, true);
    } else {
        cb(new Error("File uploads must be a .mp4 only."), false);
    }
}

const videoUpload = multer({
    storage: videoStorage,
    fileFilter: videoFilter
});

videoRoutes.route('/').get((req, res) => {
    Video.find()
         .then(videos => {
            res.json(videos);
         })
         .catch(err => {
            res.status(400).json({ msg: err.msg });
         });
});

// POST: Upload a single .mp4 video
videoRoutes.route('/upload/single').post(videoUpload.single('video'), (req, res) => {
    const newVideo = {
        name: req.body.name,
        course: req.body.course,
        lesson: req.body.lesson,
        path: req.file.path
    }

    Video.create(newVideo, err => {
        if (err) {
            console.log(err);
            res.json({ msg: err.msg });
        } else {
            res.json({ msg: 'Video has been uploaded successfully.' });
        }
    });
});

// POST: Upload multiple .mp4 videos
// Note: Need to fix same videos having the same names
videoRoutes.route('/upload/multiple').post(videoUpload.array('videos'), (req, res) => {
    var newVideo;
    req.files.forEach(file => {
        newVideo = new Video({
            name: req.body.name,
            course: req.body.course,
            lesson: req.body.lesson,
            path: file.path
        });

        Video.create(newVideo, err => {
            if (err) {
                res.status(400).json({ msg: err.msg });
                return;
            }
        });
    });

    res.json({ msg: 'Videos have been successfully uploaded.' });
});


module.exports = videoRoutes;