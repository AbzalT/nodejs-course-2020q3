const express = require('express');
const service = require('./auth.service');
const router = express.Router();

router.post('/', service.register);

module.exports = router;
