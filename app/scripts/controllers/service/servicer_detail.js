angular.module('iprpAdminApp').controller('ServicerDetailCtrl',function($scope,$stateParams,BusinessService,ServicerService,$location){
    $('#servicer_list').siblings().removeClass("selected");
    $('#servicer_list').addClass("selected");
    /**
     * 获取服务商详情
     */
    ServicerService.serviceDetail({sp_id:$stateParams.sp_id},function(data){
        $scope.service_detail  = data;
    },function(error){
        alert(error.data.msg)
    });
    /**
     * 查询服务商下的服务
     */
    BusinessService.findSpIdBusiness({sp_id:$stateParams.sp_id},function(data){
        $scope.business = data;
    },function(error){
        alert(error.data.msg)
    });
    //重置密码
    $scope.resetPwd = function(){
        $location.path('main/service_home/reset_pwd/' + $stateParams.sp_id);
    }
});
