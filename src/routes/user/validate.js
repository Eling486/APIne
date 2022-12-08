const express = require('express');
const router = express.Router();
const { sendJSON } = require('../../response')
const { validate } = require('../../user')

router.post('/', async function (req, res, next) {
    let tokenBase64 = req.headers['authorization']
    let payload = validate(tokenBase64)
    sendJSON({
        req, res,
        code: 0,
        data: {
            payload
        }
    });
    next();
});


module.exports = router;