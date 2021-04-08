angular.module('iprpAdminApp').controller('imgprevControl', function ($scope,ngsrc) {
    $scope.index = 0;
    $scope.urls =ngsrc;
    $scope.src = ngsrc[$scope.index];
    console.log(ngsrc)
    $scope.tonext = function(){
      $scope.index+=1;
      if($scope.index>=$scope.urls.length){
        $scope.index = 0;
        
      }
      $scope.src = ngsrc[$scope.index];
    }
    $scope.toprev = function(){
      $scope.index-=1;
      if($scope.index<=-1){
        $scope.index = $scope.urls.length-1;
        
      }
      $scope.src = ngsrc[$scope.index];
    }
    $scope.prevclose = function(){
      $scope.$dismiss("cancel");
    } 
});
