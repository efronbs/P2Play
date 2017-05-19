import React from 'react';
import {render} from 'react-dom';
import App from './App';
import CreatePlaylist from './CreatePlaylist.jsx';
import JoinPlaylist from './JoinPlaylist.jsx';
import LoginSignup from './LoginSignup.jsx';
import './index.css';
import { Router, Route, hashHistory } from 'react-router';

render(
  <Router history={hashHistory}>
    <Route path='/' component={LoginSignup}></Route>
    <Route path='/app' component={App}></Route>
    <Route path='/createplaylist' component={CreatePlaylist}></Route>
    <Route path='/joinplaylist' component={JoinPlaylist}></Route>
  </Router>
, document.getElementById('root'));