const { NOT_FOUND_ERROR } = require('../errors/notFoundError');
const morgan = require('morgan');

morgan.token('customFields', req =>
  [
    req.method,
    decodeURI(req.url),
    JSON.stringify(req.query),
    JSON.stringify(req.body),
    '-'
  ].join(' ')
);
const EXCEPTION = {
  UNCAUGHT: {
    name: 'uncaughtException',
    handler(err) {
      logError('uncaughtException', err);
    }
  },
  UNHANDLED: {
    name: 'unhandledRejection',
    handler(err) {
      logError('unhandledRejection', err);
    }
  }
};
const exitCode = 1;

const set = app => {
  app.use(morgan(':date[iso] :customFields :status'));
  process.on(EXCEPTION.UNCAUGHT.name, EXCEPTION.UNCAUGHT.handler); // throw Error('Oops!');
  process.on(EXCEPTION.UNHANDLED.name, EXCEPTION.UNHANDLED.handler); // Promise.reject(Error('Oops!'));
};
const logError = (name, err) => {
  console.error(`${name} : `, err.message);
  console.error(err.stack);
  console.error('Application exit with exitCode: %s', exitCode);
  process.exitCode = exitCode;
};
const handleErrors = app => {
  app.use((err, req, res, next) => {
    if (err instanceof NOT_FOUND_ERROR) {
      res.status(err.status).send(err.message);
    } else if (err) {
      res.sendStatus(500);
    }
    next();
  });
};
const logger = {
  set,
  handleErrors
};

module.exports = { logger };
