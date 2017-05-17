import Alt from './alt.js';
import PlayActions from './PlayActions.js';

class PlayStore() {

  constructor() {
    this.bindListeners({
      updateUrls: PlayActions.getUrls
    });

    this.urls = {};
  }

  updateUrls(data) {
    this.setState({data})
  }

}


export default Alt.createStore(PlayStore, 'PlayStore');