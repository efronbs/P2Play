// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var isPlaying;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '480',
    playerVars: {
      'controls': 0,
      'showinfo': 0,
      'autohide': 1
    },
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // bind events
  var playButton = document.getElementById('play-button');
  playButton.addEventListener('click', function () {
    player.playVideo();
  });

  var pauseButton = document.getElementById('pause-button');
  pauseButton.addEventListener('click', function () {
    player.pauseVideo();
  });
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

function startVideo() {
  player.startVideo();
}

function pauseVideo() {
  player.pauseVideo();
}

function playOrPauseClick() {

}

function getSearchResults() {
  return dispatcher => {
    return new Promise((resolve, reject) => {
      this.getResultsfromYTAPI()
        .then(response => {
          const res = response;
          dispatcher({
            res
          });
          resolve({
            res
          });
        });
    });
  };
  // return null;
}

function getResultsfromYTAPI(searchKey) {
  return fetch('http://ishank.wlan.rose-hulman.edu:8888/search/' + searchKey, {
      method: 'GET',
    })
    .then(response => {
      return response.json();
    });
}

function clickPlayButton() {
  document.getElementById("play-button").style.display = "none";
  document.getElementById("pause-button").style.display = "block";
}

function clickPauseButton() {
  document.getElementById("play-button").style.display = "block";
  document.getElementById("pause-button").style.display = "none";
}