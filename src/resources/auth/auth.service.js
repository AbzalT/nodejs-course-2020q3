const {
  OK,
  FORBIDDEN,
  UNAUTHORIZED,
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR
} = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/user.DB.model');
const { JWT_SECRET_KEY } = require('../../common/config');

const errorHandler = (res, error) => {
  res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message ? error.message : error
  });
};

const login = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login });
  if (candidate) {
    const passwordResult = await bcrypt.compare(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const token = jwt.sign(
        {
          login: candidate.login,
          userId: candidate._id
        },
        JWT_SECRET_KEY,
        { expiresIn: 3600 }
      );
      res.status(OK).json({
        token: `${token}`
        // token: `Bearer ${token}`
      });
      console.log('Вход произведен');
    } else {
      res.status(UNAUTHORIZED).json({
        message: 'Неверный пароль.'
      });
    }
  } else {
    res.status(FORBIDDEN).json({
      message: 'Пользователь не найден.'
    });
  }
};
const register = async (req, res) => {
  const _login = req.body.login;
  const _password = req.body.password;
  createUser(res, _login, _password);
};

const createUser = async (res, _login, _password) => {
  const candidate = await User.findOne({ login: _login });
  if (candidate) {
    res.status(CONFLICT).json({
      message: 'Такой пользователь уже существует.'
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const password = _password;
    const user = new User({
      login: _login,
      password: await bcrypt.hash(password, salt)
    });
    try {
      await user.save().then(() => console.log('User created!'));
      res.status(CREATED).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

const createAdmin = async () => {
  const salt = await bcrypt.genSalt(10);
  const admin = new User({
    login: 'admin',
    password: await bcrypt.hash('admin', salt)
  });
  try {
    await admin.save().then(() => console.log('Admin created!'));
  } catch (e) {
    const message = e.message ? e.message : e;
    console.log(message);
  }
};
module.exports = { login, register, createAdmin };
