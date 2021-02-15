import { Teacher } from './db/entity/Teacher';
import { getRepository } from 'typeorm';
// import { Teacher:  } from './models/interface';

export const createTeacher = async (body: Teacher[]): Promise<Teacher[]> => {
  try {
    const teacher = getRepository(Teacher).create(body);

    const result = await getRepository(Teacher).save(teacher);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTeacher = async (query: string): Promise<Teacher | null> => {
  try {
    const teacher = await getRepository(Teacher).findOne(query);

    if (!teacher) return null;

    return teacher;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTeacher = async (body: Teacher, query: string): Promise<Teacher | null> => {
  try {
    const teacher = await getRepository(Teacher).findOne({ where: { query } });

    if (!teacher) return null;

    getRepository(Teacher).merge(teacher, body);
    const result = await getRepository(Teacher).save(teacher);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTeacher = async (query: string): Promise<string> => {
  try {
    await getRepository(Teacher).delete(query);

    return 'Teacher has been deleted';
  } catch (error) {
    console.error(error);
    throw error;
  }
};
