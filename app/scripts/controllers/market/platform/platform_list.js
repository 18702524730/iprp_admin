angular.module('iprpAdminApp').controller('PlatformListCtrl',function($scope, $rootScope, $modal, Upload, marKetList,ChannelService,PaginationService,$location,$state){
  $('#platform_list').addClass("selected").parent().siblings().children().removeClass("selected");

  $scope.positionList = [];  //运营位商标列表

  // 查询运营位列表
  function init_order_list() {
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      var OweNer = function (pg_index, pg_count, cb) {
          var pageConfig = {
              "pg_index": pg_index,
              "pg_count": pg_count
          };
          $location.path('main/market_home/platform');
          marKetList.findOperatePositionList(pageConfig,cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15);
      $scope.$watch('pagination.curPageItems', function (newItems) {
          $scope.positionList = [];
          if (newItems == undefined)
              return;
          if ($scope.pagination.curPageItems.length === 0) {
              $scope.loading_text = "没有符合条件的记录";//加载页面内容
              return;
          }
          $scope.positionList = newItems;
          $scope.to_loading = false;//如果不为空 结束加载页面
      });
  }
  init_order_list();

  // 删除
  $scope.deleteFn = function(item){
    marKetList.deleteOperatePosition({id:item.id},function(data){
      init_order_list();
    },function(data){
      init_order_list();
      alert(data.data.msg);
    })
  }


});

