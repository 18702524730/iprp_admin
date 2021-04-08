angular.module('iprpAdminApp').controller('CzOrderDetailCtrl',function($scope,$modal,ntOrderService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
    $('#cz_list').addClass("selected").parent().siblings().children('a').removeClass("selected");

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

