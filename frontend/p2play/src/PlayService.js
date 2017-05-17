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
}

export default new PlayService();
