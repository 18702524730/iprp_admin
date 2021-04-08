angular.module('iprpAdminApp').controller('KeeperListCtrl',function($scope,keerperReport,ChannelService,PaginationService,$location,$state){
  $('#keerper_admin_list').addClass("selected").parent().siblings().children().removeClass("selected");
  // 申请时间排序
  $scope.isActive = false;
  //降序
  $scope.downClick = function(){
      $scope.isActive = false;
      $scope.obj.reorder = 2;
      init_order_list();
  };
  //升序
  $scope.onClick = function(){
      $scope.isActive = true;
      $scope.obj.reorder = 1;
      init_order_list();
  };
   $('#order_list').addClass("selected").parent().siblings().children().removeClass("selected");

  // 添加时间控件 初始化
  $('#finished_start_time,#finished_end_time,#payment_start_time,#payment_end_time').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose:  true
  }); 
    var MsecFormat = function (input) {
        if(input == null || input=='' || typeof(input) == "undefined"){
            return "--";
        }
        var _date = new Date(input-0);
        var year = _date.getFullYear();
        var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
        var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
        var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
        var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
        var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
        return year + "-" + month + "-" + day;
    };
    $scope.obj = $location.search() || {};
    $scope.obj.reorder = 2;
    $scope.finished_start_time = $scope.obj.finished_start_time && MsecFormat($scope.obj.finished_start_time);
    $scope.finished_end_time = $scope.obj.finished_end_time && MsecFormat($scope.obj.finished_end_time );
    $scope.payment_start_time = $scope.obj.payment_start_time && MsecFormat($scope.obj.payment_start_time);
    $scope.payment_end_time = $scope.obj.payment_end_time  && MsecFormat($scope.obj.payment_end_time );
    init_order_list();
    function init_order_list() {
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容

        // 组装后台字段bs_calss_type值
        var get_bs_calss_type = function(){
          var ret = '';
          if ($scope.obj.fir_id) {
            ret = $scope.obj.thi_id ? 3 : $scope.obj.sec_id ? 2 : $scope.obj.fir_id ? 1 : ''
          }else{
            ret = $scope.typeobj.thi_id ? 3 : $scope.typeobj.sec_id ? 2 : $scope.typeobj.fir_id ? 1 : ''
          }
          return ret;
        };


        //获取存证时间 finished_start_time
        var get_finished_start_time = function () {
          if (!$scope.finished_start_time ) {
            return ''
          } else {
            if (!$scope.obj.finished_start_time) {
              return new Date($scope.finished_start_time).getTime();
            } else {
              if (typeof $scope.obj.finished_start_time != 'string') {
                return new Date($scope.obj.finished_start_time).getTime()
              } else {
                return $scope.obj.finished_start_time - 0;
              }
            }
          }
        };

        //获取时间  finished_end_time
        var get_finished_end_time = function () {
          if(!$scope.finished_end_time) {
            return ''
          } else {
            if(!$scope.obj.finished_end_time) {
              return new Date($scope.finished_end_time).getTime() + 86399000
            } else {
              if(typeof $scope.obj.finished_end_time != 'string' ) {
                return new Date($scope.obj.finished_end_time).getTime() ;
              } else {
                return parseInt($scope.obj.finished_end_time,10) ;
              }
            }
          }
        };

        //获取出证时间 payment_start_time
        var get_payment_start_time = function () {
          if (!$scope.payment_start_time ) {
            return ''
          } else {
            if (!$scope.obj.payment_start_time) {
              return new Date($scope.payment_start_time).getTime();
            } else {
              if (typeof $scope.obj.payment_start_time != 'string') {
                return new Date($scope.obj.payment_start_time).getTime()
              } else {
                return $scope.obj.payment_start_time - 0;
              }
            }
          }
        };

        //获取时间 payment_end_time
        var get_payment_end_time = function () {
          if(!$scope.payment_end_time) {
            return ''
          } else {
            if(!$scope.obj.payment_end_time) {
              return new Date($scope.payment_end_time).getTime() + 86399000
            } else {
              if(typeof $scope.obj.payment_end_time != 'string' ) {
                return new Date($scope.obj.payment_end_time).getTime() ;
              } else {
                return parseInt($scope.obj.payment_end_time,10) ;
              }
            }
          }
        };

        var OweNer = function (pg_index, pg_count, cb) {
            var pageConfig = {
                "pg_index": pg_index,
                "pg_count": pg_count,
                "startBuyTime": get_finished_start_time (),//购买开始时间
                "endBuyTime": get_finished_end_time (),//购买结束时间
                "startApplyTime": get_payment_start_time (),//申请开始时间
                "endApplyTime": get_payment_end_time (),//申请结束时间
                "orderByTime":$scope.obj.orderByTime//申请时间升序
            };
            var object = $.extend({}, $scope.obj, pageConfig);
            $location.path('main/fast_home/keeper_list').search(object);
            keerperReport.list(object, cb);
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
    //按条件查询
    $scope.search_order = function(){
        init_order_list();
    }

    $scope.search_reset = function () {
        $scope.obj = {};
        $scope.finished_start_time = null;
        $scope.finished_end_time = null;
        $scope.payment_start_time = null;
        $scope.payment_end_time = null;
        init_order_list();
    }

    //订单编辑
    $scope.keerperManager = function(item){
        $location.path('main/fast_home/keeper_manager/'+item.id);
    }
    // 订单详情
    $scope.keerperDetail = function(item){
        $location.path('main/fast_home/keeper_detail/'+item);
    }
    //提示操作
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});