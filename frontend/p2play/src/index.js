import React from 'react';
import {render} from 'react-dom';
import App from './App';
import CreatePlaylist from './CreatePlaylist.jsx';
import './index.css';
import { Router, Route, hashHistory } from 'react-router';

render(
  <Router history={hashHistory}>
    <Route path='/' component={App}></Route>
    <Route path='/createplaylist' component={CreatePlaylist}></Route>
  </Router>
, document.getElementById('root'));