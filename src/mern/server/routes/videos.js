const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const Video = require('../models/Video');
const { ObjectId } = require('mongodb');
const videoRoutes = express.Router();
const dirLocation = path.join(__dirname, '..', 'uploads', 'videos');

// Mongo URI
const mongoURI = process.env.ATLAS_URI;

// Storage for videos
/*const videoStorage = multer.diskStorage({
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
});*/
const videoStorage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ['video/mp4'];
        const newName = file.originalname.replace(/\s+/g, '');

        if (match.indexOf(file.mimetype) === -1) {
            
            const filename = Date.now() + '-' + newName;
            return filename;
        }

        return {
            bucketName: 'videos',
            filename: Date.now() + '-' + newName
        };
    }
})

/*const videoFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] == "mp4") {
        cb(null, true);
    } else {
        cb(new Error("File uploads must be a .mp4 only."), false);
    }
}*/

const videoUpload = multer({
    storage: videoStorage
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

// GET: One video based on ID
videoRoutes.route('/:id').get((req, res) => {
    Video.findById(req.params.id)
        .then(video => {
            res.json(video);
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});

// POST: Upload a single .mp4 video
videoRoutes.route('/upload/single').post(videoUpload.single('video'), (req, res) => {
    const newVideo = {
        title: req.body.title,
        description: req.body.description,
        course: ObjectId(req.body.course._id),
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
videoRoutes.route('/upload/multiple').post(videoUpload.array('videos'), (req, res) => {
    var newVideo;
    var i = 0;
    req.files.forEach(file => {
        newVideo = new Video({
            title: req.body.title[i],
            description: req.body.description[i],
            course: ObjectId(req.body.course[i]._id),
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

// DELETE: Delete a video based on its filename
videoRoutes.route('/delete/:filename').delete((req, res) => {
    const vid = Video.findOne({ fileName: req.params.filename });
    const fileLocation = path.join(__dirname, "..", "uploads", "videos", req.params.filename);

    /*fs.unlink(fileLocation, err => {
        if (err) {
            res.status(400).json({ msg: err.msg });
            throw err;
        }
    });*/

    Video.deleteOne(vid)
        .then(() => {
            res.json({ msg: 'Video has been successfully deleted.' });
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        });
});

// PATCH: Update a video's title and description
videoRoutes.route('/update/:id').patch((req, res) => {
    const updatedVideo = {};

    if (req.body.title) updatedVideo.title = req.body.title;
    if (req.body.description) updatedVideo.description = req.body.description;

    Video.findByIdAndUpdate(req.params.id, {
        $set: updatedVideo
    }, {
        new: true,
        useFindAndModify: false
    })
        .then(() => {
            res.json({ msg: 'Video information has been updated.' });
        })
        .catch(err => {
            res.status(400).json({ msg: err.msg });
        })
});

module.exports = videoRoutes;