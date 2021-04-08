angular.module('iprpAdminApp').controller('RejectCheckCtrl',function($scope,RefundService,$stateParams,$location){
    $('#refund_list').siblings().removeClass("selected");
    $('#refund_list').addClass("selected");
    /**
     * 查询详情
     */
    detail();
    function detail() {
        RefundService.refundDetail({refund_id: $stateParams.refund_id}, function (data) {
            $scope.refund_detail = data;
        }, function (error) {
            alert(error.data.msg);
        })
    }

    /**
     * 更新退款
     */
    $scope.auditFun = function(){
        $location.path("/main/trade_home/update_refund/" + $stateParams.refund_id);
    };
});

