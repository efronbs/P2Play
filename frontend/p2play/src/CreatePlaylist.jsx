import React, { Component } from 'react';
import './App.css';
import Config from './app-config.js';
import PlayActions from './PlayActions.js';

class CreatePlaylist extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.props = props;
    this.context = context;

    this.player = null;
    this.YT = null;

    this.state = {
      songList: [],
      value: ''
    };
  }

  componentDidMount() {
    // let addScript = document.createElement('script');
    // addScript.setAttribute('src', 'https://www.youtube.com/iframe_api');

    // let script2 = document.createElement('script');
    // script2.setAttribute('src', 'https://cdn.rawgit.com/labnol/files/master/yt.js');

    // document.body.appendChild(addScript);
    // document.body.appendChild(script2);

    let tag = document.createElement('script');
    tag.src = "//www.youtube.com/player_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onYouTubePlayerAPIReady() {
    this.player = new this.YT.Player('video', {
      events: {
        // call this function when player is ready to use
        'onReady': this.onPlayerReady
      }
    });
  }

  onPlayerReady(event) {
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function() {
      player.playVideo();
    });
    
    var pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", function() {
      player.pauseVideo();
    });
  }

   handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleCheckboxChange(event) {
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);

    let allurls = [];
    let song = {};
    let tf = this.refs.tf.value;
    PlayActions.getUrls(tf)
      .then(resp => {
        let data = resp.data;
        if(data.message) {
          let res = data.data;
          song = {title: res[0].title, url: encodeURI(res[0].url), playlistname: localStorage.getItem('playlistname')};

          PlayActions.addSong(song)
            .then(resp => {
              
            });
                // <input name={r.title} type="checkbox" onChange={this.handleCheckboxChange.bind(this)} />
          // allurls = res.map(r => {
          //   return (
          //     <label>
          //       <div id="ishank">
          //         <label>{r.title}</label>
          //         <div>
          //           <iframe src={r.url} style={{ flex: '1', WebkitFlex: '1' }} />
          //         </div>
          //       </div>
          //     </label>
          //      );
          // });

          this.setState({songList: allurls});
        }
      });


    event.preventDefault();
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
            let url = r.url + '_ok?enablejsapi=1';
            return (
              <label>
                <div id="ishank">
                  <label>{r.title}</label>
                  <div>
                    <iframe src={url} id={r.url} style={{ flex: '1', WebkitFlex: '1' }} />
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
        <div className='form-wrapper cf'>
          <label>
            <input placeholder="Search song here..." type="text" ref='tf' className="usernameField" value={this.state.value} onChange={this.handleChange.bind(this)} />
            <button onClick={this.handleSubmit.bind(this)} type="submit" className="routeButton" value="Submit">Search</button>
          </label>
        </div>

        <div>
          {this.state.songList}
        </div>
      </div>
      );
  }

}


export default CreatePlaylist;
