import patients from '../../data/patients';
import { Patient, PatientPrivate, NewPatientEntry } from '../types';
import uuid from 'uuid/v1';

export const getPatientsSSN = (): PatientPrivate[] => {
  return patients;
};

export const getPatient = (id: string): PatientPrivate | undefined => {
  return patients.find(patient => patient.id === id);
};

export const getPatients = (): Patient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

export const addNewPatient = (entry: NewPatientEntry): PatientPrivate => {
  const newPatient: PatientPrivate = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};