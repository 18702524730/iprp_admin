angular.module('iprpAdminApp').controller('PartnerApplicationCtrl', function ($scope,$modal,ChannelApplicationService,PaginationService,$location) {
  $('#partner_application').siblings().removeClass("selected");
  $('#partner_application').addClass("selected");
  $scope.obj = {"apply_types": '2,3'};
  init_seller_list();

  function init_seller_list(){
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      var OweNer = function(pg_index,pg_count,cb){
        var params = Object.assign({}, $scope.obj, {"pg_index": pg_index, "pg_count": pg_count})
        ChannelApplicationService.label_list(params,cb);
      };
      $scope.pagination = new PaginationService(OweNer,15);

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
            newItems[i].confirmText = "--"
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
          // if (newItems[i].hasFeedback == 0) {
          //   newItems[i].hasFeedbackText = "已反馈"
          // } else if (newItems[i].hasFeedback == 1) {
          //   newItems[i].hasFeedbackText = "未反馈"
          // } else {
          //   newItems[i].hasFeedbackText = "--"
          // }
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
      $scope.obj = {"apply_types": '2,3'};
      init_seller_list();
    }
    /**
     * 审核
     * @param partner_id
     */
    $scope.handleClickFeedBaack = function(partner_id){
      // #/main/partner_home/partner_application
        $location.path('main/fast_home/partner_audit/'+partner_id+'/bl');
    }
    /**
     * 详情
     * @param partner_id
     */
    $scope.handleClickDetail = function(partner_id){

      $location.path('main/fast_home/partner_audit/'+partner_id+'/det');
    }
});
