import React from 'react';
import SavedListEntry from './SavedListEntry.jsx';

const SavedList = props => (
  <div>
    <div>My Current Saved Events</div>
    <ul>
      {props.myEvents.map(event => <SavedListEntry event={event} seeMore={props.seeMore} key={event.id} />)}
    </ul>
  </div>
);


export default SavedList;
