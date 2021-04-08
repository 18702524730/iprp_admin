angular.module('iprpAdminApp').controller('WmOrderDetailCtrl',function($scope,$modal,cxbOrderService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
    $('#wm_order_list').parent().siblings().children('a').removeClass("selected");
    $('#wm_order_list').addClass("selected");
    /**
     * 订单详情
     */
    $scope.setupList = {};
    $scope.bsDetail = function(){
        cxbOrderService.orderDetail({workOrderSn:$stateParams.order_sn},function(data){
            $scope.order_detail = data;
             // 获取服务商
            /*cxbOrderService.setupList({bsId:$scope.order_detail.bs_id},{},function(data){
                $scope.setupList = data.elements;
            });*/
            if ($scope.order_detail) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
            }
        },function(error){
            alert(error.data.msg);
        });
    };
    $scope.bsDetail();
    /**
     * 设置服务状态
     */
    $scope.setServiceState = function(order_detail){
        $modal.open({
            resolve:{
                order_detail : function(){
                    return order_detail;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\bs_order\\set_service_state.html',
            controller: 'setServiceStateCtrl'
        }).result.then(function (result) {
            console.log(result);
                /*$scope.order_detail.sp_id = result.sp_id;
                $scope.order_detail.sp_code = result.sp_code;
                $scope.order_detail.sp_name = result.sp_name;
                cxbOrderService.regainOrAllot({
                    order_id:$stateParams.order_id,
                    is_rebuild_sp:2
                },$scope.order_detail,function(data){
                    $location.path('/main/trade_home/order_list')
                },function(error){
                    alert(error.data.msg);
                })*/
        });
    };

    //查看退款原因
    $scope.refund_reason = function(item){
        $modal.open({
            resolve:{
                itemData : function(){
                    return item;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\bs_order\\refund_reason.html',
            controller: 'refundReasonCtrl'
        }).result.then(function (result) {
                /*$scope.order_detail.sp_id = result.sp_id;
                $scope.order_detail.sp_code = result.sp_code;
                $scope.order_detail.sp_name = result.sp_name;
                cxbOrderService.regainOrAllot({
                    order_id:$stateParams.order_id,
                    is_rebuild_sp:2
                },$scope.order_detail,function(data){
                    $location.path('/main/trade_home/order_list')
                },function(error){
                    alert(error.data.msg);
                })*/
        });
    };
    //设置服务商
    $scope.refund_setup = function(item,setup){
        $modal.open({
            resolve:{
                itemData : function(){
                    return item;
                },
                setup : function(){
                    return setup;
                }
            },
            templateUrl: 'package\\modal\\bs_order\\setup.html',
            controller: 'SetupCtrl'
        }).result.then(function (result) {
            $scope.bsDetail();
        })
    }
});

