angular.module('iprpAdminApp').controller('UnOpenListCtrl', function ($scope,InvoiceService,PaginationService,$modal,$location,session) {
    $('#unopen_list').siblings().removeClass("selected");
    $('#unopen_list').addClass("selected");
    /**
     * 未开发票列表
     * @type {Array}
     */
    var array = [];
    $scope.obj = { };
    init_uninvoice_list();
    function init_uninvoice_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            InvoiceService.invoice.unOpen_list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "order_sn":$scope.obj.order_sn === undefined || $scope.obj.order_sn === "" ? null :$scope.obj.order_sn,
                "open_code":$scope.obj.open_code === undefined || $scope.obj.open_code === "" ? null :$scope.obj.open_code,
                "open_number":$scope.obj.open_number === undefined || $scope.obj.open_number === "" ? null :$scope.obj.open_number,
                "open_type":$scope.obj.open_type  === "" ? null :$scope.obj.open_type,
                "type":$scope.obj.type === "" ? null :$scope.obj.type,
                "state" : -1, //-1 未开和开票中
                "pid" : 0
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.allId = [];
            $scope.unInvoiceList = [];
            if(newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.unInvoiceList = newItems;
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
        init_uninvoice_list();
    };
    /**
     * 开电子发票
     */
    $scope.open_invoice = function(){
        if($scope.allId.length === 0){
            alert('请选择发票！！')
        }else{
            $modal.open({
                resolve:{},
                backdrop:false,
                keyboard:true,
                templateUrl: 'package\\modal\\invoice\\open_invoice.html',
                controller: 'OpenInvoiceCtrl'
            }).result.then(function (result) {
                InvoiceService.invoice.turn_on_invoices({invoiceIds :$scope.allId,type:result.type,invoice_type:result.invoice_type},{},function(date){
                    init_uninvoice_list();
                },function(error){
                    alert(error.data.msg);
                })
            });
        }
    };
    /**
     *详情
     */
    $scope.detail = function(index){
        $location.path('main/finance_home/backfill_invoice/' + index)
    };
    /**
     * 处理
     */
    $scope.check = function(index){
        $location.path('main/finance_home/backfill_invoice/' + index)
    };
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
    /**
     *导出
     */
     $scope.listId = [];
     $scope.export = function(){
         if($scope.allId.length === 0){
             alert('请选择发票！！')
         }else{
             $scope.listId = $scope.allId;
             window.open(options.api.base_url + '/invoices/export'+ "?" +
                 "access_token=" + session.accessToken + "&" + "listId=" + $scope.listId + "&"+ "pid=" + 0 + "&" + "state=" + -1);
             InvoiceService.export.update({pid : 0,listId : $scope.listId},{},function(data){

             },function(error){
                 alert(error.data.msg)
             })
         }

     };
    //提示操作
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
