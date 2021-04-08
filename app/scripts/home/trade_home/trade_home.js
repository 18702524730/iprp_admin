'use strict';
angular.module('iprpAdminApp').controller('TradeHomeCtrl', function ($scope,session,$location) {
    $('#nav_trade').addClass("actived").parent().siblings().find('a').removeClass("actived");

    //点击改变左边的class
    $scope.select=function($event,message){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
    };
    //点击改变左边的class
    $scope.select1=function($event,message){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        localStorage.setItem('showTable', 'false');
        if (location.href.indexOf('hzwm_order_list') !== -1) {
        	location.reload();
        }
    };
});
