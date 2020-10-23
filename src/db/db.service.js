const service = {
  Users: require('../resources/users/user.DB.repository'),
  Tasks: require('../resources/tasks/task.DB.repository'),
  Boards: require('../resources/boards/board.DB.repository')
};

module.exports = collection => service[collection];
