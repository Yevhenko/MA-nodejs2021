const express = require('express');

const jwt = require('jsonwebtoken');

// eslint-disable-next-line object-curly-newline
const { accessSecret, refreshSecret, tokenLife, refreshTokenLife } = require('../../config');

const { createToken, findUser } = require('../controller');

const loginAndRefresh = express.Router();

loginAndRefresh.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const { username, password } = body;

    const user = await findUser(body);

    if (!username || !password) {
      res.status(404).send('Not found');
    }

    if (user.username !== username || user.password !== password) {
      throw new Error('username or password is incorrect!');
    }

    const accessToken = jwt.sign({ username }, accessSecret, { expiresIn: tokenLife });
    const refreshToken = jwt.sign({ username }, refreshSecret, { expiresIn: refreshTokenLife });

    await createToken(body, refreshToken);

    const response = {
      message: 'Logged in',
      accessToken,
      refreshToken,
    };

    res.json({ response });
  } catch (err) {
    next(err);
  }
});

loginAndRefresh.post('/refresh', async (req, res, next) => {
  try {
    const { body } = req;
    const { username, password, refreshToken: token } = body;

    const user = await findUser(body);

    if (!username || !password) {
      res.status(404).send('Not found');
    }

    if (user.username !== username || user.password !== password) {
      throw new Error('username or password is incorrect!');
    }

    if (token !== user.token) {
      throw new Error('refreshToken is invalid!');
    }

    const accessToken = jwt.sign({ username }, accessSecret, { expiresIn: tokenLife });
    const newRefreshToken = jwt.sign({ username }, refreshSecret, { expiresIn: refreshTokenLife });

    const response = {
      message: 'refreshed',
      accessToken,
      newRefreshToken,
    };

    await createToken(body, newRefreshToken);

    res.json({ response });
  } catch (err) {
    next(err);
  }
});

module.exports = loginAndRefresh;
