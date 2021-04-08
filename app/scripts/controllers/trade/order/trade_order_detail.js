angular.module('iprpAdminApp').controller('TradeOrderDetailCtrl',function($scope,$modal,session,$cookies,orderService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
     $('#trade_order_list').addClass("selected").parent().siblings().children().removeClass("selected");

    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    $scope.cateIdData = cateIdData;  //所有商标分类

    // 性别
    $scope.sexList = [
      {name: '男', id: 1},
      {name: '女', id: 2},
    ];
    // 是否可开票
    $scope.needTicketList = [
      {name: '是', id: 1},
      {name: '否', id: 2},
    ];
    // 转让手续
    $scope.leaveTypeList = [
      {name: '委托平台办理', id: 1},
      {name: '自行办理', id: 2},
    ];
    // 转让手续
    $scope.fapiaoList = [
      {name: '增值税普通发票', id: 1},
      {name: '增值税专用发票', id: 2},
    ];
    // 机构类别 
    $scope.sellerTypeList = [
      {name: '机构商家', id: 1},
      {name: '个人商家', id: 2},
    ];

    /**
     * 订单详情
     */
    orderService.findTradeOrderDetail({fictitious_order_sn: $stateParams.orderId},function(data){
      console.log(data)
        $scope.orderdetail = data;
    },function(error){
        alert(error.data.msg);
    });

    //服务单详情
    $scope.bs_detail_orders = function(bs_order_type, order_sn){
        if (bs_order_type == 0) {
            $location.path('main/trade_home/bs_order_detail/' + order_sn);
        }else if(bs_order_type == 1){
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

