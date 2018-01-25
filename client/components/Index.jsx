import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, PrivateRoute} from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import FirstPage from './FirstPage.jsx';
import SecondPage from './SecondPage.jsx';
import SignUpForm from './SignUpForm.jsx';
import CreateEvent from './CreateEvent.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Profile from './Profile.jsx';
import GuttersGrid from './GuttersGrid.jsx';
ReactDOM.render(
      <Router>
      <Switch>
      <Route exact path="/" component={FirstPage}/>
      <Route path="/home" component={SecondPage}/>
      <Route exact path="/signup" component={SignUpForm}/>
      <Route exact path="/login" component={LoginForm}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/logout" component={Logout}/>
      <Route exact path="/create" component={CreateEvent}/>
      </Switch>
      </Router>,document.getElementById('app')
);
