angular.module('iprpAdminApp').controller('NtOrderDetailCtrl',function($scope,$modal,ntOrderService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
    $('#nt_order_list').parent().siblings().children('a').removeClass("selected");
    $('#nt_order_list').addClass("selected");

    $scope.czUrl = rootConfig.czUrl;

    /**
     * 订单详情
     */
    ntOrderService.orderDetail({order_sn:$stateParams.order_sn},function(data){
        $scope.order_detail = data;
        if ($scope.order_detail) {
            $scope.loading_text = "没有符合条件的记录";//加载页面内容
        }
    },function(error){
        alert(error.data.msg);
    });

});

