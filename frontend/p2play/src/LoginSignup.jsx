import React, { Component } from 'react';
import './App.css';
import Config from './app-config.js';
import PlayActions from './PlayActions'

class LoginSignup extends Component {

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

  handleUsernameInput(event) {
    let username = this.refs.username.innerText;

    PlayActions.createAccount(username)
      .then(resp => {
        let data = resp.data;
        if(data.message) {
          // account created successfully
          localStorage.setItem('username', username);
          alert('Signing you in!');
          this.context.router.push(Config.appRoutes.APP);
        } else {
          //account creation failed. 
        }
    });

  }

  render() {
    return (
      <div className="App">
        <h3>P2Play</h3>
        <label>
          Login/Signup
          <div>
            <input ref="username" type="text" name='username' />
            <button className='routeButton' id='joinButton' onClick={this.handleUsernameInput.bind(this)}>Join</button>
          </div>
        </label>
      </div>
    );
  }
}

LoginSignup.contextTypes= {
  router: React.PropTypes.object.isRequired
};

export default LoginSignup;
