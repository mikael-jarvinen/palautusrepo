import { State } from "./state";
import { Patient, Diagnose } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
      diagnoses: Diagnose[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_PRIVATE";
      payload: Patient;
    };

export const createSetList = (payload: Patient[], diagnoses: Diagnose[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload,
    diagnoses
  };
};

export const createAddPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload
  };
};

export const createAddPatientPrivate = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT_PRIVATE",
    payload
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        },
        diagnoses: action.diagnoses
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'ADD_PATIENT_PRIVATE':
      const id = action.payload.id;
      let newPatients = {};
      for (const key in state.patients) {
        const patient = state.patients[key];
        if (patient.id !== id) {
          newPatients = {
            ...newPatients,
            [patient.id]: patient
          };
        }
      }
      newPatients = {
        ...newPatients,
        [id]: action.payload
      };
      return {
        ...state,
        patients: newPatients
      };
    default:
      return state;
  }
};
