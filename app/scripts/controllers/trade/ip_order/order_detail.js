angular.module('iprpAdminApp').controller('IpOrderDetailCtrl',function($scope,$modal,session,$cookies,ipService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
     $('#ip_order_list').siblings().removeClass("selected");
    $('#ip_order_list').addClass("selected");

    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    $scope.orderSn = $stateParams.orderSn;
    /**
     * 订单详情
     */
    var getDetail = function() {
        ipService.orderDetail({orderSn:$stateParams.orderSn},function(data){
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
            templateUrl: 'package\\modal\\ip_order\\check.html',
            controller: 'ipOrderCheckCtrl'
        }).result.then(function (result) {
            getDetail();
        });
    };

    // 上传弹窗
    $scope.uploadFn = function(orderSn){
        $modal.open({
            resolve:{
              orderSn : function(){
                  return orderSn;
              }
            },
            templateUrl: 'package\\modal\\ip_order\\report.html',
            controller: 'ipOrderReportCtrl'
        }).result.then(function (result) {
            getDetail();
        });
    };
});

