import React, { Component } from 'react';
import './App.css';
import Config from './app-config.js';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.props = props;
    this.context = context;

    this.state = {
      value: ''
    };
  }

  createPlaylist() {
    console.log(this.refs.val.value);


    // this.context.router.push(Config.appRoutes.CREATE_PLAYLIST);
  }

  handleChange(event) {
    
  }

  render() {
    return (
      <div className="App">
        <h3>P2Play</h3>
        <input ref="val" type="text" onChange={this.handleChange.bind(this)} />
        <div>
          <button className='routeButton' id='joinButton'>Join</button>
        </div>
        <div>
          <button className='routeButton' onClick={this.createPlaylist.bind(this)} id='createButton'>Create</button>
        </div>
    
      </div>
    );
  }
}

App.contextTypes= {
  router: React.PropTypes.object.isRequired
};

export default App;
