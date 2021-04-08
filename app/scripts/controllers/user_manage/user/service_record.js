angular.module('iprpAdminApp').controller('ServiceRecordCtrl', function ($scope,MemberService,$stateParams) {
    $('#user_list').siblings().removeClass("selected");
    $('#user_list').addClass("selected");
    //会员的服务记录
    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "加载中...";//加载页面内容
    MemberService.service_record({member_id:$stateParams.member_id},function(data){
        if (data == undefined)
            return;
        if (data.length === 0){
            $scope.loading_text = "没有符合条件的记录";//加载页面内容
            return;
        }
        $scope.member_service_record = data;
        $scope.to_loading = false;//如果不为空 结束加载页面
    },function(error){
        alert(error.data.msg);
    })
});
