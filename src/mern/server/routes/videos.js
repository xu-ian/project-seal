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



module.exports = videoRoutes;