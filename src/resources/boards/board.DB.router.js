const { toResponse, toDb, service } = require('../../db/db.mapper')('Boards');
module.exports = require('../../db/db.router')(toResponse, toDb, service);
