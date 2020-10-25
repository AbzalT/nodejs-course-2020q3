const express = require('express');
const { routes } = require('./common/routes');
const { logger } = require('./middlewares/logger');

const app = express();
app.use(express.json());
logger.set(app);
routes.set(app);
logger.handleErrors(app);

module.exports = app;
