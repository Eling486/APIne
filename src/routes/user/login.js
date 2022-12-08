const express = require('express');
const router = express.Router();
const { sendJSON } = require('../../response')
const { login } = require('../../user')

router.post('/', async function (req, res, next) {
  let token = login(req.body.username, req.body.password)
  sendJSON({
    req, res,
    code: 0,
    data: {
      token
    }
  });
  next();
});


module.exports = router;
