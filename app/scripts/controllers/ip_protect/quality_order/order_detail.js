angular.module('iprpAdminApp').controller('QualityOrderDetailCtrl',function($scope,$modal,session,$cookies,ipService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
    $('#quality_list').addClass("selected").siblings().removeClass("selected");

    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    $scope.orderSn = $stateParams.orderSn;
    /**
     * 订单详情
     */
    var getDetail = function() {
        ipService.findStereoProtectOrderDetail({orderSn:$stateParams.orderSn},function(data){
            $scope.order_detail = data;
        },function(error){
            alert(error.data.msg);
        });
    }
    getDetail();

    // 受理弹窗
    $scope.checkFn = function(orderSn){
        $modal.open({
            resolve:{
              orderSn : function(){
                  return orderSn;
              }
            },
            templateUrl: 'package\\modal\\ip_protect\\check.html',
            controller: 'ipProtectCheckCtrl'
        }).result.then(function (result) {
            getDetail();
        });
    };

    // 结案反馈
    $scope.feedbackFn = function(orderSn){
        $modal.open({
            resolve:{
              orderSn : function(){
                  return orderSn;
              }
            },
            templateUrl: 'package\\modal\\ip_protect\\report.html',
            controller: 'ipProtectOrderReportCtrl'
        }).result.then(function (result) {
            getDetail();
        });
    };
});

