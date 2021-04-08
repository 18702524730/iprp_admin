angular.module('iprpAdminApp').controller('CouponRecordListCtrl',function($scope,marKetList,ChannelService,PaginationService,$location,$state){
   $('#coupon_record_list').addClass("selected").parent().siblings().children().removeClass("selected");
  // 申请时间排序
  $scope.isActive = false;
  // 添加时间控件 初始化
  $('#usageTimeStart,#usageTimeEnd,#obtainTimeStart,#obtainTimeEnd').datetimepicker({
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
  $scope.buyer_mobile = null;
  $scope.buyer_email = null;
  $scope.usageTimeStart = $scope.obj.usageTimeStart && MsecFormat($scope.obj.usageTimeStart);
  $scope.usageTimeEnd = $scope.obj.usageTimeEnd && MsecFormat($scope.obj.usageTimeEnd );
  $scope.obtainTimeStart = $scope.obj.obtainTimeStart && MsecFormat($scope.obj.obtainTimeStart);
  $scope.obtainTimeEnd = $scope.obj.obtainTimeEnd  && MsecFormat($scope.obj.obtainTimeEnd );
  init_order_list();
  function init_order_list() {
    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "加载中...";//加载页面内容
    if(!!$scope.obj.account_number){
      if($scope.obj.account_number.indexOf('@') === -1){
        $scope.buyer_mobile = $scope.obj.account_number;
      }else{
        $scope.buyer_email = $scope.obj.account_number;
      }
    }else{
      $scope.buyer_mobile = null;
      $scope.buyer_email = null;
    }

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


    //获取存证时间 usageTimeStart
    var get_usageTimeStart = function () {
      if (!$scope.usageTimeStart ) {
        return ''
      } else {
        if (!$scope.obj.usageTimeStart) {
          return new Date($scope.usageTimeStart).getTime();
        } else {
          if (typeof $scope.obj.usageTimeStart != 'string') {
            return new Date($scope.obj.usageTimeStart).getTime()
          } else {
            return $scope.obj.usageTimeStart - 0;
          }
        }
      }
    };

    //获取时间  usageTimeEnd
    var get_usageTimeEnd = function () {
      if(!$scope.usageTimeEnd) {
        return ''
      } else {
        if(!$scope.obj.usageTimeEnd) {
          return new Date($scope.usageTimeEnd).getTime() + 86399000
        } else {
          if(typeof $scope.obj.usageTimeEnd != 'string' ) {
            return new Date($scope.obj.usageTimeEnd).getTime() ;
          } else {
            return parseInt($scope.obj.usageTimeEnd,10) ;
          }
        }
      }
    };

    //获取出证时间 obtainTimeStart
    var get_obtainTimeStart = function () {
      if (!$scope.obtainTimeStart ) {
        return ''
      } else {
        if (!$scope.obj.obtainTimeStart) {
          return new Date($scope.obtainTimeStart).getTime();
        } else {
          if (typeof $scope.obj.obtainTimeStart != 'string') {
            return new Date($scope.obj.obtainTimeStart).getTime()
          } else {
            return $scope.obj.obtainTimeStart - 0;
          }
        }
      }
    };

    //获取时间 obtainTimeEnd
    var get_obtainTimeEnd = function () {
      if(!$scope.obtainTimeEnd) {
        return ''
      } else {
        if(!$scope.obj.obtainTimeEnd) {
          return new Date($scope.obtainTimeEnd).getTime() + 86399000
        } else {
          if(typeof $scope.obj.obtainTimeEnd != 'string' ) {
            return new Date($scope.obj.obtainTimeEnd).getTime() ;
          } else {
            return parseInt($scope.obj.obtainTimeEnd,10) ;
          }
        }
      }
    };

    var OweNer = function (pg_index, pg_count, cb) {
      var pageConfig = {
        "pgIndex":pg_index,
        "pgCount":pg_count,
        "usageTimeStart": get_usageTimeStart (),
        "usageTimeEnd": get_usageTimeEnd (),
        "obtainTimeStart": get_obtainTimeStart (),
        "obtainTimeEnd": get_obtainTimeEnd (),
      };
      var object = $.extend({}, $scope.obj, pageConfig);
      $location.path('main/market_home/coupon_record').search(object);
      marKetList.findSebeCouponObtainRecordList(object, cb);
    };
    $scope.pagination = new PaginationService(OweNer, 15, 1, false);
    $scope.$watch('pagination.curPageItems', function (newItems) {
      $scope.recodeList = [];
      if (newItems == undefined)
          return;
      if ($scope.pagination.curPageItems.length === 0) {
        $scope.loading_text = "没有符合条件的记录";//加载页面内容
          return;
      }
      console.log('测试数据',newItems)
      $scope.recodeList = newItems;
      $scope.to_loading = false;//如果不为空 结束加载页面
    });
  }
  //按条件查询
  $scope.search_order = function(){
    init_order_list();
  }

  $scope.search_reset = function(){
    $scope.obj = {};
    $scope.usageTimeStart = '';
    $scope.usageTimeEnd = '';
    $scope.obtainTimeStart = '';
    $scope.obtainTimeEnd = '';
    init_order_list();
  }
});