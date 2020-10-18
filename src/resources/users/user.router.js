const { OK, NO_CONTENT } = require('http-status-codes');
const asyncHandler = require('express-async-handler'); // https://habr.com/ru/company/ruvds/blog/476290/
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(
  asyncHandler(async (req, res, next) => {
    const users = await usersService.getAll();
    await res.status(OK).json(users.map(user => User.toResponse(user))); // map user fields to exclude secret fields like "password"
    next();
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res, next) => {
    const user = await usersService.getById(req.params.id);
    await res.status(OK).send(User.toResponse(user));
    next();
  })
);

router.route('/').post(
  asyncHandler(async (req, res, next) => {
    const user = new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    const newUser = await usersService.create(user);
    res.status(OK).send(User.toResponse(newUser));
    next();
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res, next) => {
    const user = new User({
      id: req.params.id,
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    const updatedUser = await usersService.update(req.params.id, user);
    res.status(OK).send(User.toResponse(updatedUser));
    next();
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res, next) => {
    await usersService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
    next();
  })
);

module.exports = router;
