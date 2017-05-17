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
    let addScript = document.createElement('script');
    addScript.setAttribute('src', 'https://www.youtube.com/iframe_api');

    let script2 = document.createElement('script');
    script2.setAttribute('src', 'https://cdn.rawgit.com/labnol/files/master/yt.js');

    document.body.appendChild(addScript);
    document.body.appendChild(script2);
  }

   handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);

    let allurls = [];

    PlayActions.getUrls(this.state.value)
      .then(resp => {
        let data = resp.data;
        if(data.message) {
          let res = data.data;

          allurls = res.map(r => {
            return (
              <div id="ishank">
                <iframe src={r.url} ref="mapbox" style={{ flex: '1', WebkitFlex: '1' }} />
                <div>
                  <label>{r.title}</label>
                </div>
                <div>
                  <label>{r.url}</label>
                </div>
              </div>
               );
          });

          this.setState({songList: allurls});
        }
      });


    event.preventDefault();
  }



  render() {


    return (
      <div>
        <div>
        <div data-video="Zasx9hjo4WY"  
                 data-autoplay="0"         
                 data-loop="1"/>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
            </label>
            <input type="submit" value="Submit" />
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
