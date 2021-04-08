angular.module('iprpAdminApp').controller('BillOrderPaymentCtrl', function ($scope,BillLogService,PaginationService,BillOrderDetailService,BillOrderPaymentService,OrderPaymentService,$modal,bill_order_id,bill_id) {
    /**
     * 获取结算订单详情
     */
    BillOrderDetailService.get({
        bill_order_id:bill_order_id,
        bill_id :bill_id
    },function(data){
        $scope.bill_order_detail = data;
    },function(error){
        alert(error.data.msg);
    });
    /**
     * 审核历史
     */
    init_bill_log_list();
    function init_bill_log_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            BillLogService.get({
                "pg_index":pg_index,
                "pg_count":pg_count,
                 order_id:bill_order_id
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.bill_log_list = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.bill_log_list = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    /**
     * 订单支付单
     */
    init_payment_list();
    function init_payment_list(){
        BillOrderPaymentService.list({
            bill_order_id:bill_order_id
        },function(data){
            $scope.order_payment_list = data;
        },function(error){
            alert(error.data.msg);
        });
    }

    /**
     * 审核
     */
    $scope.bill_order_pay_check = function(bill_order_pay_id,bill_order_id){
        $modal.open({
            resolve:{
                bill_order_pay_id : function(){
                    return bill_order_pay_id;
                },
                bill_order_id : function(){
                    return bill_order_id;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\bill\\check.html',
            controller: 'CheckCtrl'
        }).result.then(function (result) {
              init_payment_list();
              init_bill_log_list();
        });
    };

    /**
     * 驳回
     */
    $scope.bill_order_pay_reject = function(bill_order_pay_id,bill_order_id){
        $modal.open({
            resolve:{
                bill_order_pay_id : function(){
                    return bill_order_pay_id;
                },
                bill_order_id : function(){
                    return bill_order_id;
                }
            },
            templateUrl: 'package\\modal\\bill\\reject.html',
            controller: 'RejectCtrl'
        }).result.then(function (result) {
                init_payment_list();
                init_bill_log_list();
        });
    }
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});