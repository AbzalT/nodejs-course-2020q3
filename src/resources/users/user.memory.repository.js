const db = require('../../util/db.InMemory');
const table_name = 'Users';

const getAll = async () => {
  return await db.getAll(table_name);
};

const getById = async (id) => {
  const entity = await db.getById(table_name, id);
  if (!entity) {
    throw new Error(`Пользователь ${id} не найден`);
  }
  return entity;
}

const create = async (entity) => await db.create(table_name, entity);

const update = async (id, entity) => await db.update(table_name, id, entity);

const remove = async (id) => await db.remove(table_name, id);

module.exports = { getAll, getById, create, update, remove };
