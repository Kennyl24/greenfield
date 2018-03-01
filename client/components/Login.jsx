import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Login = () => (
  <MuiThemeProvider>
    <div>
      <AppBar title={<span style={{ backgroundColor: '#f47023' }}>MINGLR</span>}showMenuIconButton={false} style={{ backgroundColor: '#f47023' }}>
        <FlatButton primary={true}><Link to={{ pathname:'/home' }}>Home</Link></FlatButton>
        <FlatButton ><Link to={{ pathname: '/create' }}>Create event</Link></FlatButton>
        <FlatButton ><Link to={{ pathname: '/logout' }}>Logout</Link></FlatButton>
        <FlatButton ><Link to={{ pathname: '/profile' }}>Profile</Link></FlatButton>
      </AppBar>
    </div>
  </MuiThemeProvider>
);
export default Login;
