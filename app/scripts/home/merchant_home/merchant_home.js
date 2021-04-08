angular.module('iprpAdminApp').controller('MerchantHomeCtrl', function ($scope,$location) {
  $('#nav_merchant').addClass("actived").parent().siblings().find('a').removeClass("actived");
  //点击改变左边的class
  $scope.select=function($event){
  	console.log($event)
    var jq = angular.element($event.target);
    jq.addClass("selected");
    jq.parent().siblings().children().removeClass("selected");
  };
});
