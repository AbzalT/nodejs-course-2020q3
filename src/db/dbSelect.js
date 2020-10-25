const inMemoryDB = () => {
  const userRouter = require('../resources/users/user.router');
  const boardRouter = require('../resources/boards/board.router');
  const taskRouter = require('../resources/tasks/task.router');
  return (module.exports = {
    userRouter,
    boardRouter,
    taskRouter
  });
};
const MongoDB = () => {
  const userDBRouter = require('../resources/users/user.DB.router');
  const boardDBRouter = require('../resources/boards/board.DB.router');
  const taskDBRouter = require('../resources/tasks/task.DB.router');
  return (module.exports = {
    userRouter: userDBRouter,
    boardRouter: boardDBRouter,
    taskRouter: taskDBRouter
  });
};
const select = (db = true) => (db ? MongoDB() : inMemoryDB());

const db = { select };
module.exports = db;
