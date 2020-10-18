const { OK, NO_CONTENT } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(
  asyncHandler(async (req, res, next) => {
    const boards = await boardsService.getAll();
    await res.status(OK).json(boards.map(board => Board.toResponse(board)));
    next();
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res, next) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      await res.status(OK).send(Board.toResponse(board));
    } else {
      await res.sendStatus(404);
    }
    next();
  })
);

router.route('/').post(
  asyncHandler(async (req, res, next) => {
    const board = new Board({
      title: req.body.title,
      columns: [...req.body.columns]
    });
    const newBoard = await boardsService.create(board);
    res.status(OK).send(Board.toResponse(newBoard));
    next();
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res, next) => {
    const board = new Board({
      id: req.params.id,
      title: req.body.title,
      columns: [...req.body.columns]
    });
    const updatedBoard = await boardsService.update(req.params.id, board);
    res.status(OK).send(Board.toResponse(updatedBoard));
    next();
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res, next) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
    next();
  })
);

module.exports = router;
