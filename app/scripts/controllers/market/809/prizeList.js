angular.module('iprpAdminApp').controller('MarketPrizeListCtrl',function($scope,marKetList,ChannelService,PaginationService,$location,$state){
  $('#order_list').addClass("selected").parent().siblings().children().removeClass("selected");
    var MsecFormat = function (input) {
        if(input == null || input=='' || typeof(input) == "undefined"){
            return "--";
        }
        
    };
    init_order_list();
    function init_order_list() {
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function (pg_index, pg_count, cb) {
            var pageConfig = {
                "pg_index": pg_index,
                "pg_count": pg_count
            };
            $location.path('main/market_home/prizeList');
            // marKetList.prize(pageConfig, cb);
            $scope.winingnum = marKetList.prize(pageConfig, cb);
        };
        $scope.pagination = new PaginationService(OweNer, 15);
        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.OrderList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.OrderList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    //下载
    $scope.exportdata = function(type){
        marKetList.exportwin({type:type},function(data){
            if(data.excel_url){
                location.href=data.excel_url;
            }
        },function(error){

        });
    }
});

