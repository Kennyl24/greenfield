import React from 'react';
  const CreatedListEntry = function(props) {
    return <div className="mappedEvents"><h8 style={{fontSize: '18px'}}>{props.event.event_name}</h8>
    <div className="eventDescription">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: {props.event.event_description}</div><div>Date: {props.event.event_date}</div><div>Time: {props.event.event_time}</div><div>Location: {props.event.event_location}</div><hr></hr></div>
  }
 export default CreatedListEntry;
