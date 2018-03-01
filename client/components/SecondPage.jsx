import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './Search.jsx';
import ProfileCard from './ProfileCard.jsx';
import SeeMoreCard from './SeeMoreCard.jsx';
import EventList from './EventList.jsx';
import moment from 'moment';
import MapContainer from '../components/MapContainer.jsx';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      events: [],
      lat: '',
      lon: '',
      profile: '',
      meetup: {},
      group: {},
      photo: {},
      description: '',
      displayCard: false,
      displaySeeMore: false,
      date: '',
      categories: [],
    };
    this.saveEvent = this.saveEvent.bind(this);
    this.closeButton = this.closeButton.bind(this);
    this.onProfileClick = this.onProfileClick.bind(this);
    this.fetchProfileInfo = this.fetchProfileInfo.bind(this);
    this.getZipcode = this.getZipcode.bind(this);
    this.strip = this.strip.bind(this);
    this.getMeetups = this.getMeetups.bind(this);
    this.weKnowTheLocation = this.weKnowTheLocation.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.id = 0;
    this.seeMore = this.seeMore.bind(this);
    this.getMeetupsByCategory = this.getMeetupsByCategory.bind(this);
  }
  componentDidMount() {
    const options = {
      enableHighAccuracy: false,
      timeout: 8000,
      maximumAge: 0,
    };
    this.fetchProfileInfo();
    this.id = navigator.geolocation.getCurrentPosition(this.weKnowTheLocation, this.errorHandler, options);
  }
  onProfileClick() {
    this.setState({ displayCard: !this.state.displayCard });
  }
  getZipcode(event) {
    this.setState({ zipcode: event.target.value });
  }
  getMeetups() {
    $.ajax({
      url: '/meetups',
      type: 'GET',
      contentType: 'application/json',
      data: { zipcode: this.state.zipcode, lat: this.state.lat, lon: this.state.lon },
      success: (data) => {
        this.setState({ meetups: JSON.parse(data.meetups) });
      },
      error: () => {
      },
    }).done((data) => {
      let meetups = data.meetups;
      meetups = JSON.parse(meetups);
      const categories = data.categories;
      this.setState({
        lat: meetups.city.lat,
        lon: meetups.city.lon,
        events: meetups.events,
      });
    });
  }
  getMeetupsByCategory(searchOptions) {
    searchOptions.lat = this.state.lat;
    searchOptions.lon = this.state.lon;
    $.ajax({
      url: '/meetups/categories',
      type: 'GET',
      contentType: 'application/json',
      data: searchOptions,
      success: () => {
      },
      error: () => {
      },
    }).done((data) => {
      let meetups = data.meetups;
      meetups = JSON.parse(meetups).results;
      this.setState({ events: meetups });
    });
  }
  closeButton() {
    this.setState({
      displaySeeMore: !this.state.displaySeeMore,
    });
  }
  saveEvent() {
    window.currentEvents.push(this.state.meetup);
  }
  weKnowTheLocation(pos) {
    const crd = pos.coords;
    const thisLat = crd.latitude;
    const thisLon = crd.longitude;
    this.setState({ lat: thisLat });
    this.setState({ lon: thisLon });
    navigator.geolocation.clearWatch(this.id);
    this.getMeetups();
  }
  errorHandler() {
    const usersZip = prompt('What is your zipcode?');
    this.setState({ zipcode: usersZip });
    this.getMeetups();
  }
  fetchProfileInfo() {
    $.ajax({
      url: '/users',
      method: 'GET',
      success: (data) => {
        this.setState({
          profile: data,
        });
      },
      error: () => {
      },
    });
  }
  seeMore(marker) {
    this.state.events.map((event) => {
      if (event.name === marker) {
        this.setState({
          meetup: event,
          description: this.strip(event.description),
          group: event.group,
          photo: event.group.photo ? event.group.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS5QBzAjXODH-QDaa6tVLGT10ZHa8aiJzgKL_n4F-a_H9lnuA-fQ',
          displaySeeMore: true,
          date: moment(event.local_date, 'YYYY-MM-DD').format('MM-DD-YYYY').split('-').join('/'),
        });
      }
    });
  }
  strip(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent;
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <div>
              <AppBar style={{ position: 'fixed' }} title={<span style={{ backgroundColor: '#f47023' }}><img src="../minglr.gif" alt="" /></span>}showMenuIconButton={false} style={{ backgroundColor: '#f47023' }} >
                <FlatButton primary={true} style={{ padding: '10px', minWidth: 'none' }}><Link to={{ pathname:'/home' }}>Home</Link></FlatButton>                                                                                                                                                                                                                         <FlatButton style={{ padding: '10px', minWidth: 'none' }}><Link to={{ pathname:'/create' }}>Create event</Link></FlatButton>
                <FlatButton style={{ padding: '10px', minWidth: 'none' }} ><Link to={{ pathname: '/logout' }}>Logout</Link></FlatButton>
                <FlatButton style={{ padding: '10px', minWidth: 'none' }}><Link to={{ pathname: '/profile' }}>Profile</Link></FlatButton>
              </AppBar>
              <div className="secondBar">
                <Search categories={this.state.categories} handleSearch={this.getMeetupsByCategory} />
              </div>
            </div>
          </div>
          {this.state.displayCard ? <ProfileCard profile={this.state.profile} /> : null}
          <div className="map">
            <div className="cardTest" style={{ backgroundColor: '#f8f5f1' }}>
              {this.state.displaySeeMore ? <SeeMoreCard saveEvent={this.saveEvent} closeButton={this.closeButton}meetup={this.state.meetup} group={this.state.group} photo={this.state.photo} date={this.state.date} description={this.state.description}/> : null}
            </div>
            <div>
              <MapContainer
                meetups={this.state.events}
                seeMore={this.seeMore}
                initialLocation={{ lat: this.state.lat, lng: this.state.lon }}
              />
            </div>
          </div>
          <div>
            <EventList style={{ marginTop: '600px', position: 'relative' }}events={this.state.events} saveEvent={this.saveEvent} closeButton={this.closeButton} seeMore={this.seeMore}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
window.currentEvents = [];
export default SecondPage;
