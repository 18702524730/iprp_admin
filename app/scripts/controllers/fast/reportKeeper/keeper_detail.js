angular.module('iprpAdminApp').controller('KeeperDetailCtrl',function($scope,keerperReport,$stateParams,$location,$cookies){
    $('#keerper_admin_list').addClass("selected").parent().siblings().children().removeClass("selected");
    $scope.adminUrl = rootConfig.adminUrl;
    //获取token
    $scope.token = $cookies.get("token");
    keerperReport.detail({reportId:$stateParams.keeper_id},function(data){
        $scope.report_detail = data;
    },function(error){
        alert(error.data.msg);
    });

});

