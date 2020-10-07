const { NOT_FOUND_ERROR } = require('../../errors/appError');
const ENTITY_NAME = 'board';
const db = require('../../util/db.InMemory');
const table_name = 'Boards';

const getAll = async () => {
  return await db.getAll(table_name);
};

const getById = async id => {
  const entity = await db.getById(table_name, id);
  /* if (!entity) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  } */
  return entity;
};

const create = async entity => {
  const newBoard = await db.create(table_name, entity);
  return newBoard;
};

const update = async (id, entity) => await db.update(table_name, id, entity);

const remove = async id => {
  const result = await db.remove(table_name, id)
  if(result.length > 1) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
}

module.exports = { getAll, getById, create, update, remove };