const { toResponse, toDb, service } = require('../../db/db.mapper')('Users');
module.exports = require('../../db/db.router')(toResponse, toDb, service);
