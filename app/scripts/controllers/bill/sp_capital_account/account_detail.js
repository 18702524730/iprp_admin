angular.module('iprpAdminApp').controller('AccountDetailCtrl', function ($scope,ServicerService,CapitalAccountServiceService,PaginationService,$stateParams,$location) {
    $('#sp_capital_account').siblings().removeClass("selected");
    $('#sp_capital_account').addClass("selected");

    $scope.search_obj = { };
    /**
     * 获取服务商详情
     */
    ServicerService.serviceDetail({sp_id:$stateParams.sp_id},function(data){
        $scope.service_detail  = data;
    },function(error){
        alert(error.data.msg)
    });

    init_account_detail_list();
    function init_account_detail_list(){
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
            CapitalAccountServiceService.capital_account.detail({
                "pg_index":pg_index,
                "pg_count":pg_count,
                sp_id : $stateParams.sp_id,
                account_type : $scope.search_obj.account_type === "" ? null : $scope.search_obj.account_type,
                "beginTime" :query_start_date,
                "endTime" :query_end_date
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.account_detail_list = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.account_detail_list = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //按条件查询
    $scope.search = function(){
        init_account_detail_list();
    }
});