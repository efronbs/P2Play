app.directive('queuedSong', function() {
  return {
    restrict: 'E',
    scope : {
      info : '='
    },
    templateUrl : 'js/directives/queuedSong.html'
  }
})
