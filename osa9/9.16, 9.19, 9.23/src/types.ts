/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface Discharge {
  date: string;
  criteria: string;
}

interface Period {
  startDate: string;
  endDate: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalHealthCareEntry extends BaseEntry{
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: Period;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry;

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
  Male= "male",
  Female= "female"
}


export type NewPatientEntry = Omit<PatientPrivate, 'id'>;

export type Patient = Omit<PatientPrivate, 'ssn' | 'entries' >;