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

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface PatientPrivate {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type Patient = Omit<PatientPrivate, 'entries'>;