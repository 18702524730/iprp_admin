angular.module('iprpAdminApp').controller('BadServicerListCtrl',function($scope,BadServicerService,PaginationService,$location){

    $('#bad_servicer_list').siblings().removeClass("selected");
    $('#bad_servicer_list').addClass("selected");

    $scope.obj = { };
    init_badService_list();
    function init_badService_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            BadServicerService.badService_list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "name" : !$scope.obj.name ? null : encodeURI($scope.obj.name),
                 "account" : !$scope.obj.account ? null : encodeURI($scope.obj.account)
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.badServiceList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.badServiceList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //按条件搜索
    $scope.search = function(){
        init_badService_list();
    }
    //管理服务商
    $scope.detail_badService = function(index){
        $location.path('/main/merchant_home/edit_badServicer/' + index);
    }
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});