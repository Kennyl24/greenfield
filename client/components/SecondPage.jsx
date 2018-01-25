import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import MeetUpList from './MeetUpList.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import Search from './Search.jsx';
import ProfileCard from './ProfileCard.jsx';
import SeeMoreCard from './SeeMoreCard.jsx';
import SimpleMediaCard from './SimpleMediaCard.jsx';
import LoginForm from './LoginForm.jsx';
import GuttersGrid from './GuttersGrid.jsx';
import SignUpForm from './SignUpForm.jsx';
import moment from 'moment';
import MapContainer from '../components/MapContainer.jsx';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter, Router, Route, browserHistory, Switch, IndexRoute} from 'react-router-dom';
const path = require('path');
class SecondPage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        meetups: [],
        items: [],
        zipcode: '',
        events: [],
        location: '',
        lat: '',
        lon: '',
        zipcodeAsker: '',
        zipcodebutton: '',
        profile: '',
        meetup: {},
        group: {},
        photo: {},
        description: '',
        displayCard: false,
        displaySeeMore: false,
        date: '',
        currentEvents: [],
        showProfile: false,
        date: '',
        categories: [],
      }
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
    strip(html) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent;
    }
    seeMore(marker) {
      console.log('I am in here at least', marker)
      this.state.events.map((event) => {
        console.log(event)
        if(event.name === marker){
          console.log('in here tooo')
          this.setState({
            meetup: event,
            description: this.strip(event.description),
            group: event.group,
            photo: event.group.photo ? event.group.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS5QBzAjXODH-QDaa6tVLGT10ZHa8aiJzgKL_n4F-a_H9lnuA-fQ',
            displaySeeMore: true,
            date: moment(event.local_date, "YYYY-MM-DD").format("MM-DD-YYYY").split('-').join('/')
          })
        }
      });
    }
    weKnowTheLocation (pos) {
      var crd = pos.coords;
      var thisLat = crd.latitude;
      var thisLon = crd.longitude;
      this.setState({lat: thisLat});
      this.setState({lon: thisLon});
      navigator.geolocation.clearWatch(this.id);
      this.getMeetups();
    };
    saveEvent() {
      console.log('saving');
      window.currentEvents.push(this.state.meetup);
    }
    errorHandler () {
        var usersZip = prompt('What is your zipcode?');
        this.setState({zipcode: usersZip});
        this.getMeetups();
        // this.setState({zipcodeAsker: (<input id="ourZip" placeholder="What is your zipcode?" value={this.state.zipcodes} onChange={this.getZipcode}></input>)});
        // this.setState({zipcodebutton: ( <RaisedButton className="meetupRequest" label="Search" onClick={this.getMeetups}></RaisedButton>)});//<button id="meetupRequest" onClick={this.getMeetups}>Find MeetUps</button>)});
      };
    fetchProfileInfo() {
      $.ajax({
      url: '/users',
      method: 'GET',
      success: (data) => {
        this.setState({
          profile: data
        });
      },
      error: (error) => {
        console.log('fail safe', error)
      }
    });
    }
    closeButton() {
      this.setState({
        displaySeeMore: !this.state.displaySeeMore
      })
    }
    componentDidMount() {
      var options = {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 0
      };
      this.fetchProfileInfo();
      this.id = navigator.geolocation.getCurrentPosition(this.weKnowTheLocation, this.errorHandler, options);
    }

    getZipcode(event) {
      this.setState({zipcode : event.target.value});
    }
    onProfileClick() {
      this.setState({displayCard: !this.state.displayCard});
    }
    getMeetups() {
     $.ajax({
       url: '/meetups',
       type: 'GET',
       contentType: 'application/json',
       data: {zipcode : this.state.zipcode, lat: this.state.lat, lon: this.state.lon},
       success: (data) => {
        console.log(JSON.parse(data.meetups));
        this.setState({meetups : JSON.parse(data.meetups)});
       },
       error: (err) => {
         console.log('an error is happen');
       }
     }).done((data) => {
       var meetups = data.meetups;
       meetups = JSON.parse(meetups);
       var categories = data.categories;
       this.setState({
         lat: meetups.city.lat,
         lon: meetups.city.lon,
         location: meetups.city,
         events: meetups.events,
         categories: categories
       })
      });
     }
    getMeetupsByCategory(searchOptions){
    searchOptions.lat = this.state.lat;
    searchOptions.lon = this.state.lon;
    $.ajax({
      url: '/meetups/categories',
      type: "GET",
      contentType: 'application/json',
      data: searchOptions,
      success: (data) => {
      },
      error: (err) => {
        console.log(err);
      }
    })
    .done((data) => {
      var meetups = data.meetups;
      meetups = JSON.parse(meetups).results;
      this.setState({events: meetups});
    });
    ;
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
      <div>
      <div>
      <AppBar style={{position:'fixed'}} title={<span style={{backgroundColor: '#f47023'}}><img src='../minglr.gif'/></span>}showMenuIconButton={false} style={{backgroundColor: '#f47023'}}>
      <FlatButton primary={true} style={{padding: '10px', minWidth: 'none'}}><Link to={{pathname:'/home'}}>Home</Link></FlatButton>                                                                                                                                                                                                                         <FlatButton style={{padding: '10px', minWidth: 'none'}}><Link to={{pathname:'/create'}}>Create event</Link></FlatButton>
      <FlatButton style={{padding: '10px', minWidth: 'none'}} ><Link to={{pathname:'/logout'}}>Logout</Link></FlatButton>
      <FlatButton style={{padding: '10px', minWidth: 'none'}}><Link to={{pathname:'/profile'}}>Profile</Link></FlatButton>
      </AppBar>
      <div className="secondBar">
      <Search categories={this.state.categories} handleSearch={this.getMeetupsByCategory}/>
      </div>
      </div>
      </div>
      {this.state.displayCard ? <ProfileCard profile={this.state.profile}/> : null}
      <div className="map">
       <div className ="cardTest" style={{backgroundColor: '#f8f5f1'}}>
      {this.state.displaySeeMore ? <SeeMoreCard saveEvent={this.saveEvent} closeButton={this.closeButton}meetup={this.state.meetup} group={this.state.group} photo={this.state.photo} date={this.state.date} description={this.state.description}/> : null}
      </div>
      <div>
        
       <MapContainer meetups={this.state.events} seeMore={this.seeMore}
       initialLocation={{lat: this.state.lat, lng: this.state.lon}}
       />

      </div>
      </div>
      <div>
      </div>
      <div>
      <GuttersGrid style={{marginTop: '600px', position: 'relative'}}events={this.state.events} saveEvent={this.saveEvent} closeButton={this.closeButton} seeMore={this.seeMore}/>
      </div>
      </div>
      </MuiThemeProvider>
    );
  };
}
window.currentEvents = [];
export default SecondPage;


