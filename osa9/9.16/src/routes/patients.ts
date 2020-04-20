import { getPatients, addNewPatient, getPatient } from '../services/patientService';
import express from 'express';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(getPatient(id));
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