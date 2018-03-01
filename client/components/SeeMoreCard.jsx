import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';

class SeeMoreCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
      showText: true,
    };
    this.handleClicker = this.handleClicker.bind(this);
  }
  handleClicker() {
    this.setState({
      showDescription: !this.state.showDescription,
      showText: !this.state.showText,
    });
  }
  render() {
    return (
      <div>
        <Card style={{ backgroundColor: '#f8f5f1' }}>
          <IconButton>X</IconButton>
          <CardTitle style={{ fontSize: '18px', textDecoration: 'bold' }}>
            {this.props.meetup.name}
          </CardTitle>
          <CardText>
            <CardText>
              {this.props.meetup.local_date ? `Date: ${this.props.date}` : null}
            </CardText>
            <CardText>
              Group name: {this.props.group.name}
            </CardText>
            <CardText>
              RSVPs: {this.props.meetup.yes_rsvp_count}
            </CardText>
            <CardText>
              {
   (() => {
       if (this.props.meetup.local_time) {
         if (this.props.meetup.local_time.split(':')[0] > 12) {
           return <span>Time: {`${this.props.meetup.local_time.split(':')[0] - 12}:00 PM`}</span>;
         }
       } else {
          return null;
   }
 })()
}           </CardText>
            <CardText>
              {this.props.group.localized_location ? `Group Location: ${this.props.group.localized_location}` : null }
            </CardText>
            <CardText>
              Description: {this.state.showDescription ? this.props.description : `${this.props.description.slice(0, 35)}..`}
              <FlatButton style={{ textDecoration: 'underline' }}onClick={this.handleClicker}>{this.state.showText ? 'See more' : 'See less'}</FlatButton>
            </CardText>
          </CardText>
          <FlatButton fullWidth style={{ textDecoration: 'underline' }} href={this.props.meetup.link ? this.props.meetup.link : `${this.props.meetup.event_url} `}target="_blank">View on meetup.com </FlatButton>
          <FlatButton fullWidth style={{ textDecoration: 'underline' }} onClick={this.props.saveEvent}>Save to my favorite events </FlatButton>
          <FlatButton fullWidth style={{ textDecoration: 'underline' }} onClick={this.props.closeButton}>Close this box </FlatButton>
        </Card>
      </div>
    );
  }
}
export default SeeMoreCard;
