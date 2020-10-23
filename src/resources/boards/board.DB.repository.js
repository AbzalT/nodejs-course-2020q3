const Entity = require('./board.DB.model');
const secondaryEntity = require('../tasks/task.DB.model');

const getAll = async () => Entity.find({});
const getById = async id => Entity.findById(id);
const create = async entity => Entity.create(entity);

const update = async (id, entityToUpdate) =>
  Entity.findByIdAndUpdate({ _id: id }, entityToUpdate, { new: true });

const remove = async id => {
  secondaryEntity.deleteMany({ boardId: id }, err => {
    console.log(err);
  });
  return Entity.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, remove, update };
