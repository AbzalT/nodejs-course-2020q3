const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  await res.status(OK).json(users.map(user => User.toResponse(user))); // map user fields to exclude secret fields like "password"
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  await res.status(OK).send(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = new User({
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });
  const newUser = await usersService.create(user);
  res.status(OK).send(User.toResponse(newUser));
});

router.route('/:id').put(async (req, res) => {
  const user = new User({
    id: req.params.id,
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });
  const updatedUser = await usersService.update(req.params.id, user);
  res.status(OK).send(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
