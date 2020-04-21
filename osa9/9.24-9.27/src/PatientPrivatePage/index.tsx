import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, createAddPatientPrivate } from "../state";
import axios from 'axios';
import { PatientPrivate } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Icon, Button } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';
import AddCheckEntryModal from '../AddCheckEntryModal';
import AddHospitalEntryModal from '../AddHospitalEntry';
import { CheckEntryFormValues } from '../AddCheckEntryModal/AddEntryForm';
import { HospitalEntryFormValues } from "../AddHospitalEntry/AddEntryForm";

const PatientPrivatePage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('incorrect id');
  }
  const [{ patients }, dispatch] = useStateValue();
  const [modalHealthcheckOpen, setCheckModalOpen] = useState<boolean>(false);
  const [modalHospitalOpen, setHospitalModalOpen] = useState<boolean>(false);

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

  const submitCheckEntry = async (values: CheckEntryFormValues) => {
    try {
      const newValues = {
        ...values,
        healthCheckRating: values.healthCheckRating.toString()
      };
      const { data: editedPatient } = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`, newValues
      );
      dispatch(createAddPatientPrivate(editedPatient));
      setCheckModalOpen(false);
    } catch (e) {
      console.error(e.response.data);
      window.alert(e.response.body.error);
    }
  };

  const submitHospitalEntry = async (values: HospitalEntryFormValues) => {
    try {
      const newValues = {
        ...values,
        discharge: {
          date: values.dischargeDate,
          criteria: values.dischargeCriteria
        }
      };
      const { data: editedPatient } = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`, newValues
      );
      dispatch(createAddPatientPrivate(editedPatient));
      setHospitalModalOpen(false);
    } catch (e) {
      console.error(e.response.data);
      window.alert(e.response.body.error);
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
      <AddCheckEntryModal 
        modalOpen={modalHealthcheckOpen} 
        onClose={() => setCheckModalOpen(false)}
        onSubmit={submitCheckEntry}
      />
      <AddHospitalEntryModal
        modalOpen={modalHospitalOpen}
        onClose={() => setHospitalModalOpen(false)}
        onSubmit={submitHospitalEntry}
      />
      <Button onClick={() => setCheckModalOpen(true)}>add Healthcheck entry</Button>
      <Button onClick={() => setHospitalModalOpen(true)}>add Hospital entry</Button>
      <Header as='h3'>entries</Header>
      {viewedPatient.entries.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
    </div>
  );
};

export default PatientPrivatePage;