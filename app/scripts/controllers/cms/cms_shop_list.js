angular.module('iprpAdminApp').controller('CmsShopListCtrl',function($scope,$modal,CmsUrl,PaginationService,$stateParams,$location,Upload,$state){
  $('#cms_shop').addClass("selected").parent().siblings().children().removeClass("selected");

  // 反馈状态
  $scope.obj = $location.search() || {};

  function init_order_list() {
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容

      var OweNer = function (pg_index, pg_count, cb) {
	      	//url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
	        if ($scope.obj.pg_index) {
	          pg_index = $scope.obj.pg_index - 0;
	          $scope.obj.pg_index = '';
	        }
          var pageConfig = {
              "pg_index": pg_index,
              "pg_count": pg_count
          };
          var object = $.extend({}, $scope.obj, pageConfig);
          $location.search(object).replace();
          CmsUrl.findEvaluateShopList(object, cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index);
  }
  init_order_list();

  $scope.$watch('pagination.curPageItems', function (newItems) {
      $scope.EvaluateShopList = [];
      if (newItems == undefined)
          return;
      if ($scope.pagination.curPageItems.length === 0) {
          $scope.loading_text = "没有符合条件的记录";//加载页面内容
          return;
      }
      $scope.EvaluateShopList = newItems;
      $scope.to_loading = false;//如果不为空 结束加载页面
  });


  // 搜索
  $scope.search_order = function(){
  	$scope.obj.pg_index = 0;
    init_order_list();
  };

  // 重置
  $scope.search_reset = function(){
    $scope.obj = {};
    $scope.obj.pg_index = 0;
    init_order_list();
  };

  //去详情页
  $scope.goDetailFn = function(id) {
    $state.go('main.cms_home_list.cmsShopDetail', {id: id});
  };

  //设置显示或隐藏
  $scope.setShow = function(list, isHide){
 		CmsUrl.updateEvaluateShopState({
 			id: list.id,
 			isHide: isHide ? 1 : 0
 		},function(data) {
 			list.isHide = isHide;
 			layer.msg('操作成功')
 			//$scope.search_order();
 		})
 	};
});
