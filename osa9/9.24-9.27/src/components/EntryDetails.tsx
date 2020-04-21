import React from 'react';
import { Entry } from '../types';
import { Icon, Header } from 'semantic-ui-react';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <Header as="h4">{entry.date} <Icon className="doctor"/></Header>
      <i>{entry.description}</i>
    </div>
  );
};

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <Header as="h4">{entry.date} <Icon className="doctor"/></Header>
      <i>{entry.description}</i>
    </div>
  );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <Header as="h4">{entry.date} <Icon className="stethoscope"/></Header>
      <i>{entry.description}</i>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
  case "Hospital":
    return (
      <div style={{ border: "1px solid grey", borderRadius: 3, padding: 10 }}>
        <HospitalEntry entry={entry}/>
      </div>
    );
  case "HealthCheck":
    return (
      <div style={{ border: "1px solid grey", borderRadius: 3, padding: 10 }}>
        <HealthCheckEntry entry={entry}/>
      </div>
    );
  case "OccupationalHealthcare":
    return (
      <div style={{ border: "1px solid grey", borderRadius: 3, padding: 10 }}>
        <OccupationalHealthcareEntry entry={entry} />
      </div>
    );
  }
};

export default EntryDetails;