const Entity = {
  User: {
    model: require('../resources/users/user.DB.model'),
    fix: id => {
      const secondaryEntity = require('../resources/tasks/task.DB.model');
      secondaryEntity.updateMany({ userId: id }, { userId: null }, err => {
        console.log(err);
      });
    }
  },
  Task: {
    model: require('../resources/tasks/task.DB.model'),
    fix: id => {
      return id;
    }
  },
  Board: {
    model: require('../resources/boards/board.DB.model'),
    fix: id => {
      const secondaryEntity = require('../resources/tasks/task.DB.model');
      secondaryEntity.deleteMany({ boardId: id }, err => {
        console.log(err);
      });
    }
  }
};

const repository = entity => {
  const Model = Entity[entity].model;
  const fix = Entity[entity].fix;

  return {
    getAll: async () => Model.find({}),
    getById: async id => Model.findById(id),
    create: async entityToCreate => Model.create(entityToCreate),
    update: async (id, entityToUpdate) =>
      Model.findByIdAndUpdate(id, entityToUpdate, { new: true }),
    remove: async id => {
      fix(id);
      return Entity.findByIdAndDelete(id);
    }
  };
};

module.exports = repository;
