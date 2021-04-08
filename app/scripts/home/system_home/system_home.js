'use strict';

/**
 * @ngdoc function
 * @name iprpAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iprpAdminApp
 */
angular.module('iprpAdminApp')
    .controller('SystemHomeCtrl', function ($scope,$location) {

    //点击改变左边的class
    $scope.select=function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
    };

});
