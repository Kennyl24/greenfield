import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import CreatedListEntry from './CreatedListEntry.jsx';

const CreatedList = props => (
  <div>
    <div>My created events</div>
    <ul>
      {props.createdEvents.length > 0 ? props.createdEvents.map((event, key) => <CreatedListEntry event={event} key={key} />) : null}
    </ul>
    <div>
      <FlatButton style={{ textDecoration: 'underline' }}><Link to={{ pathname: '/create' }}>Add an event</Link></FlatButton>
    </div>
  </div>
);

export default CreatedList;
