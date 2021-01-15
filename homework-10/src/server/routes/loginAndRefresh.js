const express = require('express');

const jwt = require('jsonwebtoken');

const {
  accessSecret,
  refreshSecret,
  tokenLife,
  refreshTokenLife,
  username: usrnm,
  password: pswrd,
} = require('../../config');

const loginAndRefresh = express.Router();

let tokenList = {};

loginAndRefresh.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (usrnm !== username || pswrd !== password) {
      throw new Error('username or password is incorrect!');
    }

    const accessToken = jwt.sign({ username }, accessSecret, { expiresIn: tokenLife });
    const refreshToken = jwt.sign({ username }, refreshSecret, { expiresIn: refreshTokenLife });

    const response = {
      message: 'Logged in',
      accessToken,
      refreshToken,
    };

    tokenList = response;

    res.json({ response });
  } catch (err) {
    next(err);
  }
});

loginAndRefresh.post('/refresh', async (req, res, next) => {
  try {
    const { username, password, refreshToken: token } = req.body;

    if (usrnm !== username || pswrd !== password) {
      throw new Error('username or password is incorrect!');
    }

    if (token !== tokenList.refreshToken) {
      throw new Error('refreshToken is invalid!');
    }

    const accessToken = jwt.sign({ username }, accessSecret, { expiresIn: tokenLife });
    const refreshToken = jwt.sign({ username }, refreshSecret, { expiresIn: refreshTokenLife });

    const response = {
      message: 'refreshed',
      accessToken,
      refreshToken,
    };

    tokenList = response;

    res.json({ response });
  } catch (err) {
    next(err);
  }
});

module.exports = loginAndRefresh;
