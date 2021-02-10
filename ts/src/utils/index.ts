// eslint-disable-next-line @typescript-eslint/ban-types
function errorHandler(err: any, req: any, res: any, next: any): Object {
  if (!err) return res.json('Everything is OK!');

  return res.status(500).json({ error: err.message });
}

export { errorHandler };
