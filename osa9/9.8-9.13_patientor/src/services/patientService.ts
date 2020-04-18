import patients from '../../data/patients';
import { Patient, PatientWithSSN } from '../types';

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