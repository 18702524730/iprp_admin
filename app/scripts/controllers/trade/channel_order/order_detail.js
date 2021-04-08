angular.module('iprpAdminApp').controller('COrderDetailCtrl',function($scope,$modal,session,$cookies,orderService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
    $('#channel_order').addClass("selected").siblings().removeClass("selected");

    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    /**
     * 订单详情
     */
    orderService.channelOrderDetail({orderFictitiousSn:$stateParams.order_sn},function(data){
        $scope.order_detail = data;
    },function(error){
        // console.log(error)
        alert(error.data.msg);
    });

    //服务单详情
    $scope.bs_detail_orders = function(order, order_sn){
        if($scope.order_detail.orderFrom == '4'){
            $location.path('main/trade_home/partner_bs_order_detail/' + order_sn);
            return;
        }
        if (order.bs_order_type == 0) {
            $location.path('main/trade_home/bs_order_detail/' + order_sn);
        }else if(order.bs_order_type == 1){
            if (session.containModel('IPRPNtOrderManageModel')) {
                $location.path('main/trade_home/nt_order_detail/' + order_sn);
            }else{
                layer.alert('',{
                    title:'提示',
                    type: 0,
                    shadeClose:true,
                    content: '权限不足，若需要请联系管理员申请',
                    btn: '确定'
                }, function(index){
                    layer.close(index);
                });
            }
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

