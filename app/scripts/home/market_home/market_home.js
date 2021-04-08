angular.module('iprpAdminApp').controller('MarketHomeCtrl', function ($scope,$location) {
  $('#nav_market').addClass("actived").parent().siblings().find('a').removeClass("actived");
  //点击改变左边的class
  $scope.select=function($event){
    var jq = angular.element($event.target);
    jq.addClass("selected");
    jq.parent().siblings().children().removeClass("selected");
  };
});
