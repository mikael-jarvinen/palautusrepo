import patients from '../../data/patients';
import { Patient, PatientWithSSN, NewPatientEntry } from '../types';
import uuid from 'uuid/v1';

export const getPatientsSSN = (): PatientWithSSN[] => {
  return patients;
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

export const addNewPatient = (entry: NewPatientEntry): PatientWithSSN => {
  const newPatient: PatientWithSSN = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};