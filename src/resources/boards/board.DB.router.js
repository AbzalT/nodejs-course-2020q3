/* eslint no-unused-expressions: [2, { allowTernary: true }]*/
const { OK, NOT_FOUND, NO_CONTENT } = require('http-status-codes');
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { toResponse, toDb, service } = require('../../db/db.mapper')('Boards');
// module.exports = (require('../../db/db.router'))(toResponse, toDb, service);

router.route('/').get(
  asyncHandler(async (req, res, next) => {
    const entities = await service.getAll();
    res.status(OK).send(entities.map(toResponse));
    next();
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res, next) => {
    const entity = await service.getById(req.params.id);
    entity
      ? res.status(OK).send(toResponse(entity))
      : res.sendStatus(NOT_FOUND);
    next();
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res, next) => {
    await service.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
    next();
  })
);

router.route('/').post(
  asyncHandler(async (req, res, next) => {
    const entity = { ...toDb(req) };
    const newEntity = await service.create(entity);
    res.status(OK).send(toResponse(newEntity));
    next();
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const entityToUpdate = { ...toDb(req) };
    await service.update(id, entityToUpdate);
    const entity = await service.getById(id);
    entity
      ? res.status(OK).send(toResponse(entity))
      : res.sendStatus(NOT_FOUND);
    next();
  })
);

module.exports = router;
