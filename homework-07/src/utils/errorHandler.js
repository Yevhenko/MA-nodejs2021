function errorHandler(err, req, res, next) {
  if (!err) return res.json('Everything is OK!');

  return res.status(500).json({ error: err.message });
}

module.exports = { errorHandler };
