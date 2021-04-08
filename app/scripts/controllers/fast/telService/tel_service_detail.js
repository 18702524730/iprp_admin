angular.module('iprpAdminApp').controller('telServiceDetailCtrl',function($scope,$modal,telService,$stateParams,$location,$state){
    $('#tel_service_list').addClass("selected").parent().siblings().children('a').removeClass("selected");
    $scope.obj = $location.search() || {};
    /**
     * 订单详情
     */
    telService.detail({consultationId: $stateParams.consultationId},function(data){
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
            if (result.isPop == 0) {
                $state.reload();
                return;
            }
            $state.go('main.fast_home.tel_service_detail', {consultationId: $scope.order_detail.consultationId, isPop:0});
        });
    };
    
});

