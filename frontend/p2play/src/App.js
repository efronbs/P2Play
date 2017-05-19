import React, { Component } from 'react';
import './App.css';
import Config from './app-config.js';
import PlayActions from './PlayActions';
import logo from './logo.png';


class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.props = props;
    this.context = context;

    // this.handlePlaylistNameStoreChange = this.handlePlaylistNameStoreChange.bind(this);

    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    // PlayStore.listen(this.handlePlaylistNameStoreChange);
  }

  componentWillUnmount() {
    // PlayStore.unlisten(this.handlePlaylistNameStoreChange);
  }

  handlePlaylistNameStoreChange(playStore) {

  }

  createPlaylist() {
    let name = this.refs.val.value;
    let username = localStorage.getItem('username');
    localStorage.setItem('playlistname', name);

    PlayActions.createPlaylist(username, name)
      .then(resp => {
        if(resp.data.message) {
          alert('A new playlist was created!');
          this.context.router.push(Config.appRoutes.CREATE_PLAYLIST);
        } else {
          alert('playlist already exists, click ok to join!');
          this.context.router.push(Config.appRoutes.CREATE_PLAYLIST);
        }
      });


    // this.context.router.push(Config.appRoutes.CREATE_PLAYLIST);
  }

  handleChange(event) {
    
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='form-wrapper cf'>
        <input placeholder="Type playlist here..." ref="val" className='usernameField' type="text" onChange={this.handleChange.bind(this)} />
        <button className='routeButton' onClick={this.createPlaylist.bind(this)} id='createButton'>Join/Create</button>
        </div>
    
      </div>
    );
  }
}

App.contextTypes= {
  router: React.PropTypes.object.isRequired
};

export default App;
