angular.module('iprpAdminApp').controller('WaitRefundCtrl',function($scope,RefundService,$stateParams,$location,PaymentService,ChannelService) {
    $('#refund_list').siblings().removeClass("selected");
    $('#refund_list').addClass("selected");
    /**
     * 查询详情
     */
    $scope.wait_refund_obj = { };
    detail();
    function detail() {
        RefundService.refundDetail({refund_id: $stateParams.refund_id}, function (data) {
            $scope.refund_detail = data;
            if($scope.refund_detail.channel_id != null){
                channel_detail();
            }
        }, function (error) {
            alert(error.data.msg);
        })
    }
    /**
     * 获取渠道详情
     */
    function channel_detail(){
        ChannelService.channel.detail({channel_id:$scope.refund_detail.channel_id},function(data){
            $scope.channel_detail = data;
            if($scope.channel_detail != undefined){
                //判断渠道是否支持线上退款(0不支持)
                if($scope.channel_detail.online_pay === 0){
                    $scope.wait_refund_obj.type = 0;
                }else{
                    $scope.wait_refund_obj.type = 1;
                }
            }
        });
    }
    // 财务退款(如果为线上退款时只需要调用退款接口即可，支付宝退款则需要返回支付宝url进行页面跳转)
    $scope.refund_submit = function(){
        if(!$scope.wait_refund_obj.return_message){
            $scope.refund_check_form.submitted = true;
        }else{
            if($scope.wait_refund_obj.type === 1 || $scope.wait_refund_obj.type === '1'){
                $scope.wait_refund_obj.refund_sn = $scope.refund_detail.refund_sn;
                $scope.wait_refund_obj.audit_state = 1;
                PaymentService.refund($scope.wait_refund_obj, function(data) {
                    $scope.payment_list = data;
                    if (null != $scope.payment_list && $scope.payment_list.length > 0) {
//                    打开新页面并监听页面是否关闭，关闭后跳转至列表
                        var winObj = null;
                        angular.forEach($scope.payment_list, function(data){
                            winObj = window.open(data.url);
                        });
                        var loop = setInterval(function () {
                            if (winObj.closed) {
                                clearInterval(loop);
                                history.go(-1);
                            }
                        }, 1);
                    }else {
                        $location.path("/main/trade_home/refund_list");
                    }
                },function(err){
                    alert(err.data.msg);
                })
            }else if($scope.wait_refund_obj.type === 0 || $scope.wait_refund_obj.type === '0'){
                $scope.refund_detail.type = $scope.wait_refund_obj.type;
                $scope.refund_detail.audit_state = 1;
                $scope.refund_detail.return_message = $scope.wait_refund_obj.return_message;
                PaymentService.off_refund({refund_id: $stateParams.refund_id}, $scope.refund_detail, function (data) {
                    $location.path("/main/trade_home/refund_list");
                }, function (error) {
                    alert(error.data.msg);
                })
            }
        }
    };

    //驳回（财务驳回待审核）
    $scope.refund_reject = function(){
        if(!$scope.wait_refund_obj.return_message){
            $scope.refund_check_form.submitted = true;
        }else{
            $scope.refund_detail.audit_state = 2;
            $scope.refund_detail.content = "驳回退款，原因：" + $scope.refund_detail.return_message;
            RefundService.refundAudit({refund_id:$stateParams.refund_id},$scope.refund_detail, function (data) {
                $location.path("/main/trade_home/refund_list");
            }, function (error) {
                alert(error.data.msg);
            })
        }
    };
});