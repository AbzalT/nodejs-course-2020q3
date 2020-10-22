const { OK, NO_CONTENT } = require('http-status-codes');
const express = require('express');
const router = express.Router();
const service = require('./user.DB.service');
const asyncHandler = require('express-async-handler');
const Entity = require('./user.DB.model');

const toResponse = entity => {
  const id = entity._id;
  const name = entity.name;
  const login = entity.login;
  return { id, name, login };
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
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    const newEntity = await service.create(entity);
    res.status(OK).send(toResponse(newEntity));
    next();
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res, next) => {
    const entityToUpdate = new Entity({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    const entity = await service.update(req.params.id, entityToUpdate);
    res.status(OK).send(toResponse(entity));
    next();
  })
);

module.exports = router;
