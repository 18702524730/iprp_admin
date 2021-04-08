angular.module('iprpAdminApp').controller('FastHomeCtrl', function ($scope,session,$location) {
    $('#nav_fast').addClass("actived").parent().siblings().find('a').removeClass("actived");
    //点击改变左边的class
    $scope.select=function($event,message){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
    };
});
