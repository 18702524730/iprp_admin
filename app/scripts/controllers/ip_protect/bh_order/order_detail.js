angular.module('iprpAdminApp').controller('BhOrderDetailCtrl',function($scope,$modal,session,$cookies,ipService,OrderPaymentService,BusinessesService,MemberService,ChannelBsService,$stateParams,$location){
    $('#protect_list').addClass("selected").parent().siblings().children().removeClass("selected");

    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    $scope.businessSn = $stateParams.businessSn;
    /**
     * 订单详情
     */
    var getDetail = function() {
        ipService.ipProtectDetail({businessSn:$stateParams.businessSn},function(data){
            $scope.order_detail = data;
            if(data.voucher){
                $scope.order_voucher = JSON.parse(data.voucher)
                for(var i=0; i<$scope.order_voucher.length; i++){
                    $scope.order_voucher[i].fileName = decodeURI($scope.order_voucher[i].fileName)
                }
            }else{
                $scope.order_voucher = ''
            }
            
        },function(error){
            alert(error.data.msg);
        });
    }
    getDetail();

    // 受理弹窗
    $scope.checkFn = function(businessSn){
        $modal.open({
            resolve:{
              businessSn : function(){
                  return businessSn;
              }
            },
            templateUrl: 'package\\modal\\ip_bhrect\\check.html',
            controller: 'BhipProtectCheckCtrl'
        }).result.then(function (result) {
            getDetail();
        });
    };

    // 结案反馈
    $scope.feedbackFn = function(businessSn){
        $modal.open({
            resolve:{
              businessSn : function(){
                  return businessSn;
              }
            },
            templateUrl: 'package\\modal\\ip_bhrect\\report.html',
            controller: 'BhipProtectOrderReportCtrl'
        }).result.then(function (result) {
            getDetail();
        });
    };
    var MsecFormat = function (input) {
        if(input == null || input=='' || typeof(input) == "undefined"){
            return "--";
        }
        var _date = new Date(input-0);
        var year = _date.getFullYear();
        var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
        var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
        var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
        var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
        var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
        return year + "-" + month + "-" + day;
    };
});

