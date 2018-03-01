import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Logout extends React.Component {
  componentDidMount() {
    $.ajax({
      url: '/logout',
      method: 'POST',
      success: (data) => {
        if (typeof data.redirect === 'string') {
          window.location = data.redirect;
        }
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
          <h2 style={{ textAlign: 'center', color: 'black' }}><Link to={{ pathname: '/login' }}>TAKE ME HOME</Link></h2>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default Logout;
