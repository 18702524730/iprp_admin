angular.module('iprpAdminApp').controller('IPTNoticeListCtrl',function($scope,$modal,SbbService,PaginationService,$stateParams,$location,Upload,$state){
  $('#sbb_IPT').addClass("selected").parent().siblings().children().removeClass("selected");

 // 添加时间控件 初始化
 $('#startCreateDate,#startPickDate,#endPickDate,#endCreateDate').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose: true
  });
// 反馈状态
$scope.obj =  {category: 8};
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
        if ($scope.obj.createStartTime) {
            $scope.obj.createStartTime = new Date($scope.obj.createStartTime).getTime();
          }
          if ($scope.obj.createEndTime) {
            $scope.obj.createEndTime = new Date($scope.obj.createEndTime).getTime() + 24*3600*1000-1;
          }
        var object = $.extend({}, $scope.obj, pageConfig);
        // $location.search(object).replace();
        SbbService.findEvaluateGoodsList(object, cb);
    };
    $scope.pagination = new PaginationService(OweNer, 15, 1, false);
    // $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index);
}
init_order_list();

$scope.$watch('pagination.curPageItems', function (newItems) {
    $scope.EvaluateGoodsList = [];
    if (newItems == undefined)
        return;
    if ($scope.pagination.curPageItems.length === 0) {
        $scope.loading_text = "没有符合条件的记录";//加载页面内容
        return;
    }
    $scope.EvaluateGoodsList = newItems;
    $scope.to_loading = false;
});


// 搜索
$scope.search_order = function(){
  $scope.obj.pg_index = 0;
  init_order_list();
};
// 置顶
$scope.toTop = function (id, sort) {
	if (sort == 1) {
		SbbService.cancelSetTopeMarketing({id, category: 8}, function(data){
			layer.msg('操作成功');
			$scope.obj.pg_index = 0;
			init_order_list();
		});
		return;
	}
	SbbService.setTopeMarketing({id, category: 8}, function(data){
		layer.msg('操作成功');
		$scope.obj.pg_index = 0;
		init_order_list();
	});
}
// 删除
$scope.delItem = function (id) {
  layer.confirm('确定删除吗？', {
		title: '提示',
    btn: ['确定','取消'] //按钮
  }, function(index){
    SbbService.deleteMarketing({id}, function (data) {
      layer.msg('操作成功');
      $scope.obj.pg_index = 0;
      init_order_list();
    });
    layer.close(index);
  }, function(index){
    layer.close(index);
  });
}

// 重置
$scope.search_reset = function(){
  $scope.obj = {category: 8};
  $scope.obj.pg_index = 0;
  init_order_list();
};

//去详情页
$scope.goDetailFn = function(id) {
  $state.go('main.cms_home_list.addIPTNotice', {id: id});
};

//设置显示或隐藏
$scope.setShow = function(list, isHide){
       SbbService.updateEvaluateGoodsState({
           id: list.id,
           isHide: isHide ? 1 : 0
       },function(data) {
           layer.msg('操作成功')
           list.isHide = isHide;
           //$scope.search_order();
       })
   };
});
