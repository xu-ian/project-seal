const express = require('express');

const payload = [
    {
        name: 'Course1',
        desc: 'Course1 description here'
    },
    {
        name: 'Course2',
        desc: 'Course2 description here'
    }
]

const defaultRes = (req, res, next) => {
    res.json({
        status: 200,
        payload: payload
    })
}
const router = express.Router();
router.get('/', defaultRes);

module.exports = router;