const Entity = require('./task.DB.model');

const getAll = async () => Entity.find({});
const getById = async id => Entity.findById(id);
const create = async entity => Entity.create(entity);
const update = async (id, entityToUpdate) =>
  Entity.findByIdAndUpdate({ _id: id }, entityToUpdate, { new: true });
const remove = async id => {
  return Entity.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, remove, update };
