import fetch from 'isomorphic-fetch';

class PlayService {


  getUrls(searchKeyword) {
    return fetch('http://ishank.wlan.rose-hulman.edu:8888/search/' + searchKeyword,
      {
        method: 'GET',
      })
      .then(response => {
        return response.json();
      });
    }

  createPlaylist(username, name) {
    return fetch('http://ishank.wlan.rose-hulman.edu:8888/createplaylist/username/' + username + "/playlistname/" + name,
      {
        method: 'POST',
      })
      .then(response => {
        return response.json();
      });
  }

  addSong(song) {
    let stuff = 'http://ishank.wlan.rose-hulman.edu:8888/addsong/playlistname/'
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
    return fetch('http://ishank.wlan.rose-hulman.edu:8888/getplaylist/playlist/'+ playlist,
      {
        method: 'GET',
      })
      .then(response => {
        return response.json();
    });
  }
}

export default new PlayService();
