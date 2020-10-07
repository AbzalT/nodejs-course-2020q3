const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  await res.status(OK).json(tasks.map(task => Task.toResponse(task)));
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  await res.status(OK).send(Task.toResponse(task));
});

router.route('/').post(async (req, res) => {
  const user = new Task({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.body.boardId,
    columnId: req.body.columnId
  });
  const newTask = await tasksService.create(task);
  res.status(OK).send(Task.toResponse(newTask));
});

router.route('/:id').put(async (req, res) => {
  const task = new Task({
    id: req.params.id,
    title: req.body.title,
    order: req.body.order,
    description: req.body.description
    userId: req.body.userId,
    boardId: req.body.boardId,
    columnId: req.body.columnId
  });
  const updatedTask = await tasksService.update(req.params.id, task);
  res.status(OK).send(Task.toResponse(updatedTask));
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
