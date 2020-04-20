import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import axios from 'axios';
import { PatientPrivate } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Icon } from 'semantic-ui-react';

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

  const viewedPatient = patients[id];
  let gender = "";
  if(viewedPatient.gender === "male") {
    gender = "mars";
  } else {
    gender = "venus";
  }

  return (
    <div>
      <Header as='h1'>{viewedPatient.name} <Icon className={gender} /></Header>
      <Header>ssn: {viewedPatient.ssn}</Header>
      <Header>occupation: {viewedPatient.occupation}</Header>
    </div>
  );
};

export default PatientPrivatePage;