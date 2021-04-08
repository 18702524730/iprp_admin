angular.module('iprpAdminApp') .controller('OpenInvoiceDetailCtrl', function ($scope,InvoiceService,orderService,$stateParams) {
    $('#unopen_list').siblings().removeClass("selected");
    $('#unopen_list').addClass("selected");
    //详情
    InvoiceService.invoice.detail({invoice_id : $stateParams.invoice_id},function(date){
        $scope.invoice_detail = date;
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
        orderService.orderDetail({order_id:order_id},{},function(date){
            $scope.order_detail = date;
        },function(error){
            alert(error.data.msg)
        })
    }
});