angular.module('iprpAdminApp').controller('OrderBackCtrl', function ($scope,OrderPaymentService,order_id,distributeType) {
    /**
     * 订单支付单
     */
    $scope.array_ids = [];
    $scope.is_choose_ids = [];
    $scope.order_back_obj = { };
    $scope.distributeType = distributeType;//订单分派状态
    OrderPaymentService.list({
        order_id:order_id,
        findBillOrderPay:true,
        pg_index : 0,
        pg_count : 999
    },function(data){
        $scope.order_payment_list = data;
        if($scope.order_payment_list.elements != undefined){
            angular.forEach($scope.order_payment_list.elements,function(data){
                $scope.is_choose_ids.push(data.order_pay_id);
                if(data.is_product_bill === true){
                    $scope.array_ids.push(data.order_pay_id);
                }
            })
        }
    },function(error){
        alert(error.data.msg);
    });
    //单选
    $scope.sChoose = function(id){
        if($scope.array_ids.indexOf(id) !== -1){
            $scope.array_ids.splice($scope.array_ids.indexOf(id),1);
        }else{
            $scope.array_ids.push(id);
        }
    };
    //确认
    $scope.save_order_back = function(){
        $scope.$close({array_ids:$scope.array_ids});
    };
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});