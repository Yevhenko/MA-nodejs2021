const jwt = require('jsonwebtoken');

const { accessSecret } = require('../config');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) res.sendStatus(401);

  jwt.verify(token, accessSecret, (err, data) => {
    if (err) return res.sendStatus(403);
    req.context = data;
    return next();
  });
}

module.exports = { authenticate };
