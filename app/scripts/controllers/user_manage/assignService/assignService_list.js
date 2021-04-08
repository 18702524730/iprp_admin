angular.module('iprpAdminApp').controller('AssignServiceListCtrl', function ($scope,AssignService,PaginationService,$location) {
    $('#assignService_list').siblings().removeClass("selected");
    $('#assignService_list').addClass("selected");
    init_member_list();
    function init_member_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            AssignService.Assign.get_list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "code" :$scope.code === undefined || $scope.code === "" ? null : $scope.code
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.member_assign_list = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.member_assign_list = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //根据条件查询
    $scope.search = function(){
        init_member_list();
    };
    /**
     * 用户编辑指定服务
     */
    $scope.user_edit_service = function(index){
        $location.path('/main/user_home/assignService/' + index)
    };
    /**
     * 编辑
     */
    $scope.update = function(index){
        $location.path('/main/user_home/edit_assignService/' + index)
    };
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});