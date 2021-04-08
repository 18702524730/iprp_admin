angular.module('iprpAdminApp').controller('ServicerListCtrl',function($scope,PaginationService,ServicerService,$location){
    $('#bad_servicer_list').removeClass("selected");
    $('#servicer_list').siblings().removeClass("selected");
    $('#servicer_list').addClass("selected");
    $scope.obj = {};
    init_service_list();
    function init_service_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            ServicerService.service_list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "name" : !$scope.obj.name ? null : encodeURI($scope.obj.name),
                 status : "" === $scope.obj.status ? null : $scope.obj.status,
                 isCxb : "" === $scope.obj.isCxb ? null : $scope.obj.isCxb
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
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
    /**
     * 搜索
     */
    $scope.search = function(){
        init_service_list();
    };
    /**
     * 获取服务详情
     */
    $scope.detail = function(index){
        $location.path('/main/merchant_home/servicer_detail/' + index);
    };
    /**
     * 编辑服务
     */
    $scope.update = function(index){
        $location.path('/main/merchant_home/edit_servicer/' + index);
    };
    $scope.service = function(index){
        $location.path('main/merchant_home/servicer_manage/' + index);
    };
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
