function MusicCtrl($scope) {
  
    $scope.Music = [
      {text:'jones beats', done:false},         
      {text: 'americas vibe', done:false}
      ];
    
    $scope.getTotalMusic = function () {
      return $scope.Music.length;
    };
    
    
    $scope.addMusic = function () {
      $scope.Music.push({text:$scope.formMusicText, done:false});
      $scope.formMusicText = '';
    };
    
      $scope.clearCompleted = function () {
          $scope.Music = _.filter($scope.Music, function(Music){
              return !Music.done;
          });
      };
  }
  
  $(document).ready(function() {
    var btn = $(".button");
    btn.click(function() {
      btn.toggleClass("paused");
      return false;
    });
  });