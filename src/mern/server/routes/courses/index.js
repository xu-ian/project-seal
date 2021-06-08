const express = require('express');

const defaultRes = (req, res, next) => {
    res.json({
        status: 200,
        message: 'courses endpoint'
    })
}
const router = express.Router();
router.get('/', defaultRes);

module.exports = router;