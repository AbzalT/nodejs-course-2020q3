const { OK, NOT_FOUND, NO_CONTENT } = require('http-status-codes');
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const service = require('./board.DB.service');
const Entity = require('./board.DB.model');

const toResponse = entity => {
  const id = entity._id;
  const title = entity.title;
  const columns = entity.columns;
  return { id, title, columns };
};

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
    res.status(OK).send(toResponse(entity));
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
    const entity = new Entity({
      title: req.body.title,
      columns: req.body.columns
    });
    const newEntity = await service.create(entity);
    res.status(OK).send(toResponse(newEntity));
    next();
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const entityToUpdate = new Entity({
      title: req.body.title,
      columns: req.body.columns
    });
    await service.update(id, entityToUpdate);
    const entity = await service.getById(id);
    if (entity) {
      res.status(OK).send(toResponse(entity));
    } else {
      res.status(NOT_FOUND).send('Board not found');
    }
    next();
  })
);

module.exports = router;
