angular.module('iprpAdminApp').controller('PingPaymentEditCtrl',function($scope,$stateParams,PayService,$location){
    $('#payment_list').siblings().removeClass("selected");
    $('#payment_list').addClass("selected");
    $scope.Payment={};
    PayService.detail_pay({
        payment_id:$stateParams.payment_id
    },function(date){
        $scope.payDetail=date;
        $scope.Payment = angular.fromJson($scope.payDetail.config);
    });

    $scope.turnOn = function(){
        $scope.payDetail.state = 1;
    };

    $scope.turnOff = function(){
        $scope.payDetail.state = 0;
    };

    /**
     * 编辑ping++
     */
    $scope.edit=function(){
        if(!$scope.Payment.appId || !$scope.Payment.apiKey || !$scope.Payment.publicKey){
            $scope.formAliPay.submitted = true;
        }else{
            $scope.payDetail.payment_config = angular.toJson($scope.Payment);
            PayService.edit_pay({},$scope.payDetail,function(){
                $location.path('/main/setting_home/payment_list');
            },function(error){
                alert(error.data.msg);
            });
        }
    };

    /*$scope.return=function(){
        $location.path('/manage/setting_home/setting_payment');
    };*/
});
