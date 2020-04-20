import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import axios from 'axios';
import { PatientPrivate } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Icon } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';

const PatientPrivatePage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('incorrect id');
  }
  const [{ patients }, dispatch] = useStateValue();

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
      <Header as='h3'>entries</Header>
      {viewedPatient.entries.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
    </div>
  );
};

export default PatientPrivatePage;