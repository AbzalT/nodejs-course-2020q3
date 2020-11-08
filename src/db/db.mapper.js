/* eslint no-unused-expressions: [2, { allowTernary: true }]*/
const { cryptPassword } = require('../resources/auth/auth.service');

const mapper = {
  Users: {
    toResponse: entity => {
      return { id: entity._id, name: entity.name, login: entity.login };
    },
    toDb: async req => {
      return {
        name: req.body.name,
        login: req.body.login,
        password: await cryptPassword(req.body.password)
      };
    },
    service: require('../resources/users/user.DB.service')
  },
  Tasks: {
    toResponse: entity => {
      return {
        id: entity._id,
        title: entity.title,
        description: entity.description,
        order: entity.order,
        userId: entity.userId,
        boardId: entity.boardId,
        columnId: entity.columnId
      };
    },
    toDb: req => {
      return {
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId
      };
    },
    service: require('../resources/tasks/task.DB.service')
  },
  Boards: {
    toResponse: entity => {
      return { id: entity._id, title: entity.title, columns: entity.columns };
    },
    toDb: req => {
      return { title: req.body.title, columns: req.body.columns };
    },
    service: require('../resources/boards/board.DB.service')
  }
};

module.exports = collection => mapper[collection];
