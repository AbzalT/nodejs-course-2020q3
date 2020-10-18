const { OK, NO_CONTENT } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(
  asyncHandler(async (req, res, next) => {
    const tasks = await tasksService.getAll();
    await res.status(OK).json(tasks.map(task => Task.toResponse(task)));
    next();
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res, next) => {
    const task = await tasksService.getById(req.params.id);
    if (task) {
      await res.status(OK).send(Task.toResponse(task));
    } else {
      await res.sendStatus(404);
    }
    next();
  })
);

router.route('/').post(
  asyncHandler(async (req, res, next) => {
    const task = new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    });
    const newTask = await tasksService.create(task);
    res.status(OK).send(Task.toResponse(newTask));
    next();
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res, next) => {
    const task = new Task({
      id: req.params.id,
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId
    });
    const updatedTask = await tasksService.update(req.params.id, task);
    res.status(OK).send(Task.toResponse(updatedTask));
    next();
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res, next) => {
    await tasksService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
    next();
  })
);

module.exports = router;
