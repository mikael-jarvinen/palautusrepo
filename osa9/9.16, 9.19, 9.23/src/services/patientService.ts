import patients from '../../data/patients';
import { Patient, PatientPrivate, NewPatientEntry } from '../types';
import uuid from 'uuid/v1';
import { Entry } from '../types';

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

export const addEntry = (id: string, entry: Entry): PatientPrivate | undefined => {
  patients.find(patient => patient.id === id)?.entries.push(entry);
  const editedPatient = patients.find(patient => patient.id === id);
  if(!editedPatient) {
    return undefined;
  }
  return {
    ...editedPatient,
  };
};

export const addNewPatient = (entry: NewPatientEntry): PatientPrivate => {
  const newPatient: PatientPrivate = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};