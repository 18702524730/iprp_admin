angular.module('iprpAdminApp').controller('SpBillCtrl', function ($scope,BillService,PaginationService,$location) {
    $('#sp_bill').siblings().removeClass("selected");
    $('#sp_bill').addClass("selected");

    /**
     * 结算单列表
     * @param index
     */
    $scope.obj = {};
    init_service_list();
    function init_service_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            BillService.bill.bill_service_list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "name" : !$scope.obj.name ? null : encodeURI($scope.obj.name)
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
     * 结算订单列表
     * @param index
     */
    $scope.statement_detail = function(index){
        $location.path('main/merchant_home/statement/' + index);
    };

    //提示操作
    $scope.hint=false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
