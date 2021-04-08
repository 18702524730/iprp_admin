angular.module('iprpAdminApp').controller('CheckCtrl', function ($scope,BillOrderPaymentDetailService,bill_order_pay_id,bill_order_id){
    //默认不能操作
    $scope.amount = true;
    /**
     * 获取支付单详情
     */
    BillOrderPaymentDetailService.pay_detail({
        bill_order_pay_id:bill_order_pay_id,
        bill_order_id:bill_order_id
    },function(data){
        $scope.order_pay_detail = data;
    },function(error){
        alert(error.data.msg);
    });
    /**
     * 修正金额
     */
    $scope.update = function(){
        $scope.amount = false;
    };
    /**
     * 审核
     */
    $scope.error = "";
    $scope.save = function(){
        if($scope.amount){
            BillOrderPaymentDetailService.update({
                bill_order_pay_id:bill_order_pay_id,
                bill_order_id:bill_order_id
            },$scope.order_pay_detail,function(date){
                $scope.$close({});
            },function(error){
                alert(error.data.msg);
            })
        }else{
            if(!$scope.order_pay_detail.description){
                desc();
                return;
            }else{
                BillOrderPaymentDetailService.update({
                    bill_order_pay_id:bill_order_pay_id,
                    bill_order_id:bill_order_id
                },$scope.order_pay_detail,function(date){
                    $scope.$close({});
                },function(error){
                    alert(error.data.msg);
                })
            }
        }
    };
    function desc(){
        $scope.$watch($scope.order_pay_detail.description,function(data){
            if(data != undefined || data != null){
                if(!/^[\u4e00-\u9fa5a-zA-Z0-9\-]{2,15}$/.test(data)){
                    $scope.error = "备注使用中文、英文字母(2~40位字符)";
                }else{
                    $scope.error = "";
                }
            }else{
                $scope.error = "请输入备注";
            }
        })
    }
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});