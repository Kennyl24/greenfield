import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const EventForm = () => (
  <MuiThemeProvider>
    <div>
      <AppBar title={<span style={{ backgroundColor: '#f47023' }}><img src="../minglr.gif" alt="" /></span>}showMenuIconButton={false} style={{ backgroundColor: '#f47023' }}>
        <FlatButton primary><Link to={{ pathname: '/home' }}>Home</Link></FlatButton>
        <FlatButton ><Link to={{ pathname: '/create' }}>Create Event</Link></FlatButton>
        <FlatButton ><Link to={{ pathname: '/logout' }}>Logout</Link></FlatButton>
        <FlatButton ><Link to={{ pathname: '/profile' }}>Profile</Link></FlatButton>
      </AppBar>
      <div className="eventCreation">
        <h2 style={{ textAlign: 'center', color: 'black' }}>Create an Event</h2>
        <br />
        <form action="/events" method="post">
          <input className="eventName" placeholder="Enter event name" name="eventName" type="text" />
          <input className="eventLocation" placeholder="Enter event location" name="eventLocation" type="text" />
          <input className="eventTopic" placeholder="Enter event topic" name="eventTopic" type="text" />
          <input className="eventDate" placeholder="Enter event date" name="eventTime" type="text" />
          <input className="eventTime" placeholder="Enter event time" name="eventDate" type="text" />
          <input className="eventDescription" placeholder="Enter in a description of the event" name="eventDescription" type="text" />
          <br />
          <button>Create Event</button>
        </form>
      </div>
    </div>
  </MuiThemeProvider>
);
export default EventForm;
