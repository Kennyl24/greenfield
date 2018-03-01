import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      clicked: event,
    });
    this.props.seeMore(event.name);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <GridList
            cols={2.2}
            style={{
              marginTop: '580px',
              marginLeft: '10px',
              display: 'flex',
              flexWrap: 'nowrap',
              overflowX: 'auto',
            }}
          >
            {this.props.events.map(event => (
              <GridTile
                key={event.group.name}
                title={event.name}
                titleStyle=""
                subtitle={<span>by <b>{event.group.name}</b></span>}
                actionIcon={<IconButton onClick={() => this.handleClick(event)}><ExpandMore /></IconButton>}
              >
                <img src={event.group.photo ? event.group.photo.highres_link : 'https://previews.123rf.com/images/pixelsaway/pixelsaway0910/pixelsaway091000052/5738500-internet-browser-error-message-no-image-available-handwritten--Stock-Photo.jpg'} alt="" />
              </GridTile>
      ))}
          </GridList>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default EventList;
