import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import FlatButton from 'material-ui/flatbutton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SavedList from './SavedList.jsx';
import SeeMoreCard from './SeeMoreCard.jsx';
import CreatedList from './CreatedList.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      myEvents: window.currentEvents || null,
      displaySeeMore: false,
      meetup: [],
      description: '',
      group: '',
      photo: '',
      date: '',
      eventData: [],
    };
    this.closeButton = this.closeButton.bind(this);
    this.storageArray = this.storageArray.bind(this);
    this.seeMore = this.seeMore.bind(this);
    this.strip = this.strip.bind(this);
    this.fetchPostedEvent = this.fetchPostedEvent.bind(this);
  }
  componentDidMount() {
    this.fetchPostedEvent();
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
  componentWillUnmount() {
    this.storageArray();
  }
  closeButton() {
    this.setState({
      displaySeeMore: !this.state.displaySeeMore,
    });
  }
  storageArray() {
    $.ajax({
      url: '/userevents',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(this.state.myEvents),
      success: () => {
      },
      error: () => {
      },
    });
  }
  seeMore(marker) {
    this.state.myEvents.map((event) => {
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
  fetchPostedEvent() {
    $.ajax({
      method: 'GET',
      url: '/events',
      dataType: 'json',
      success: (modelData) => {
        this.setState({
          eventData: modelData[0],
        });
      },
      error: () => {
      },
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title={<span style={{ backgroundColor: '#f47023' }}><img src="../minglr.gif" alt="" /></span>}showMenuIconButton={false} style={{ backgroundColor: '#f47023' }}>
            <FlatButton primary={true}><Link to={{ pathname: '/home' }}>Home</Link></FlatButton>
            <FlatButton ><Link to={{ pathname: '/create' }}>Create event</Link></FlatButton>
            <FlatButton ><Link to={{ pathname: '/logout' }}>Logout</Link></FlatButton>
            <FlatButton ><div to={{ pathname: '/profile' }} onClick={this.onProfileClick}>Profile</div></FlatButton>
          </AppBar>
          <div className="profile">
            <img src="https://i.pinimg.com/736x/08/61/b7/0861b76ad6e3b156c2b9d61feb6af864--facebook-profile-profile-pictures.jpg" alt="John" style={{ margin: '0 auto', width: '150px', height: '100px' }} />
            <p className="title">{this.state.profile.username}</p>
            <p>{this.state.profile.location}</p>
            <p>{this.state.profile.age}</p>
            <p>{this.state.profile.biography}</p>
          </div>
          <div className="map" style={{ width: '25%' }}>
            <div className="cardTest">
              {this.state.displaySeeMore ? <SeeMoreCard closeButton={this.closeButton}meetup={this.state.meetup} group={this.state.group} photo={this.state.photo} date={this.state.date} description={this.state.description}/> : null}
            </div>
          </div>
          <div className="list" style={{ float: 'right' }}>
            {this.state.eventData.length > 0 ? <CreatedList createdEvents={this.state.eventData} /> : null}
          </div>
          <div className="list" style={{ float: 'right' }}>
            {this.state.myEvents.length > 0 ? <SavedList myEvents={this.state.myEvents} seeMore={this.seeMore} /> : null}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default Profile;
