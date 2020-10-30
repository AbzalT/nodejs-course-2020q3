const express = require('express');
const passport = require('passport');
const { routes } = require('./common/routes');
const { logger } = require('./middlewares/logger');

const app = express();
app.use(passport.initialize());
require('./middlewares/passport')(passport);
app.use(express.json());
logger.set(app);
routes.set(app);
logger.handleErrors(app);

module.exports = app;
