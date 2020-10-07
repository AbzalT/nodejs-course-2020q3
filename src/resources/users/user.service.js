const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = entity => usersRepo.create(entity);
const update = (id, entity) => usersRepo.update(id, entity);
const remove = id => usersRepo.remove(id);

module.exports = { getAll, getById, create, remove, update };
