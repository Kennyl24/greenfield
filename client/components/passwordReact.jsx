import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title={<span style={{ backgroundColor: '#f47023' }}><img src="../minglr.gif" alt="" /></span>}showMenuIconButton={false} style={{ backgroundColor: '#f47023' }}>
              <FlatButton primary={true}><Link to={{ pathname:'/home' }}>Home</Link></FlatButton>                                                                                                                                                                                                                         <FlatButton ><Link to={{ pathname:'/create' }}>Create event</Link></FlatButton>
              <FlatButton ><Link to={{ pathname:'/logout' }}>Logout</Link></FlatButton>
              <FlatButton ><Link to={{ pathname:'/profile' }}>Profile</Link></FlatButton>
            </AppBar>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" style={{ backgroundColor: '#f47023' }} onClick={event => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default LoginForm;
