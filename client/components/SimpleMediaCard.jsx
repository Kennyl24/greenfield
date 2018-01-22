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
      description: ''
    }
    this.strip = this.strip.bind(this);
  }
  
strip(html) {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       this.setState({
        description: tmp.textContent.slice(0,150)
       }) 
  }
  componentDidMount () {
    this.strip(this.props.event.description);
  }
render() {
  return (
    <div>
      <Card style={{width: '45vw', height: '20vw'}} style={{backgroundColor: '#f8f5f1'}} >
      
          <CardHeader style={{textAlign: 'center', whiteSpace: 'normal'}}>
            {this.props.event.name}
          </CardHeader>
          <text>
            {this.state.description}...
            <br/>
          </text>
          <text>
            Date: {this.props.event.local_date}
          </text>
        <CardActions>
          <FlatButton  style={{textDecoration: 'underline'}} fullWidth={true} onClick={() => {this.props.seeMore(this.props.event.name)}}color="primary">
            View More 
          </FlatButton>
            <FlatButton fullWidth={true} style={{textDecoration: 'underline'}} href={this.props.event.link + ' '}target="_blank">View on meetup.com </FlatButton>
        </CardActions>
      </Card>
    </div>
  );
}
}
export default SimpleMediaCard;
