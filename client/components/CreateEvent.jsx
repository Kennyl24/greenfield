import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EventForm from './EventForm.jsx';

const CreateEvent = () => (
  <MuiThemeProvider>
    <div>
      <EventForm />
    </div>
  </MuiThemeProvider>
);

export default CreateEvent;
