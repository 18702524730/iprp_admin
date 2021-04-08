angular.module('iprpAdminApp').controller('buyGoodTmCtrl',function($scope,$modal,ServicerService, FeedbackService,PaginationService,$stateParams,$location,Upload,$state){
  $('#buy_tm_list').addClass("selected").parent().siblings().children().removeClass("selected");

  // 添加时间控件 初始化
  $('#start_notarization_time, #end_notarization_time').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose:  true
  });
  $('.datetimepicker').css('display','none');

  $scope.cateIdData = cateIdData;  //所有商标分类
  // 反馈状态
  $scope.feedbackList = [
    {name:'未反馈', id:1},
    {name:'已反馈', id:2},
  ];

  function init_order_list() {
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容

      var OweNer = function (pg_index, pg_count, cb) {
          var pageConfig = {
              "pg_index": pg_index,
              "pg_count": pg_count
          };
          var object = $.extend({}, $scope.obj, pageConfig);
          //console.log($scope.obj)
          // $location.path('main/trade_home/order_list').search(object);
          $location.search(object).replace();
          FeedbackService.buyGoodsTrademarkList(object, cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15);

      $scope.$watch('pagination.curPageItems', function (newItems) {
          $scope.buyPurposeList = [];
          $scope.to_loading = false;//如果不为空 结束加载页面
          if (newItems == undefined)
              return;
          if ($scope.pagination.curPageItems.length === 0) {
              $scope.loading_text = "没有符合条件的记录";//加载页面内容
              return;
          }
          $scope.buyPurposeList = newItems;
      });
  }
  init_order_list();

  // 获取时间戳
  function getTimeFn (time) {
    return new Date(time).getTime();
  }

  // 搜索
  $scope.search_order = function(){
    if ($scope.obj.startTime) {
      $scope.obj.startTime = getTimeFn($scope.obj.startTime);
    }
    if ($scope.obj.endTime) {
      $scope.obj.endTime = getTimeFn($scope.obj.endTime);
    }
    init_order_list();
  };

  // 重置
  $scope.search_reset = function(){
    $scope.obj = {};
    init_order_list();
  };

  // 去详情页
  $scope.detail_orders = function(item){
    $state.go('main.fast_home.buy_good_tm_detail', {orderId: item.id});
  };

  // 添加备注
  $scope.addRemarkFn= function(id){
    $modal.open({
        resolve:{
          props : function(){
            return {
              id: id ,
              fromPage: 'buy_good_tm_detail'
            };
          }
        },
        backdrop:false,
        keyboard:true,
        templateUrl: 'package\\modal\\fast\\add_remark.html',
        controller: 'addRemarkCtrl'
    }).result.then(function (result) {
        $state.reload();
        init_order_list();
        return;
    });
  };

  // 求购已反馈
  $scope.setPurposeFn = function(item){
    FeedbackService.updateBuyGoodsTrademark({id: item.id, feedback_status: 2}, function(data){
      layer.msg('求购信息标记为已反馈');
      init_order_list();
    });
  };



});
