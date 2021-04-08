angular.module('iprpAdminApp').controller('WeChatPaymentEditCtrl',function($scope,$stateParams,PayService,$location){

    $scope.Payment={};
    PayService.detail_pay({
        payment_id:$stateParams.payment_id
    },function(date){
        $scope.payDetail=date;
        $scope.Payment = angular.fromJson(date.payment_config);
    });

    $scope.turnOn = function(){
        $scope.payDetail.payment_state = '1';
    };

    $scope.turnOff = function(){
        $scope.payDetail.payment_state = '0';
    };

    $scope.edit=function(){
        if(!$scope.Payment.seller_key || !$scope.Payment.mch_id || !$scope.Payment.appid){
            $scope.formWeChat.submitted = true;
        }else{
            $scope.payDetail.payment_config = angular.toJson($scope.Payment);
            PayService.edit_pay({},$scope.payDetail,function(){
                $location.path('/main/setting_home/payment_system');
            },function(error){
                alert(error.data.msg);
            });
        }
    };

    /*$scope.return=function(){
        $location.path('/manage/setting_home/setting_payment');
    };*/
});
