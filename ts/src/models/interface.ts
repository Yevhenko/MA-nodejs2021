enum Subject {
  Math,
  PE,
  Literature,
  Physics,
  Biology,
}

export interface Teacher {
  readonly fullName: string;
  readonly lastName: string;
  specialization: Subject;
  gender: string;
  age: number;
}

export interface Classroom {
  identifier: number;
  floor: number;
  isTechnicallyEquipped: boolean;
}

export interface Lesson {
  subject: Subject;
  needTechEquipment: boolean;
}

export interface Config {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: Array<string>;
  migrations: Array<string>;
  subscribers: Array<string>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  cli?: Object;
}
