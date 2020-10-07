const tasksRepo = require('./board.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = id => tasksRepo.getById(id);
const create = entity => tasksRepo.create(entity);
const update = (id, entity) => tasksRepo.update(id, entity);
const remove = id => tasksRepo.remove(id);

module.exports = { getAll, getById, create, remove, update };
