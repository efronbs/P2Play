import PlayService from './PlayService.js';
import Alt from './alt.js';

class PlayActions {

  getUrls(searchKeyword) {
    return dispatcher => {
        return new Promise((resolve, reject) => {
          PlayService.getUrls(searchKeyword)
            .then(response => {
              const data = response;
                dispatcher({ data });
                resolve({ data });
              });
            });
      };
  }

  createPlaylist(username, name) {
    return dispatcher => {
        return new Promise((resolve, reject) => {
          PlayService.createPlaylist(username, name)
            .then(response => {
              const data = response;
                dispatcher({ data });
                resolve({ data });
              });
            });
      };
  }

  addSong(song) {
    return dispatcher => {
        return new Promise((resolve, reject) => {
          PlayService.addSong(song)
            .then(response => {
              const data = response;
                dispatcher({ data });
                resolve({ data });
              });
            });
      };
  }

  getPlaylist(playlist) {
    return dispatcher => {
      return new Promise((resolve, reject) => {
        PlayService.getPlaylist(playlist)
          .then(response => {
            const data = response;
              dispatcher({ data });
              resolve({ data });
            });
      });
    }
  }

  createAccount(username) {
    return dispatcher => {
      return new Promise((resolve, reject) => {
        PlayService.createAccount(username)
          .then(response => {
            const data = response;
              dispatcher({ data });
              resolve({ data });
            });
      });
    }
  }
}


export default Alt.createActions(PlayActions);