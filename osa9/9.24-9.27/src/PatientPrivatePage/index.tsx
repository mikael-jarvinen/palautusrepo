import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, createAddPatientPrivate } from "../state";
import axios from 'axios';
import { PatientPrivate } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Icon, Button } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPrivatePage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('incorrect id');
  }
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<PatientPrivate>(`${apiBaseUrl}/patients/${id}`);
        dispatch({ type: 'ADD_PATIENT_PRIVATE', payload: patient });
      } catch (e) {
        console.log(e);
      }
    };
    fetchPatient();
  }, [dispatch]);

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const newValues = {
        ...values,
        healthCheckRating: values.healthCheckRating.toString()
      };
      const { data: editedPatient } = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`, newValues
      );
      dispatch(createAddPatientPrivate(editedPatient));
      setModalOpen(false);
    } catch (e) {
      console.error(e.response.data);
    }
  };

  const viewedPatient: PatientPrivate = patients[id] as PatientPrivate;
  let gender = "";
  if(viewedPatient.gender === "male") {
    gender = "mars";
  } else {
    gender = "venus";
  }

  if(!viewedPatient.entries) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Header as='h1'>{viewedPatient.name} <Icon className={gender} /></Header>
      <Header as='h4'>ssn: {viewedPatient.ssn}</Header>
      <Header as='h4'>occupation: {viewedPatient.occupation}</Header>
      <AddEntryModal 
        modalOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        onSubmit={submitEntry}
      />
      <Button onClick={() => setModalOpen(true)}>add entry</Button>
      <Header as='h3'>entries</Header>
      {viewedPatient.entries.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
    </div>
  );
};

export default PatientPrivatePage;