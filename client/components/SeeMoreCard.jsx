import React from 'react';
import ReactDOM from 'react-dom';
import SecondPage from './FirstPage.jsx';
import MeetupListEntry from './MeetupListEntry.jsx';
import Index from './Index.jsx';
import { Link } from 'react-router-dom';
import Card from 'material-ui/Card/Card'
import Button from 'material-ui/FlatButton';
import CardHeader from 'material-ui/card/cardHeader';
import CardMedia from 'material-ui/card/cardMedia';
import CardTitle from 'material-ui/card/cardTitle';
import FlatButton from 'material-ui/flatButton';
import CardText from 'material-ui/card/cardText';
class SeeMoreCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
      showText: true,
    }
    this.handleClicker = this.handleClicker.bind(this);
  }
  handleClicker() {
    console.log(this.state.showDescription);
    this.setState({
      showDescription: !this.state.showDescription,
      showText: !this.state.showText
    })
  }
  render() {
   return (
  <div>
  <Card>
  <CardMedia>
  <div>
  <img src={this.props.photo.photo_link} alt="" style={{alignSelf: 'center', 'width':'100%', 'height': '175px'}} />
  </div>
  </CardMedia>
  <CardTitle style ={{fontSize: '18px', textDecoration: 'bold'}}>
  {this.props.meetup.name}
  </CardTitle>
  <CardText>
  <CardText>
  Date: {this.props.date}
  </CardText>
  <CardText>
  Group name: {this.props.group.name}
  </CardText>
  <CardText>
  RSVPs: {this.props.meetup.yes_rsvp_count}
  </CardText>
  <CardText>
  Time: {this.props.meetup.local_time.split(':')[0] > 12 ? this.props.meetup.local_time.split(':')[0] - 12+ ':00 PM' : this.props.meetup.local_time + 'AM'}
  </CardText>
  <CardText>
  Group Location: {this.props.group.localized_location}
  </CardText>
  <CardText>
  Description: {this.state.showDescription ? this.props.description : this.props.description.slice(0,35) + '..'}
  <FlatButton style={{textDecoration: 'underline'}}onClick={this.handleClicker}>{this.state.showText ? 'See more': 'See less'}</FlatButton>
  </CardText>
  </CardText>
  <FlatButton style={{textDecoration: 'underline'}} href={this.props.meetup.link + ' '}target="_blank">View on meetup.com</FlatButton>
  <FlatButton style={{textDecoration: 'underline'}} onClick={this.props.saveEvent}>Save my favorite event</FlatButton>
  <FlatButton className="flatButton" style={{textDecoration: 'underline'}} onClick={this.props.closeButton}>Close this box</FlatButton>
  </Card>
  </div>
);
}
}

export default SeeMoreCard;
