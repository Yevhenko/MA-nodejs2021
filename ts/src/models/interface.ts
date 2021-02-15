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
