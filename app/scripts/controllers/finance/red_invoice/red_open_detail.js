angular.module('iprpAdminApp') .controller('RedOpenDetailCtrl', function ($scope,RedInvoiceService,$stateParams,orderService,$location){
    $('#red_check_list').siblings().removeClass("selected");
    $('#red_check_list').addClass("selected");
    /**
     * 详情
     */
    RedInvoiceService.invoiceDetail({invoice_id : $stateParams.invoice_id},function(data){
        $scope.invoice_detail = data;
        if($scope.invoice_detail.invoice_amount != null){
            $scope.tax_amount = $scope.invoice_detail.invoice_amount * 0.06;
        }
        if($scope.invoice_detail.order_id != null){
            get_invoice_order($scope.invoice_detail.order_id);
        }
    },function(error){
        alert(error.data.msg);
    });
    function get_invoice_order(order_id){
        orderService.orderDetail({order_id:order_id},{},function(data){
            $scope.order_detail = data;
        },function(error){
            alert(error.data.msg)
        })
    }
});