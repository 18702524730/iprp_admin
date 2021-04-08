angular.module('iprpAdminApp').controller('feedbackServiceCtrl',function($scope,$modal,ServicerService, FeedbackService,PaginationService,$stateParams,$location,Upload,$state){
  $('#feedback_service').addClass("selected").parent().siblings().children().removeClass("selected");

  // 添加时间控件 初始化
  $('#feedbackTimeBegin,#feedbackTimeEnd,#checkTimeBegin,#checkTimeEnd').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose:  true
  });
  $('.datetimepicker').css('display','none');

  // 获取服务商
  ServicerService.common_service_list(function(data){
      $scope.spList = data.elements;
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
  $scope.feedbackTimeBegin = $scope.obj.feedbackTimeBegin && MsecFormat($scope.obj.feedbackTimeBegin);
  $scope.feedbackTimeEnd = $scope.obj.feedbackTimeEnd && MsecFormat($scope.obj.feedbackTimeEnd-86399000);
  $scope.checkTimeBegin = $scope.obj.checkTimeBegin && MsecFormat($scope.obj.checkTimeBegin);
  $scope.checkTimeEnd = $scope.obj.checkTimeEnd  && MsecFormat($scope.obj.checkTimeEnd-86399000);
  init_order_list();

  function init_order_list(needInit) {
      if (needInit) {
          $scope.obj = $location.search() || {};
      }
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容

      //获取时间
      var get_time = function (name, isEnd) {
        if (!$scope[name] ) {
          return ''
        } else {
          var t = new Date($scope[name]).getTime();
          return isEnd ? t + 86399000 : t;
        }
      };

      var OweNer = function (pg_index, pg_count, cb) {
          //url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
          if ($scope.obj.pg_index) {
              pg_index = $scope.obj.pg_index;
              $scope.obj.pg_index = '';
          }
          var pageConfig = {
              "pg_index": pg_index,
              "pg_count": pg_count,
              "feedbackTimeBegin": get_time("feedbackTimeBegin"),
              "feedbackTimeEnd": get_time("feedbackTimeEnd", true),
              "checkTimeBegin": get_time("checkTimeBegin"),
              "checkTimeEnd": get_time("checkTimeEnd", true)
          };
          var object = $.extend({}, $scope.obj, pageConfig);
          $location.search(object).replace();
          FeedbackService.list(object, cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index);

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
      $scope.feedbackTimeBegin = null;
      $scope.feedbackTimeEnd = null;
      $scope.checkTimeBegin = null;
      $scope.checkTimeEnd = null;
      init_order_list();
  }

  //查看
  $scope.view = function(id){
    $state.go('main.fast_home.feedback_detail', {spAdviseId: id});
  }

  //提示操作
  $scope.hint=false;
  $scope.hints = function(){
      $scope.hint = !$scope.hint;
  }
})
