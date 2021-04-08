angular.module('iprpAdminApp').controller('OpenListCtrl', function ($scope,InvoiceService,PaginationService,$location) {
    $('#unopen_list').siblings().removeClass("selected");
    $('#unopen_list').addClass("selected");
    $scope.obj = { };
    /**
     * 已开发票列表
     * @type {Array}
     */
    var array = [];
    $scope.promptMSG = "";
    init_open_invoice_list();
    function init_open_invoice_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            InvoiceService.invoice.open_list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "order_sn":$scope.obj.order_sn === undefined || $scope.obj.order_sn === "" ? null :$scope.obj.order_sn,
                "open_code":$scope.obj.open_code === undefined || $scope.obj.open_code === "" ? null :$scope.obj.open_code,
                "open_number":$scope.obj.open_number === undefined || $scope.obj.open_number === "" ? null :$scope.obj.open_number,
                "open_type":$scope.obj.open_type  === "" ? null :$scope.obj.open_type,
                "type":$scope.obj.type === "" ? null :$scope.obj.type,
                "state" : 2,
                "pid" : 0
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.allId = [];
            $scope.openInvoiceList = [];
            if(newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.openInvoiceList = newItems;
            newItems.forEach(function(obj){
                array.push(obj.invoice_id);
            });
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    /**
     * 按条件查询
     */
    $scope.search = function(){
        init_open_invoice_list();
    };
    /**
     *详情
     */
    $scope.detail = function(index){
        $location.path('/main/finance_home/open_invoice_detail/' + index)
    };
    /**
     * 回填物流
     * @param index
     */
    $scope.back_express = function(index){
        $location.path('/main/finance_home/backfill_express/' + index)
    };
    //提示操作
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
