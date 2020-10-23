const { OK, NOT_FOUND, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');
const service = require('./task.DB.service');
// const Entity = require('./task.DB.model');

const toResponse = entity => {
  const id = entity._id;
  const title = entity.title;
  const description = entity.description;
  const order = entity.order;
  const userId = entity.userId;
  const boardId = entity.boardId;
  const columnId = entity.columnId;
  return { id, title, description, order, userId, boardId, columnId };
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
    if (entity) {
      res.status(OK).send(toResponse(entity));
    } else {
      res.sendStatus(NOT_FOUND);
    }
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
    const entity = {
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    };
    const newEntity = await service.create(entity);
    res.status(OK).send(toResponse(newEntity));
    next();
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const entityToUpdate = {
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId
    };
    await service.update(id, entityToUpdate);
    const entity = await service.getById(id);
    if (entity) {
      res.status(OK).send(toResponse(entity));
    } else {
      res.sendStatus(NOT_FOUND);
    }
    next();
  })
);

module.exports = router;
