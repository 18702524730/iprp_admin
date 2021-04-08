angular.module('iprpAdminApp').controller('FastDemandCtrl', function ($scope,$modal,Outpatient,PaginationService,$location) {
  $('#outpatient_demand').siblings().removeClass("selected");
  $('#outpatient_demand').addClass("selected");
  $scope.obj = {};
  init_seller_list();
    // 添加时间控件 初始化
    $('#offShelfTimeStart,#offShelfTimeEnd').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      todayBtn:  1,
      autoclose:  true
    });
  function init_seller_list () {
    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "加载中...";//加载页面内容
    var OweNer = function(pg_index,pg_count,cb) {
      $scope.obj.startCreateTime ? $scope.obj.startCreateTime = new Date($scope.obj.startCreateTime).getTime() : ''
      $scope.obj.endCreateTime ? $scope.obj.endCreateTime = new Date($scope.obj.endCreateTime).getTime() + 24*3600*1000 - 1 : ''
      var params = Object.assign({}, $scope.obj, {"pgIndex": pg_index, "pgCount": pg_count})
      Outpatient.label_list(params,cb);
    };
    $scope.pagination = new PaginationService(OweNer,10,1,true);

    $scope.$watch('pagination.curPageItems',function(newItems){
      $scope.labelList = [];
      if (newItems == undefined)
          return;
      if ($scope.pagination.curPageItems.length === 0){
          $scope.loading_text = "没有符合条件的记录";//加载页面内容
          return;
      }
      for (var i = 0; i< newItems.length; i++) {
        if (newItems[i].confirm == 1) {
          newItems[i].confirmText = "待确认"
        } else if (newItems[i].confirm == 2) {
          newItems[i].confirmText = "通过"
        } else if (newItems[i].confirm == 3) {
          newItems[i].confirmText = "不通过"
        } else {
          newItems[i].confirmText = "--"
        }
        if (newItems[i].applyType == 0) {
          newItems[i].applyTypeText = "个人商家"
        } else if (newItems[i].applyType == 1) {
          newItems[i].applyTypeText = "机构商家"
        } else if (newItems[i].applyType == 2) {
          newItems[i].applyTypeText = "个人合伙人"
        } else if (newItems[i].applyType == 3) {
          newItems[i].applyTypeText = "机构合伙人"
        } else {
          newItems[i].applyTypeText = "--"
        }

        switch (newItems[i].nameStatus) {
          case 0:
            newItems[i].nameStatusText = "待认证"
            newItems[i].visibleText = "--"
            break
          case 1:
            newItems[i].nameStatusText = "认证中"
            newItems[i].visibleText = "未开通"
            break
          case 2:
            newItems[i].nameStatusText = "认证不通过"
            newItems[i].visibleText = "未开通"
            break
          case 3:
            newItems[i].nameStatusText = "认证通过"
            newItems[i].visibleText = "开通"
            break
          default:
            newItems[i].nameStatusText = "--"
            newItems[i].visibleText = "--"
        }
      }
      $scope.labelList = newItems;
      $scope.to_loading = false;//如果不为空 结束加载页面
  });
}

    /**
     * 搜索
     */
    $scope.search = function(){
      init_seller_list();
    };

    $scope.reset = function () {
      $scope.obj = {apply_types: "0,1"};
      init_seller_list();
    }

    /**
     * 审核
     * @param seller_id
     */
    $scope.handleClickFeedBaack = function(seller_id){
        $location.path('main/merchant_home/seller_audit/'+seller_id+'/bl');
    }
    /**
     * 详情
     * @param seller_id
     */
    $scope.handleClickDetail = function(id){
      
      $location.path('main/fast_home/demand_detail/'+id);
    }
    $scope.handleClickRealName = function (seller_id, id) {
      $location.path('main/merchant_home/seller_application_remarks/'+seller_id + '/' + id);
    }
});
