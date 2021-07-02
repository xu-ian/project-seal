const express = require('express');
const coursesModel = require('./courses.model');
const mongoose = require('mongoose');

const defaultRes = (req, res, next) => {
    coursesModel.find({}).then(payload => {
        res.json({
            status: 200,
            payload: payload
        })
    })
}

const router = express.Router();
router.get('/', defaultRes);

module.exports = router;