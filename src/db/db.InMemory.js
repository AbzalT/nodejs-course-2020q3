const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUsers: user => {
    if (user) {
      db.Tasks.filter(task => task).forEach(task => {
        task.userId = task.userId === user.id ? null : task.userId;
      });
    }
  },
  fixBoards: board => {
    if (board) {
      db.Tasks.filter(task => task && task.boardId === board.id).forEach(
        task => (db.Tasks[db.Tasks.indexOf(task)] = undefined)
      );
    }
  },
  fixTasks: () => {}
};

// init DB
(() => {
  for (let i = 0; i < 3; i++) {
    db.Users.push(new User());
  }
  const board = new Board();
  db.Boards.push(board);
  db.Tasks.push(
    new Task({ boardId: board.id }),
    new Task({ boardId: board.id })
  );
})();

const getAll = tableName => {
  return db[tableName].filter(entity => entity);
};

const getById = (tableName, id) => {
  const entities = db[tableName]
    .filter(entity => entity)
    .filter(entity => entity.id === id);

  if (entities.length > 1) {
    throw Error(
      `The DB data is damaged. Table: ${tableName}. Entity ID: ${id}`
    );
  }

  return entities[0];
};

const remove = (tableName, id) => {
  const entity = getById(tableName, id);
  if (entity) {
    db[`fix${tableName}`](entity);
    const index = db[tableName].indexOf(entity);
    db[tableName] = [
      ...db[tableName].slice(0, index),
      ...(db[tableName].length > index + 1
        ? db[tableName].slice(index + 1)
        : [])
    ];
  }

  return entity;
};

const create = (tableName, entity) => {
  db[tableName].push(entity);

  return getById(tableName, entity.id);
};

const update = async (tableName, id, entity) => {
  const oldEntity = getById(tableName, id);
  if (oldEntity) {
    db[tableName][db[tableName].indexOf(oldEntity)] = { ...entity };
  }

  return getById(tableName, id);
};

module.exports = { getAll, getById, remove, create, update };
