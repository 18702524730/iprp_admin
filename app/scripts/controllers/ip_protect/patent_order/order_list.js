angular.module('iprpAdminApp').controller('PatentListCtrl',function($scope,ipService,ChannelService,PaginationService,$location,$state, session, $modal){
  $('#patent_list').addClass("selected").parent().siblings().children().removeClass("selected");

  // 添加时间控件 初始化
  $('#startTime,#endTime').datetimepicker({
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
  $scope.buyer_mobile = null;
  $scope.buyer_email = null;
  $scope.startTime = $scope.obj.startTime && MsecFormat($scope.obj.startTime);
  $scope.endTime = $scope.obj.endTime && MsecFormat($scope.obj.endTime );
  $scope.obj.is_filter_test = $scope.obj.is_filter_test == '1' ? true : false;

  //前面赋值后重置，避免时间获取潜在bug
  $scope.obj.startTime = null;
  $scope.obj.endTime = null;


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


  //获取时间 startTime
  var get_startTime = function () {
    if (!$scope.startTime ) {
      return ''
    } else {
      if (!$scope.obj.startTime) {
        return new Date($scope.startTime).getTime();
      } else {
        if (typeof $scope.obj.startTime != 'string') {
          return new Date($scope.obj.startTime).getTime()
        } else {
          return $scope.obj.startTime - 0;
        }
      }
    }
  };

  //获取时间  endTime
  var get_endTime = function () {
    if(!$scope.endTime) {
      return ''
    } else {
      if(!$scope.obj.endTime) {
        return new Date($scope.endTime).getTime() + 86399000
      } else {
        if(typeof $scope.obj.endTime != 'string' ) {
          return new Date($scope.obj.endTime).getTime() ;
        } else {
          return parseInt($scope.obj.endTime,10) ;
        }
      }
    }
  };


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

      var OweNer = function (pgIndex, pgCount, cb) {
          var pageConfig = {
              "pgIndex": pgIndex,
              "pgCount": pgCount,
              "startTime": get_startTime (),
              "endTime": get_endTime (),
              "is_filter_test": $scope.obj.is_filter_test ? 1 : 0
          };
          var object = $.extend({}, $scope.obj, pageConfig);
          //console.log($scope.obj)
          $location.path('main/ip_protect_home/patent_list').search(object);
          ipService.list(object, cb);
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
      $scope.startTime = null;
      $scope.endTime = null;
      $scope.payment_start_time = null;
      $scope.payment_end_time = null;
      init_order_list();
  }

  /**
   * 查看订单详情
   * @param index
   */
  $scope.detail_orders = function(index){
      $location.path('main/ip_protect_home/patent_detail/' + index);
  }


  // 受理弹窗
  $scope.checkFn = function(orderSn){
    $modal.open({
        resolve:{
          orderSn : function(){
              return orderSn;
          }
        },
        templateUrl: 'package\\modal\\ip_order\\check.html',
        controller: 'ipOrderCheckCtrl'
    }).result.then(function (result) {
        $scope.search_order();
    });
  };

  // 上传弹窗
  $scope.uploadFn = function(orderSn){
    $modal.open({
        resolve:{
          orderSn : function(){
              return orderSn;
          }
        },
        templateUrl: 'package\\modal\\ip_order\\report.html',
        controller: 'ipOrderReportCtrl'
    }).result.then(function (result) {
        $scope.search_order();
    });
  };

  //提示操作
  $scope.hint=false;
  $scope.hints = function(){
      $scope.hint = !$scope.hint;
  }
  $scope.accept = function(){
  	var str = '<p class="contact">'+item.contactName+ (item.sex ? ('/'+ (item.sex==1 ? '先生' : '女士')) : '') + ((item.contactName || item.sex) ? '<br>' : '' )+ '<span>'+item.contactPhone.slice(0,3)+'-'+item.contactPhone.slice(3,7)+'-'+item.contactPhone.slice(7)+'</span></p>';
    layer.alert('',{
      title:'操作',
      type: 0,
      shadeClose:true,
      content: str,
      btn: ''
    }, function(index){
      layer.close(index);
    });
  }
  $scope.upload = function(){
  	var str = '<p class="contact">'+item.contactName+ (item.sex ? ('/'+ (item.sex==1 ? '先生' : '女士')) : '') + ((item.contactName || item.sex) ? '<br>' : '' )+ '<span>'+item.contactPhone.slice(0,3)+'-'+item.contactPhone.slice(3,7)+'-'+item.contactPhone.slice(7)+'</span></p>';
    layer.alert('',{
      title:'操作',
      type: 0,
      shadeClose:true,
      content: str,
      btn: ''
    }, function(index){
      layer.close(index);
    });
  }
  $scope.search_export = function(index){
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
  	var pageConfig = {
      "startTime": get_startTime (),
      "endTime": get_endTime (),
      "payment_start_time": get_payment_start_time (),
      "payment_end_time": get_payment_end_time (),
      "is_filter_test": $scope.obj.is_filter_test ? 1 : 0
    };
    var object = $.extend({}, $scope.obj, pageConfig);
    object.pgIndex = null;
    object.pgCount = null;
    object.access_token = session.accessToken;
  	location.href = rootConfig.adminUrl + '/iprp_operator/api/findOrdersListReport?' + $.param(object)
  }
});

