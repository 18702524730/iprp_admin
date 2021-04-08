angular.module('iprpAdminApp').controller('PartnerOrderListCtrl',function($scope,orderService,ChannelService,PaginationService,$location,$state, session){
  $('#partner_order_list').addClass("selected").parent().siblings().children().removeClass("selected");

  // 添加时间控件 初始化
  $('#startCreateTime,#endCreateTime,#payment_start_time,#payment_end_time').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose:  true
  });
  $('.datetimepicker').css('display','none');

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
  $scope.startCreateTime = $scope.obj.startCreateTime && MsecFormat($scope.obj.startCreateTime);
  $scope.endCreateTime = $scope.obj.endCreateTime && MsecFormat($scope.obj.endCreateTime );
  //$scope.payment_start_time = $scope.obj.payment_start_time && MsecFormat($scope.obj.payment_start_time);
  //$scope.payment_end_time = $scope.obj.payment_end_time  && MsecFormat($scope.obj.payment_end_time );
  //$scope.obj.is_filter_test = $scope.obj.is_filter_test == '1' ? true : false;

  //前面赋值后重置，避免时间获取潜在bug
  $scope.obj.startCreateTime = null;
  $scope.obj.endCreateTime = null;
  //$scope.obj.payment_start_time = null;
  //$scope.obj.payment_end_time = null;


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


  //获取时间 startCreateTime
  var get_startCreateTime = function () {
    if (!$scope.startCreateTime ) {
      return ''
    } else {
      if (!$scope.obj.startCreateTime) {
        return new Date($scope.startCreateTime).getTime();
      } else {
        if (typeof $scope.obj.startCreateTime != 'string') {
          return new Date($scope.obj.startCreateTime).getTime()
        } else {
          return $scope.obj.startCreateTime - 0;
        }
      }
    }
  };

  //获取时间  endCreateTime
  var get_endCreateTime = function () {
    if(!$scope.endCreateTime) {
      return ''
    } else {
      if(!$scope.obj.endCreateTime) {
        return new Date($scope.endCreateTime).getTime() + 86399000
      } else {
        if(typeof $scope.obj.endCreateTime != 'string' ) {
          return new Date($scope.obj.endCreateTime).getTime() ;
        } else {
          return parseInt($scope.obj.endCreateTime,10) ;
        }
      }
    }
  };

  //获取时间 payment_start_time
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

  init_order_list();

  function init_order_list() {
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容

      var OweNer = function (pg_index, pg_count, cb) {
          var pageConfig = {
              "pgIndex": pg_index || 1,
              "pgCount": pg_count,
              "startCreateTime": get_startCreateTime (),
              "endCreateTime": get_endCreateTime (),
              "idHaveTest":$scope.obj.idHaveTest ? 1 : null
          };
          var object = $.extend({}, $scope.obj, pageConfig);
          $location.search(object).replace();
          // $location.path('main/trade_home/order_list').search(object);
          orderService.partnerList(object, cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15, 1, true);

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
      $scope.obj = { };
      $scope.startCreateTime = null;
      $scope.endCreateTime = null;
      //$scope.payment_start_time = null;
      //$scope.payment_end_time = null;
      init_order_list();
  }

  /**
   * 查看订单详情
   * @param index
   */
  $scope.detail_orders = function(index){
      $location.path('main/trade_home/partner_order_detail/' + index);
  }

  //提示操作
  $scope.hint=false;
  $scope.hints = function(){
      $scope.hint = !$scope.hint;
  }

  $scope.search_export = function(index){
  	var pageConfig = {
      "startCreateTime": get_startCreateTime (),
      "endCreateTime": get_endCreateTime (),
      //"payment_start_time": get_payment_start_time (),
      //"payment_end_time": get_payment_end_time (),
      //"is_filter_test": $scope.obj.is_filter_test ? 1 : 0
    };
    var object = $.extend({}, $scope.obj, pageConfig);
    object.pgIndex = null;
    object.pgCount = null;
    object.access_token = session.accessToken;
  	location.href = rootConfig.adminUrl + '/iprp_operator/api/findPartnerOrdersListReport?' + $.param(object)
  }
});

