angular.module('iprpAdminApp').controller('PaymentListCtrl',function($scope,PayService,$location){

    $('#payment_list').siblings().removeClass("selected");
    $('#payment_list').addClass("selected");

    //支付列表
    PayService.payList(function(data){
        $scope.paySystem=data;
    });
//
    //货到付款
    $scope.paySystem_offline=function(index){
        $location.path('/main/setting_home/payment_edit/'+ index);
    }
//
    //编辑支付宝
    $scope.paySystem_ping=function(payment_id){
        $location.path('/main/setting_home/ping++_edit/'+ payment_id);
    };
//
    //编译微信
    $scope.paySystem_weChat=function(payment_id){
        $location.path('/main/setting_home/weChat_payment_edit/'+ payment_id);
    }

    //提示操作
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});