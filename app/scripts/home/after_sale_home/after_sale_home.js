angular.module('iprpAdminApp').controller('AfterSaleCtrl', function ($scope,$location) {
    $('#nav_after_sale').addClass("actived").parent().siblings().find('a').removeClass("actived");
    //点击改变左边的class
    $scope.select=function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
    };
});