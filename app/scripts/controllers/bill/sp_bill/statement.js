angular.module('iprpAdminApp').controller('StatementCtrl', function ($scope,ServicerService,BillService,PaginationService,$stateParams,$location) {
    $('#sp_bill').siblings().removeClass("selected");
    $('#sp_bill').addClass("selected");

    /**
     * 获取服务商详情
     */
    ServicerService.serviceDetail({sp_id:$stateParams.sp_id},function(data){
        $scope.service_detail  = data;
    },function(error){
        alert(error.data.msg)
    });

    $scope.obj = { };
    init_service_bill_list();
    function init_service_bill_list(){
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
            BillService.bill.get({
                sp_id : $stateParams.sp_id,
                "beginTime" :query_start_date,
                "endTime" :query_end_date,
                "pg_index":pg_index,
                "pg_count":pg_count,
                "type" : !$scope.obj.type ? null : $scope.obj.type
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.billList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.billList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

   //按条件查询
   $scope.search = function(){
       init_service_bill_list();
   };

    /**
     * 结算单列表
     * @param index
     */
    $scope.bill_detail = function(index){
        $location.path('main/bill_home/bill_detail/' + index);
    }
});