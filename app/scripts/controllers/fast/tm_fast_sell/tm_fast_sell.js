angular.module('iprpAdminApp').controller('tmFastSellCtrl',function($scope,$modal,ServicerService, FeedbackService,PaginationService,$stateParams,$location,Upload,$state){
  $('#sell_list').addClass("selected").parent().siblings().children().removeClass("selected");

  $scope.cateIdData = cateIdData;  //所有商标分类
  // 反馈状态
  $scope.feedbackList = [
    {name:'未反馈', id:1},
    {name:'已反馈', id:2},
  ];

  // 获取URL中的参数
  $scope.searchObj = $location.search() || {};

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
          FeedbackService.fastSaleTrademarkList(object, cb);
      };
      var index_ = parseInt($scope.searchObj.pg_index);
      $scope.pagination = new PaginationService(OweNer, 15, index_, false);  //这里第二个参数是每页数量，第三个参数是当前是初始化是第几页，第四个参数是是否从第一页开始，默认false，可以不传，兼容目前的，传了的话表示从页数从1开始

      $scope.$watch('pagination.curPageItems', function (newItems) {
          $scope.fastSaleTmList = [];
          $scope.to_loading = false;//如果不为空 结束加载页面
          if (newItems == undefined)
              return;
          if ($scope.pagination.curPageItems.length === 0) {
              $scope.loading_text = "没有符合条件的记录";//加载页面内容
              return;
          }
          $scope.fastSaleTmList = newItems;
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
    $state.go('main.fast_home.tm_fast_sell_detail', {id: item.id});
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
    FeedbackService.updateFastSaleTrademark({id: item.id, feedback_status: 2}, function(data){
      layer.msg('商标速卖信息标记为已反馈');
      init_order_list();
    });
  };


});
