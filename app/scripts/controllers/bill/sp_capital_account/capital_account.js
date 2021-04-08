angular.module('iprpAdminApp').controller('CapitalAccountCtrl', function ($scope,CapitalAccountServiceService,PaginationService,$location) {

    $('#sp_bill').removeClass("selected");
    $('#bill_manage').removeClass("selected");
    $('#sp_capital_account').siblings().removeClass("selected");
    $('#sp_capital_account').addClass("selected");

    $scope.capital_account_obj = { };
    init_service_list();
    function init_service_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            CapitalAccountServiceService.capital_account.get({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "name" : !$scope.capital_account_obj.sp_name ? null : encodeURI($scope.capital_account_obj.sp_name)
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

    //按条件查询
    $scope.search = function(){
        init_service_list();
    }
    /**
     * 账户详情
     * @param index
     */
    $scope.account_detail = function(index){
        $location.path('main/bill_home/account_detail/' + index);
    }
    //提示操作
    $scope.hint=false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});