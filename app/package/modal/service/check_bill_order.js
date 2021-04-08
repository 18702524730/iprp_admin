angular.module('iprpAdminApp').controller('CheckBillOrderCtrl', function ($scope,temp_bill_order_sn,temp_bill_amount) {

    $scope.temp_bill_order_sn = temp_bill_order_sn;
    $scope.temp_bill_amount = temp_bill_amount;

    //提交
    $scope.save = function(){
        $scope.$close({});
    };
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
