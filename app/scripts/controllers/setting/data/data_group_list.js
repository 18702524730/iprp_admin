angular.module('iprpAdminApp').controller('DataGroupListCtrl', function ($scope,DateGroupService,PaginationService,$location) {
    $('#admin_list').siblings().removeClass("selected");
    $('#admin_list').addClass("selected");

    var array = [];
    init_data_group_list();
    function init_data_group_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            DateGroupService.data_group_list({
                "pg_index":pg_index,
                "pg_count":pg_count
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.allId = [];
            $scope.data_group_list = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.data_group_list = newItems;
            newItems.forEach(function(obj){
                array.push(obj.dg_id);
            });
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    /**
     * 单个删除
     */
    var delete_admin = [ ];
    $scope.delete_data_group = function(admin_id){
        delete_admin.push(admin_id);
        if(confirm("您确定删除吗?")){
            DateGroupService.deleteBatch({dg_ids: delete_admin},{},function (data) {
                var delete_admin = [ ];
                init_data_group_list();
            },function(error){
                alert(error.date.msg);
            })
        }
    }

    /**
     * 批量删除
     */
    $scope.deleteAll = function(){
        if($scope.allId.length === 0){
            alert("请选择管理员！");
            return;
        }
        if(confirm('您确定要删除吗?')) {
            DateGroupService.deleteBatch({dg_ids: $scope.allId},{},function (data) {
                init_data_group_list();
                $scope.allId = [];
                $scope.checkall = false;
                alert("删除成功")
            }, function (result) {
                alert(result.data.msg);
            });
        }
    }


    //单选
    $scope.checkall = false;
    $scope.sChoose = function(id){
        if($scope.allId.indexOf(id) !== -1){
            $scope.allId.splice($scope.allId.indexOf(id),1);
        }else{
            $scope.allId.push(id);
        }
        if($scope.allId.length === array.length){
            $scope.checkall = true;
        }else{
            $scope.checkall = false;
        }
    };
    //全选
    $scope.allChoose = function(){
        $scope.checkall = !$scope.checkall;
        if($scope.checkall){
            $scope.allId = angular.copy(array);
        }else{
            $scope.allId = [];
        }
    };

    //编辑
    $scope.edit_data_group = function(index){
        $location.path('main/setting_home/edit_data_group/' + index);
    }
    //提示操作
    $scope.hint=false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});