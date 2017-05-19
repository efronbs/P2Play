import React, { Component } from 'react';
import './App.css';
import Config from './app-config.js';
import PlayActions from './PlayActions.js';

class JoinPlaylist extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.props = props;
    this.context = context;

    this.state = {
      songList: [],
      value: ''
    };
  }

  render() {

    let allurls = [];
    let song = {};
    let playlist = localStorage.getItem('playlistname');
    PlayActions.getPlaylist(playlist)
      .then(resp => {
        let data = resp.data;
        if(data.message) {
          let res = JSON.parse(data.data);
          
          allurls = res.map(r => {
            return (
              <label>
                <div id="ishank">
                  <label>{r.title}</label>
                  <div>
                    <iframe src={r.url} style={{ flex: '1', WebkitFlex: '1' }} />
                  </div>
                </div>
              </label>
               );
          });

          this.setState({songList: allurls});
        }
      });

    return (
      <div className="App">
        {this.state.songList}
      </div>
      );
  }

}


export default JoinPlaylist;
