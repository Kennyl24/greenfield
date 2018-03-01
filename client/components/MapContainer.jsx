import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MeetupMap from './MeetupMap.jsx';
import config from '../../config.js';

const MapContainer = (props) => {
  return (
    <div>
      <MeetupMap
        google={props.google}
        initialCenter={props.initialLocation}
        zoom={13}
        meetups={props.meetups}
        seeMore={props.seeMore}
        {...props}
      />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: config.GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
})(MapContainer);
