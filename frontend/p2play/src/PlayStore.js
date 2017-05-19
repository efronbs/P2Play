import Alt from './alt.js';
import PlayActions from './PlayActions.js';

class PlayStore() {

  constructor() {
    this.bindListeners({
      updateUrls: PlayActions.getUrls,
      updatePlaylistName: PlayActions.getPlaylistName
    });

    this.urls = {};
    this.playlistName = '';
  }

  updateUrls(data) {
    this.setState({data});
  }

  updatePlaylistName(playlistName) {
    this.setState({playlistName});
  }

}


export default Alt.createStore(PlayStore, 'PlayStore');