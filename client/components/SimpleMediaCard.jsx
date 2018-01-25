import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import FlatButton from 'material-ui/FlatButton';
class SimpleMediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      date: this.props.event.date,
      rsvpCount: this.props.event.yes_rsvp_count + ' people going',
      showAll: 'false',
      original: ''
    }
    this.strip = this.strip.bind(this);
    this.showAll = this.showAll.bind(this);
  }
strip(html) {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       this.setState({
        original: tmp.textContent,
        description: tmp.textContent.slice(0,150)
       }) 
  }
showAll() {
    this.setState({
      showAll: !this.state.showAll,
      showText: !this.state.showText
    })
  }
  componentDidMount () {
    this.strip(this.props.event.description);
  }
render() {
  return (
    <div>
      <Card style={{width: '45vw', height: '15vw'}} style={{backgroundColor: '#f8f5f1'}} >
      <CardHeader title={this.props.event.local_date} subtitle={this.state.rsvpCount}
    />
    <CardMedia
      overlay={<CardTitle title={
   (() => {
       if (this.props.event.local_time){
         if(this.props.event.local_time.split(':')[0] > 12){
           return <span>{this.props.event.local_time.split(':')[0] - 12+ ':00 PM'}</span>
         }
       } else {
          return null;
   }
 })()
}  subtitle={this.props.event.group.name} />}
    >
      <img src={this.props.event.group.photo ? this.props.event.group.photo.highres_link : null} alt="" style={{'height': '300px', maxWidth: '50%'}}/>
    </CardMedia>
          <CardTitle title={this.props.event.name}/>
          <CardText>
           {!this.state.showAll ? this.state.original : this.state.description}
  <FlatButton fullWidth={false}  style={{textDecoration: 'underline'}}onClick={this.showAll}>{!this.state.showText ? 'See more': 'See less'}</FlatButton>
            <br/>
          </CardText>
            <CardText>
  {this.props.group? 'Group Location: ' + this.props.group.localized_location : null }
  </CardText>
        <CardActions>
          <FlatButton  style={{textDecoration: 'underline'}} fullWidth={true} onClick={() => {this.props.saveEvent(this.props.event)}}color="primary">
            Save to my favorites 
          </FlatButton>
            <FlatButton fullWidth={true} style={{textDecoration: 'underline'}} href={this.props.event.link + ' '}target="_blank">View on meetup.com </FlatButton>
        </CardActions>
      </Card>
    </div>
  );
}
}
export default SimpleMediaCard;
