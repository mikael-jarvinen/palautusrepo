export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientWithSSN {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export enum Gender {
  male= "male",
  female= "female"
}

export type NewPatientEntry = Omit<PatientWithSSN, 'id'>;

export type Patient = Omit<PatientWithSSN, 'ssn'>;