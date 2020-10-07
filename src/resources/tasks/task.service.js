const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = id => tasksRepo.getById(id);
const create = task => tasksRepo.create(task);
const update = (id, task) => tasksRepo.update(id, task);
const remove = id => tasksRepo.remove(id);

module.exports = { getAll, getById, create, remove, update };
