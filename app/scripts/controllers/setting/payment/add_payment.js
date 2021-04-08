angular.module('iprpAdminApp').controller('AddPaymentCtrl',function($scope,$stateParams,PayService,$location){
    $('#payment_list').siblings().removeClass("selected");
    $('#payment_list').addClass("selected");
    $scope.add_payment_obj = { };
    $scope.add_payment_obj.image = '';
    $scope.add_payment_obj.state = 1;
    $scope.turnOn = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.add_payment_obj.state = 1;
    };

    $scope.turnOff = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.add_payment_obj.state = 0;
    };

    /**
     * 添加支付方式
     */
    $scope.temp_obj = { };
    $scope.add_Payment = function(){
        if(!$scope.add_payment_obj.name || !$scope.add_payment_obj.code || !$scope.add_payment_obj.fileName){
            $scope.add_payment_form.submitted = true;
        }else{
            $scope.add_payment_obj.config = angular.toJson($scope.temp_obj);
            PayService.add_pay($scope.add_payment_obj,function(data){
                $location.path('main/setting_home/payment_list');
            },function(error){
                alert(error.data.msg);
            })
        }
    }

});
