import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
class GuttersGrid extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    spacing: '16',
  }
  this.handleClick = this.handleClick.bind(this)
};
  handleClick(){
    console.log('clickiiiiinig');
  }
  // handleChange = key => (event, value) => {
  //   this.setState({
  //     [key]: value,
  //   });
  // };

  render() {

    return (
      <MuiThemeProvider>
      <div style ={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      <GridList
    cols={2.2} style={{marginTop: '580px', marginLeft: '10px', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}
      >
      {this.props.events.map((event) => (
        <GridTile
          onClick={this.handleClick}
          key={event.group.name}
          title={event.name}
          subtitle={<span>by <b>{event.group.name}</b></span>}
          actionIcon=""
        >
          <img src={event.group.photo ? event.group.photo.highres_link : "https://previews.123rf.com/images/pixelsaway/pixelsaway0910/pixelsaway091000052/5738500-internet-browser-error-message-no-image-available-handwritten--Stock-Photo.jpg"} alt=""  />
        </GridTile>
      ))}
      </GridList>
      </div>
      </MuiThemeProvider>
    );
  }
}


export default GuttersGrid;
