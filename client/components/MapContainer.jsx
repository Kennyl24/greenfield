import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MeetupMap from './MeetupMap.jsx';
import config from '../../config.js';

class MapContainer extends React.Component {
  render() {
    return (
      <div>
        <MeetupMap
          google={this.props.google}
          initialCenter = {this.props.initialLocation}
          zoom = {13}
          meetups={this.props.meetups}
          seeMore = {this.props.seeMore}
          {...this.props}
          />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.GOOGLE_MAPS_API_KEY,
  libraries:['places']
})(MapContainer)
