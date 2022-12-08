const express = require('express');
const logger = require('../logger');
const router = express.Router();
const { sendJSON } = require('../response')
const { ipTrans } = require('../utils/network')

router.get('/', async function (req, res, next) {
  sendJSON({
    req, res,
    code: 0,
    msg: 'APIne正常运行中'
  });
  next();
});

router.get('/ping', async function (req, res, next) {
  let data = '192.168.1.1'
  sendJSON({
    req, res,
    code: -500
  })
  next();
})

router.post('/ping', async function (req, res, next) {
  let data = '192.168.1.1'
  sendJSON({
    req, res,
    code: 0,
    data: {
      ip: data,
      ip_int: ipTrans(data)
    }
  })
  next();
})


module.exports = router;
