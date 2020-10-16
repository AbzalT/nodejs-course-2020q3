const notFoundError = require('./notFoundError');
const logger = require('./logger');

const handle = (err, req, res, next) => {
  console.error(err);
  logger(req, res, next);
  if (err instanceof notFoundError) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res.sendStatus(500);
  }
  next();
};

module.exports = handle;
