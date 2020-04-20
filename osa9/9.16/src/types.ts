/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {
}

export interface PatientPrivate {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
  male= "male",
  female= "female"
}


export type NewPatientEntry = Omit<PatientPrivate, 'id'>;

export type Patient = Omit<PatientPrivate, 'ssn' | 'entries' >;