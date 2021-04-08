angular.module('iprpAdminApp').controller('bargaineCtrl',function($scope,$modal,ServicerService, FeedbackService,PaginationService,$stateParams,$location,Upload,$state){
  $('#bargain_list').addClass("selected").parent().siblings().children().removeClass("selected");

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
          // if ($scope.obj && $scope.obj.feedBackStatus) {
          // 	$scope.obj.feedBackStatus = $scope.obj.feedBackStatus-0;
          // }
          var object = $.extend({}, $scope.obj, pageConfig);
          //console.log($scope.obj)
          // $location.path('main/trade_home/order_list').search(object);
          $location.search(object).replace();
          FeedbackService.bargainTrademarkList(object, cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15);

      $scope.$watch('pagination.curPageItems', function (newItems) {
          $scope.bargainTmList = [];
          $scope.to_loading = false;//如果不为空 结束加载页面
          if (newItems == undefined)
              return;
          if ($scope.pagination.curPageItems.length === 0) {
              $scope.loading_text = "没有符合条件的记录";//加载页面内容
              return;
          }
          $scope.bargainTmList = newItems;
      });
  }
  init_order_list();

  // 获取时间戳
  function getTimeFn (time) {
    return new Date(time).getTime();
  }

  // 搜索
  $scope.search_order = function(){
    init_order_list();
  };

  // 重置
  $scope.search_reset = function(){
    $scope.obj = {};
    init_order_list();
  };

  //去商标详情页
  $scope.goDetailFn = function(item) {
    $state.go('main.business_home.tm_manage_detail', {tmiD: item.trademarkId});
  };

  // 查看备注
  $scope.detail_orders = function(item){
    $state.go('main.fast_home.bargain_detail', {id: item.id});
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

  // 我要砍价已反馈s
  $scope.setPurposeFn = function(item){
    FeedbackService.updateBargainTrademark({id: item.id, feedback_status: 2}, function(data){
      layer.msg('砍价信息标记为已反馈');
      init_order_list();
    });
  };


});
