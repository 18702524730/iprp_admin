angular.module('iprpAdminApp').controller('LogsCtrl', function ($scope,AdminLogService,PaginationService) {

    $('#log_list').siblings().removeClass("selected");
    $('#log_list').addClass("selected");
    /**
     * 权限列表
     * @type {Array}
     */
    $scope.obj = { };
    $scope.promptMSG = "";
    init_log_list();
    function init_log_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var query_start_date = $scope.query_start_date;
        var query_end_date = $scope.query_end_date;
        if(query_start_date === undefined){
            query_start_date = null;
        }
        if(query_end_date === undefined){
            query_end_date = null;
        }
        query_start_date = new Date(query_start_date).getTime();
        if(query_end_date != null){
            query_end_date = new Date(query_end_date).getTime() + 86400000;
        }
        if(query_start_date === 0){
            query_start_date = null;
        }
        if(query_end_date === 0){
            query_end_date = null;
        }
        var OweNer = function(pg_index,pg_count,cb){
            AdminLogService.admin_logs_all({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "admin_name":$scope.obj.admin_name == "" || $scope.obj.admin_name == null ? null : $scope.obj.admin_name,
                "beginTime" :query_start_date,
                "endTime" :query_end_date
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.AdminLogList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.AdminLogList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    };

    /**
     * 按条件查询
     */
    $scope.search = function(){
        init_log_list();
    }

    //提示操作
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
