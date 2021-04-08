angular.module('iprpAdminApp').controller('feedbackApplyCtrl',function($scope,$modal,FeedbackService,$stateParams,$location,$state,PaginationService){
  $('#feedback_apply').addClass("selected").parent().siblings().children().removeClass("selected");

  // 添加时间控件 初始化
  $('#begin_create_time,#end_create_time').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose:  true
  });
  $('.datetimepicker').css('display','none');
  // 获取地址栏信息并赋值给页面
  $scope.obj = $location.search() || {};
  // 地址栏时间转换
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

  $scope.begin_create_time = $scope.obj.begin_create_time && MsecFormat($scope.obj.begin_create_time);
  $scope.end_create_time = $scope.obj.end_create_time && MsecFormat($scope.obj.end_create_time);

  $scope.apply_Info = function(){
  	console.log($scope.obj)
  	var OweNer = function (pg_index, pg_count, cb) {
      //url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
      if ($scope.obj.pg_index) {
        pg_index = $scope.obj.pg_index;
        $scope.obj.pg_index = '';
      }

      //获取时间
      var get_time = function (name, isEnd) {
        if (!$scope[name] ) {
          return ''
        } else {
          var t = new Date($scope[name]).getTime();
          return isEnd ? t + 86399000 : t;
        }
      };

      var pageConfig = {
        "pg_index": pg_index,
        "pg_count": pg_count,
        "begin_create_time": get_time("begin_create_time"),
        "end_create_time": get_time("end_create_time", true)
      };
      var object = $.extend({}, $scope.obj, pageConfig);
      $location.path('main/fast_home/feedback_apply').search(object);
      FeedbackService.feedBackApply(object, cb);
    };

    $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index); 

    $scope.$watch('pagination.curPageItems', function (newItems) {
      $scope.ApplyList = [];
      console.log(newItems)
      if (newItems == undefined)
        return;
      if ($scope.pagination.curPageItems.length === 0) {
        $scope.loading_text = "没有符合条件的记录";//加载页面内容
        $scope.to_loading = true;
        return;
      }
      $scope.ApplyList = newItems;
      $scope.to_loading = false;//如果不为空 结束加载页面
    });
  }
  $scope.apply_Info();
  // 查询
  $scope.search_apply = function(){
    $scope.apply_Info();
  }
  // 重置
  $scope.search_reset = function(){
    $scope.obj = {}
    $scope.begin_create_time = null;
    $scope.end_create_time = null;
    $scope.apply_Info();
  }
  // 确认联系
  $scope.confirmLink = function(id){
    FeedbackService.confirmLink({spApplyId:id},function(data){
      $scope.apply_Info();
    },function(err){
      $scope.apply_Info();
    });
  }
})