const repo = require('./task.DB.repository');

const getAll = () => repo.getAll();
const getById = id => repo.getById(id);
const create = entity => repo.create(entity);
const update = (id, entity) => repo.update(id, entity);
const remove = id => repo.remove(id);

module.exports = { getAll, getById, create, remove, update };
