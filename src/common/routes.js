// #region Require
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const db = require('../db/dbSelect');
// #endregion

// #region Declaration
const { userRouter, boardRouter, taskRouter } = db.select(true); // useDB ? MongoDB : inMemoryDB
const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));
// #endregion

// #region Use
const set = app => {
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  // Обработка обычных маршрутов
  app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
    }
    next();
  });

  app.use('/users', userRouter);
  app.use('/boards', boardRouter);
  boardRouter.use('/:boardId/tasks', taskRouter);
};

const routes = { set };
// #endregion

module.exports = { routes };
