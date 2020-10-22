const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
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
    const entityToUpdate = new Entity({
      title: req.body.title,
      columns: req.body.columns
    });
    await service.update(req.params.id, entityToUpdate);
    const entity = service.getById(req.params.id);
    res.status(OK).send(toResponse(entity));
    next();
  })
);

module.exports = router;
