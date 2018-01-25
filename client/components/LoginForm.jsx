import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/flatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);

  }
  onChange(e){
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
  }
  render() {
    const { username, password} = this.state;
    return (
      <MuiThemeProvider>
      <div>
      <AppBar title={<span style={{backgroundColor: '#f47023'}}><img src='../minglr.gif'/></span>}showMenuIconButton={false} style={{backgroundColor: '#f47023'}}>
      </AppBar>
      <FlatButton fullWidth={true}style={{textDecoration: 'underline'}}><Link to={{pathname:'/signup'}}>No account? Sign up here</Link></FlatButton>
      <FlatButton fullWidth={true}style={{textDecoration: 'underline'}}><Link to={{pathname:'/home'}}>I don't wanna</Link></FlatButton>
      <form action='/auth' method='post'>
        <input placeholder="Enter your username" type="text" name="username" value={username} onChange={this.onChange} />
        <input placeholder="Enter your password" type="password" name="password" value={password} onChange={this.onChange} />
        <br />
        <button>Login!</button>
      </form>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default LoginForm;
