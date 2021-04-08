angular.module('iprpAdminApp').controller('OrderDetailCtrl',function($scope,$modal,orderService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
     $('#order_list').siblings().removeClass("selected");
    $('#order_list').addClass("selected");
    /**
     * 订单详情
     */
    orderService.orderDetail({order_id:$stateParams.order_id},function(data){
        $scope.order_detail = data;
    },function(error){
        alert(error.data.msg);
    });
    
    //服务单详情
    $scope.bs_detail_orders = function(bs_order_type, order_sn){
        if (bs_order_type == 0) {
            $location.path('main/trade_home/bs_order_detail/' + order_sn);
        }else if(bs_order_type == 1){
            $location.path('main/trade_home/nt_order_detail/' + order_sn);
        }
        /*ChannelBsService.channelBs.detail({
            order_id:order_id
        },function(data){
            $scope.channelBsDetail  = data;
            window.open('http://'+ $scope.channelBsDetail.viewUrl + "?" + "order_sn=" + order_sn)
        },function(errror){
            alert(errror.data.msg);
        })*/
    }
});

