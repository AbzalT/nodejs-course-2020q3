const exitCode = 1;
const dateStamp = () => new Date().toISOString();
const logFormat =
  '\nПуть: %s; \nМетод: %s; \nПараметры: %s; \nТело запроса: %s\n';

const logError = (name, err) => {
  console.error(`${name} : `, err.message);
  console.error(err.stack);
  console.error('Application exit with exitCode: %s', exitCode);
  process.exitCode = exitCode;
};

const logRequest = (req, res, next) => {
  console.log(
    dateStamp() + logFormat,
    req.url,
    req.method,
    req.query,
    req.body
  );
  next();
};

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

module.exports = { logRequest, logError, EXCEPTION };
