angular.module('iprpAdminApp').controller('epidemicReportDetailCtrl',function($scope,$modal,ipProtectService,bsOrderService,$stateParams,$location,$state,$cookies){
    $('#epidemic_report_list').addClass("selected").parent().siblings().children('a').removeClass("selected");
    $scope.obj = $location.search() || {};
    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    /**
     * 订单详情
     */
    ipProtectService.clueReportDetail({consultationId: $stateParams.consultationId},function(data){
        $scope.order_detail = data;
        if ($scope.obj.isPop==1) {
            $scope.addCustomer($scope.obj.isAdd)
        }
        if ($scope.order_detail) {
            $scope.loading_text = "没有符合条件的记录";//加载页面内容
        }
    },function(error){
        alert(error.data.msg);
    });
    //图片预览
    $scope.openmodal = function(opensrc){
        $modal.open({
            resolve:{
                ngsrc : function(){
                    return opensrc;
                }
            },
            templateUrl: 'package\\modal\\bs_order\\imgprev.html',
            controller: 'imgprevControl'
        }).result.then(function (result) {
            
        })
    };
    $scope.changeimg = function(url){
        bsOrderService.channelPrevImg({
            pdf_url: url
        },function(data){
            var urls = data.urls;
            $scope.openmodal(urls)
            console.log(data)
        },function(err){
            console.log(err)
        })
    }
    $scope.prevImg = function(src){
        $scope.changeimg(src)
    }
    /**
     * 增加联系记录
     */
    $scope.addCustomer= function(isAdd){
        $modal.open({
            resolve:{
                order_detail : function(){
                    return $scope.order_detail;
                },
                isAdd : function(){
                    return isAdd;
                },
                isPop: function(){
                    return $stateParams.isPop;
                }
            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\fast\\add_customer.html',
            controller: 'addCustomerCtrl'
        }).result.then(function (result) {
            // if (result.isPop == 0) {
            //     $state.reload();
            //     return;
            // }
            $state.reload();
            // $state.go('main.fast_home.clues_report_detail', {consultationId: $scope.order_detail.consultationId, isPop:0});
        });
    };

});

