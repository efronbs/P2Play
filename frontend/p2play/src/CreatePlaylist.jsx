import React, { Component } from 'react';
import './App.css';
import Config from './app-config.js';
import PlayActions from './PlayActions.js';

class CreatePlaylist extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.props = props;
    this.context = context;

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
    PlayActions.getUrls(this.state.value)
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
      <div>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Name:
              <input type="text" className="usernameField" value={this.state.value} onChange={this.handleChange.bind(this)} />
            </label>
            <input type="submit" className="routeButton" value="Submit" />
          </form>
        </div>

        <div>
          {this.state.songList}
        </div>
      </div>
      );
  }

}


export default CreatePlaylist;
