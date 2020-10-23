const { toResponse, toDb, service } = require('../../db/db.mapper')('Tasks');
module.exports = require('../../db/db.router')(toResponse, toDb, service);
