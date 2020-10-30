const express = require('express');
const service = require('./auth.service');
const router = express.Router();

router.post('/', service.login);

module.exports = router;
