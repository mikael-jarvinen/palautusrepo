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
    gender: string;
    occupation: string;
}

export type Patient = Omit<PatientWithSSN, 'ssn'>;