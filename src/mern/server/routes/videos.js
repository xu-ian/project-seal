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
        let newName = file.originalname.replace(/\s+/g, '');
        console.log(newName);
        cb(null, Date.now() + "-" + newName);
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

// GET: All videos
videoRoutes.route('/').get((req, res) => {
    Video.find()
        .then(videos => {
            res.json(videos);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});

// GET: One video based on video name
// Note: TBC

// POST: Upload a single .mp4 video
videoRoutes.route('/upload/single').post(videoUpload.single('video'), (req, res) => {
    const newVideo = {
        title: req.body.title,
        course: req.body.course,
        lesson: req.body.lesson,
        path: req.file.path,
        fileName: req.file.filename
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
    var i = 0;
    req.files.forEach(file => {
        newVideo = new Video({
            title: req.body.title[i],
            course: req.body.course[i],
            lesson: req.body.lesson[i],
            path: file.path,
            fileName: file.filename
        });

        i++;

        Video.create(newVideo, err => {
            if (err) {
                res.status(400).json({ msg: err.msg });
                return;
            }
        });
    });

    res.json({ msg: 'Videos have been successfully uploaded.' });
});

// DELETE: Delete a video based on its ID
videoRoutes.route('/delete/:filename').delete((req, res) => {
    const vid = Video.findOne({ fileName: req.params.filename });
    const fileLocation = path.join(__dirname, "..", "uploads", "videos", req.params.filename);

    fs.unlink(fileLocation, err => {
        if (err) {
            res.status(400).json({ msg: err.msg });
            throw err;
        }
    });

    Video.deleteOne(vid)
        .then(() => {
            res.json({ msg: 'Video has been successfully deleted.' });
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});

module.exports = videoRoutes;