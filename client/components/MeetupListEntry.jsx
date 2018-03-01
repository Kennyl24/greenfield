import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const strip = (html) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent;
};
const MeetupListEntry = (props) => {
  const desc = strip(props.event.description).slice(0, 150) + '...';
  return (
    <div className="mappedEvents">
      <a href={props.event.link} target="_blank">
        <li>{props.event.name}</li>
      </a>
      <div className="eventDescription">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{desc}</div>
      <FlatButton style={{ textDecoration: 'underline' }}onClick={() => { props.seeMore(props.event.name); }}>See More</FlatButton>
    </div>
  );
};
export default MeetupListEntry;
