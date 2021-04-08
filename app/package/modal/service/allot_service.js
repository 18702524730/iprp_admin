angular.module('iprpAdminApp').controller('AllotServiceCtrl', function ($scope,ServicerService,BusinessesService,PaginationService,array_sp_ids,$location) {

    $scope.obj = { };
    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "加载中...";//加载页面内容

    init_service_list();
    function init_service_list(){
        if(array_sp_ids === undefined || array_sp_ids.length === 0){
            array_sp_ids = "";
        }
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            ServicerService.orders_allot_service({
                "pg_index":pg_index,
                "pg_count":pg_count,
                 "sp_ids" : array_sp_ids,
                 status : 1,
                "name" : !$scope.obj.name ? null : encodeURI($scope.obj.name)
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,10);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.allId = [];
            $scope.serviceList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.serviceList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //搜索
    $scope.search = function(){
        init_service_list();
    }

    //确定
    $scope.allot_service = function(sp_id,sp_code,name){
        $scope.$close({sp_id:sp_id,sp_code:sp_code,sp_name:name});
    }
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});