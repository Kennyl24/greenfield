import React from 'react';
import MeetupListEntry from './MeetupListEntry.jsx';
import SimpleMediaCard from './SimpleMediaCard.jsx';
import FirstPage from './FirstPage.jsx';
const MeetUpList = function(props)  {
  return(
    <ul>
      {props.events.length ? props.events.map((event) => <SimpleMediaCard event={event} seeMore={props.seeMore} key={event.id}/>) : null}
    </ul>
  );

}

export default MeetUpList;
