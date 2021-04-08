angular.module('iprpAdminApp').controller('UserManageListCtrl', function ($scope,PaginationService,ChannelService,MemberService,$location) {
    $('#apply_user_list').removeClass("selected");
    $('#assignService_list').removeClass("selected");
    $('#user_list').siblings().removeClass("selected");
    $('#user_list').addClass("selected");
    //渠道列表
    ChannelService.channel.channel_all({
        "pg_index":0,
        "pg_count":999
    },function(data){
        $scope.channel_list = data.elements;
    });
    //用户管理列表
    init_member_manage_list();
    function init_member_manage_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            MemberService.list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "company_name":$scope.company_name === "" || $scope.company_name === undefined ? null : encodeURI($scope.company_name),
                "type":$scope.type,
                "channel_code":$scope.channel_code === "" ? null : $scope.channel_code,
                "phone" : $scope.account === "" || $scope.account === undefined ? null : !/^1[0-9]{10}$/.test($scope.account) ? null:$scope.account,
                "email" : $scope.account === "" || $scope.account === undefined ? null : $scope.account.indexOf('@') === -1 ? null:$scope.account
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.member_list = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.member_list = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //按条件查询
    $scope.search = function(){
        init_member_manage_list();
    };
    //查看详情
    $scope.member_detail = function(index){
        $location.path('main/user_home/user_detail/' + index);
    };
    //编辑
    $scope.edit_member = function(index){
        $location.path('main/user_home/edit_user/' + index);
    };
    //会员的服务记录
    $scope.member_service = function(index){
        $location.path('main/user_home/service_record/' + index);
    };
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
