import { getPatients, addNewPatient, getPatient, addEntry } from '../services/patientService';
import express from 'express';
import { toNewPatientEntry } from '../utils';
import { Entry } from '../types';
import uuid from 'uuid/v1';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(getPatient(id));
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if(!body.description || !body.date || !body.specialist) {
    return res.send("Incorrect or missing fields");
  }

  let entry: Entry = {
    ...body,
    id: uuid()
  };
  switch (body.type) {
  case "HealthCheck":
    if(!body.healthCheckRating) {
      return res.send("Incorrect or missing fields");
    }
    entry = {
      id: uuid(),
      ...body
    };
    break;
  case "Hospital":
    if(!body.discharge) {
      return res.send("Incorrect or missing fields");
    }
    entry = {
      id: uuid(),
      ...body
    };
    break;
  case "OccupationalHealthcare":
    if(!body.employerName) {
      return res.send("Incorrect or missing fields");
    }
    entry = {
      id: uuid(),
      ...body
    };
    break;
  default:
    res.send("Incorrect or missing field: type");
    break;
  }

  return res.send(addEntry(id, entry));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = addNewPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;