import React from 'react';

const strip = (html) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent;
};

const SavedListEntry = (props) => {
  const desc = strip(props.event.description).slice(0,150) + '...';
  return (
    <div className="mappedEvents">
      <a href={props.event.link} target="_blank">
        <li>{props.event.name}</li>
      </a>
      <div className="eventDescription">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{desc}</div>
      <button onClick={() => { props.seeMore(props.event.name); }}>See more</button>
    </div>
  );
};
export default SavedListEntry;
