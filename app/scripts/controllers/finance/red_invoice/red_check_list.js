angular.module('iprpAdminApp').controller('RedCheckListCtrl', function ($scope,RedInvoiceService,PaginationService,$location) {
        $('#red_check_list').siblings().removeClass("selected");
        $('#red_check_list').addClass("selected");
        /**
         * 红色待审核发票列表
         * @type {Array}
         */
        var array = [];
        $scope.promptMSG = "";
        $scope.obj = { };
        init_check_invoice_list();
        function init_check_invoice_list(){
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
            $scope.to_loading = true;//默认 开始 加载
            $scope.loading_text = "加载中...";//加载页面内容
            var OweNer = function(pg_index,pg_count,cb){
                RedInvoiceService.red_check_list({
                    "pg_index":pg_index,
                    "pg_count":pg_count,
                    "beginUpdateTime" :query_start_date,
                    "endUpdateTime" :query_end_date,
                    "order_sn":$scope.obj.order_sn === undefined || $scope.obj.order_sn === "" ? null :$scope.obj.order_sn,
                    "open_code":$scope.obj.open_code === undefined || $scope.obj.open_code === "" ? null :$scope.obj.open_code,
                    "open_number":$scope.obj.open_number === undefined || $scope.obj.open_number === "" ? null :$scope.obj.open_number,
                    "open_type":$scope.obj.open_type  === "" ? null :$scope.obj.open_type,
                    "type":$scope.obj.type === "" ? null :$scope.obj.type,
                    "pid" : -1,
                    "audit_state":-1,
                    "state" :0       //0 是未开的
                },cb);
            };
            $scope.pagination = new PaginationService(OweNer,15);

            $scope.$watch('pagination.curPageItems',function(newItems){
                $scope.red_check_InvoiceList = [];
                if(newItems == undefined)
                    return;
                if ($scope.pagination.curPageItems.length === 0){
                    $scope.loading_text = "没有符合条件的记录";//加载页面内容
                    return;
                }
                $scope.red_check_InvoiceList = newItems;
                $scope.to_loading = false;//如果不为空 结束加载页面
            });
        }
        /**
         * 按条件查询
         */
        $scope.search = function(){
            init_check_invoice_list();
        };
        /**
         * 处理
         * @param index
         */
        $scope.check = function(index){
            $location.path('main/finance_home/red_check/' + index)
        };
        /**
         * 查看详情
         * @param index
         */
        $scope.detail = function(index){
            $location.path('main/finance_home/red_check/' + index)
        };
        //提示操作
        $scope.hint=true;
        $scope.hints = function(){
            $scope.hint = !$scope.hint;
        }
    });
