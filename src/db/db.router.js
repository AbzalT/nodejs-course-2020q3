/* eslint no-unused-expressions: [2, { allowTernary: true }]*/
const entityRoutes = (toResponse, toDb, service) => {
  const { OK, NOT_FOUND, NO_CONTENT } = require('http-status-codes');
  const asyncHandler = require('express-async-handler');
  const router = require('express').Router({ mergeParams: true });
  const passport = require('passport');

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res, next) => {
      const entities = await service.getAll();
      res.status(OK).send(entities.map(toResponse));
      next();
    })
  );

  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res, next) => {
      const entity = await service.getById(req.params.id);
      entity
        ? res.status(OK).send(toResponse(entity))
        : res.sendStatus(NOT_FOUND);
      next();
    })
  );

  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res, next) => {
      await service.remove(req.params.id);
      res.sendStatus(NO_CONTENT);
      next();
    })
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res, next) => {
      const entity = { ...(await toDb(req)) };
      const newEntity = await service.create(entity);
      res.status(OK).send(toResponse(newEntity));
      next();
    })
  );

  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res, next) => {
      const id = req.params.id;
      const entityToUpdate = { ...(await toDb(req)) };
      await service.update(id, entityToUpdate);
      const entity = await service.getById(id);
      entity
        ? res.status(OK).send(toResponse(entity))
        : res.sendStatus(NOT_FOUND);
      next();
    })
  );

  return router;
};
module.exports = (toResponse, toDb, service) =>
  entityRoutes(toResponse, toDb, service);
