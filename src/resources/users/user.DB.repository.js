const repository = require('../../db/db.repository');
module.exports = { ...repository('User') };

// const Entity = require('./user.DB.model');

// const secondaryEntity = require('../tasks/task.DB.model');

// const getAll = async () => Entity.find({});
// const getById = async id => Entity.findById(id);
// const create = async entity => Entity.create(entity);

// const update = async (id, entityToUpdate) => Entity.findByIdAndUpdate({ _id: id }, entityToUpdate, { new: true });

// function remove(id) {
// secondaryEntity.updateMany({ userId: id }, { userId: null }, err => {
// console.log(err);
// });
// return Entity.findByIdAndDelete(id);
// }

// module.exports = { getAll, getById, create, remove, update };
