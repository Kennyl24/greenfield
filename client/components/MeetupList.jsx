import React from 'react';
import SimpleMediaCard from './SimpleMediaCard.jsx';

const MeetUpList = (props) => {
  return (
    <ul>
      {props.events.length ? props.events.map(event => <SimpleMediaCard event={event} saveEvent={props.saveEvent} seeMore={props.seeMore} key={event.id} />) : null}
    </ul>
  );
};

export default MeetUpList;
