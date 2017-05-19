import fetch from 'isomorphic-fetch';

class PlayService {

  constructor() {
    this.state = {
      // let ishankIP = 'http://ishank.wlan.rose-hulman.edu:8888/';
      remote : 'http://4902-03.csse.rose-hulman.edu:8000/',
      pservice : 'pservice/',
      uservice : 'uservice/'
    }
    // let playlistService = 'http://4902-03.csse.rose-hulman.edu:9001/';
    // let userService = 'http://4902-03.csse.rose-hulman.edu:9000/';
  }

  getUrls(searchKeyword) {
    return fetch(this.state.remote + this.state.pservice + 'search/' + searchKeyword,
      {
        method: 'GET',
      })
      .then(response => {
        return response.json();
      });
    }

  createPlaylist(username, name) {
    return fetch(this.state.remote + this.state.uservice + 'createplaylist/username/' + username + "/playlistname/" + name,
      {
        method: 'POST',
      })
      .then(response => {
        return response.json();
      });
  }

  addSong(song) {
    let stuff = this.state.remote + this.state.pservice + 'addsong/playlistname/'
      + song.playlistname + "/url/" + song.url + '/title/' + song.title;
    console.log(stuff);

    return fetch(stuff,
      {
        method: 'POST',
      })
      .then(response => {
        return response.json();
      });
  }

  getPlaylist(playlist) {
    return fetch(this.state.remote + this.state.pservice + 'getplaylist/playlist/'+ playlist,
      {
        method: 'GET',
      })
      .then(response => {
        return response.json();
    });
  }

  createAccount(username) {
    return fetch(this.state.remote + this.state.uservice + 'createaccount/username/'+ username,
      {
        method: 'POST',
      })
      .then(response => {
        return response.json();
    });
  }
}

export default new PlayService();
