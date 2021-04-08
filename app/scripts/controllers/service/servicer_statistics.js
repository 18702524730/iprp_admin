angular.module('iprpAdminApp').controller('ServicerStatisticsCtrl',function($scope,PaginationService,ServicerService,$location){
    $('#servicer_statistics').addClass("selected").siblings().removeClass("selected");
    $scope.obj = {};

    // 添加时间控件 初始化
    $('#order_start_time,#order_end_time').datetimepicker({
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn:  1,
        autoclose: true
    });
    $('.datetimepicker').css('display','none');

    // 获取服务商
    ServicerService.common_service_list(function(data){
        $scope.spList = data.elements;
    });
    //获取当月第一天
    var getCurMonth = function () {
      var _date = new Date();
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      return year + "-" + month + "-01 00:00:00";
    };
    $scope.order_start_time = getCurMonth();

    init_service_list();

    function init_service_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            ServicerService.spstatistic({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "sp_id" : !$scope.obj.sp_id ? null : $scope.obj.sp_id,
                order_start_time: $scope.order_start_time? new Date($scope.order_start_time).getTime() : null,
                order_end_time: $scope.order_end_time ? new Date($scope.order_end_time).getTime() + 86399000 : null
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

        $scope.$watch('pagination.allData',function(newItems){
            $scope.allData = newItems || {};
        });
    }
    /**
     * 搜索
     */
    $scope.search = function(){
        init_service_list();
    };

    $scope.search_reset = function (){
      $scope.obj = {};
      $scope.order_start_time = null;
      $scope.order_end_time = null;
      init_order_list();
    }
});
