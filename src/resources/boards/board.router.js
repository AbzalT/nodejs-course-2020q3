const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  await res.status(OK).json(boards.map(board => Board.toResponse(board)));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  await res.status(OK).send(Board.toResponse(task));
});

router.route('/').post(async (req, res) => {
  const board = new Board({
    title: req.body.title,
    columns: [...req.body.columns]
  });
  const newBoard = await boardsService.create(board);
  res.status(OK).send(Board.toResponse(newBoard));
});

router.route('/:id').put(async (req, res) => {
  const board = new Board({
    id: req.params.id,
    title: req.body.title,
    columns: [...req.body.columns]
  });
  const updatedBoard = await boardsService.update(req.params.id, board);
  res.status(OK).send(Board.toResponse(updatedBoard));
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
