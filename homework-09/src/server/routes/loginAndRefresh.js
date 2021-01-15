const { query } = require('express');
const express = require('express');

const jwt = require('jsonwebtoken');

// eslint-disable-next-line object-curly-newline
const { accessSecret, refreshSecret, tokenLife, refreshTokenLife } = require('../../config');

const { createToken, findUser } = require('../controller');

const loginAndRefresh = express.Router();

const user = findUser(query);

loginAndRefresh.post('/login', async (req, res, next) => {
  try {
    const {
      query: { username, password },
    } = req.body;

    if (!username || !password) {
      res.status(404).send('Not found');
    }

    if (user.username !== username || user.password !== password) {
      throw new Error('username or password is incorrect!');
    }

    const accessToken = jwt.sign({ username }, accessSecret, { expiresIn: tokenLife });
    const refreshToken = jwt.sign({ username }, refreshSecret, { expiresIn: refreshTokenLife });

    await createToken(query, refreshToken);

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
    const {
      query: { username, password, refreshToken: token },
    } = req.body;

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

    await createToken(query, newRefreshToken);

    res.json({ response });
  } catch (err) {
    next(err);
  }
});

module.exports = loginAndRefresh;
