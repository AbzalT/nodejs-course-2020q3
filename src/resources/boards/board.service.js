const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const create = entity => boardsRepo.create(entity);
const update = (id, entity) => boardsRepo.update(id, entity);
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, getById, create, remove, update };
