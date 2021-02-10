import {Teacher} from './db/entity/Teacher';

export const createTeacher = async (body: any): Promise<Object> => {
    try {
           
    
const teacher = new Teacher();

teacher.firstName = body.firstName;
teacher.lastName = body.lastName;
teacher.specialization = body.specialization;
teacher.sex = body.sex;
teacher.age = body.age;


    return teacher;
    } catch (error) {
        console.error(error);
        throw error;
    }
}