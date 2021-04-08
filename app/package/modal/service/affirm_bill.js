angular.module('iprpAdminApp').controller('AffirmBillCtrl', function ($scope,BillService,temp_bill_order_sn,temp_bill_amount,bill_id,bill_type) {

    $scope.temp_bill_order_sn = temp_bill_order_sn;
    $scope.temp_bill_amount = temp_bill_amount;
    $scope.bill_type = 2;
    /**
     * 查看服务商账户余额
     */
    BillService.bill.account_amount({
        bill_id:bill_id,
        bill_type:bill_type
    },function(data){
        $scope.service_account_amount = data;
    },function(error){
        alert(error.data.msg);
    });
    //提交
    $scope.save = function(){
        $scope.$close({bill_type:$scope.bill_type});
    };
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
