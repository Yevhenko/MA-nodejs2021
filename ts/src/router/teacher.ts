import express from 'express';
import { createTeacher, updateTeacher, getTeacher, deleteTeacher } from '../controller';

const teacher = express.Router();

teacher.post('/teacher', async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) res.sendStatus(404).send('no body');

    const response = await createTeacher(body);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

teacher.put('/teacher', async (req, res, next) => {
  try {
    const { body, query } = req;

    const teacherId = Number(query.id);

    if (!body && !teacherId) res.sendStatus(404).send('no body');

    const response = await updateTeacher(query, body);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

teacher.delete('/teacher', async (req, res, next) => {
  try {
    const { query } = req;

    const teacherId = Number(query.id);

    if (!teacherId) res.sendStatus(404).send('id not found');

    await deleteTeacher(query);

    res.send('Teacher has been deleted');
  } catch (error) {
    next(error);
  }
});

teacher.get('/teacher', async (req, res, next) => {
  try {
    const { query } = req;

    const teacherId = Number(query.id);

    if (!teacherId) res.sendStatus(404).send('id not found');

    const response = await getTeacher(query);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export = teacher;
