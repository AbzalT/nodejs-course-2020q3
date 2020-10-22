const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');
const userDBRouter = require('./resources/users/user.DB.router');

// const boardRouter = require('./resources/boards/board.router');
const boardDBRouter = require('./resources/boards/board.DB.router');

// const taskRouter = require('./resources/tasks/task.router');
const taskDBRouter = require('./resources/tasks/task.DB.router');

const errorHandler = require('./errors/errorHandler');
const morgan = require('morgan');
const { logRequest, EXCEPTION } = require('./errors/logger');
const { MONGO_URI } = require('./common/config');

const app = express();
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB connected!');
    // mongoose.connection.db.dropDatabase(); // очитска базы перед использованием
  })
  .catch(error => console.log(error));

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const exception = EXCEPTION;

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Task 3 - 3. Add errors handling to `process.on(‘uncaughtException’,...)`.
process.on(exception.UNCAUGHT.name, exception.UNCAUGHT.handler); // throw Error('Oops!'); // тестирование uncaughtException

// Task 3 - 4. Add Unhandled promise rejection listener to log error.
process.on(exception.UNHANDLED.name, exception.UNHANDLED.handler); // Promise.reject(Error('Oops!')); // тестирование unhandledRejection

// Task 3 - 1. Add express middleware which will log incoming requests to service (url, query parameters, body).
const myLogger = true;
if (myLogger) {
  // самопальный вариант
  app.use(logRequest);
} else {
  // вариант с морганом
  const logFormatString = 'Метод: %s; \nПараметры: %s; \nТело запроса: %s\n';
  morgan.token('task3', req =>
    console.log(logFormatString, req.method, req.query, req.body)
  );
  app.use(morgan(':task3'));
}

// Обработка обычных маршрутов
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userDBRouter);
app.use('/boards', boardDBRouter);
boardDBRouter.use('/:boardId/tasks', taskDBRouter);

// Task 3 - 2. Add express middleware which will log all unhandled errors and return a standard message with HTTP code 500 (Internal Server Error).
app.use(errorHandler);

module.exports = app;
