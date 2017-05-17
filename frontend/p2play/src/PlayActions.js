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
}


export default Alt.createActions(PlayActions);