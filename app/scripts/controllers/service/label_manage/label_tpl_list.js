angular.module('iprpAdminApp').controller('LabelTplListCtrl', function ($scope,$modal,LabelServicerService,PaginationService,$location) {
  $('#label_manage').siblings().removeClass("selected");
  $('#label_manage').addClass("selected");
  $scope.obj = {};
  init_label_template_list();

  function init_label_template_list(){
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      var OweNer = function(pg_index,pg_count,cb){
        LabelServicerService.label_list({
          "pg_index":pg_index,
          "pg_count":pg_count,
          "name" : !$scope.obj.name ? null : $scope.obj.name
        },cb);
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
        $scope.labelList = newItems;
        $scope.to_loading = false;//如果不为空 结束加载页面
    });
  }

    /**
     * 搜索
     */
    $scope.search = function(){
      init_label_template_list();
    };

        /**
     * 编辑模板
     * @param index
     */
    $scope.label_tpl_edit = function(index){
        $location.path('main/merchant_home/label_tpl_edit/'+index);
    }
    /**
     * 删除模板
     * @param template_id
     */
    $scope.label_tpl_state_toggle = function(item){
    	layer.confirm(`确定${item.status==1? '禁用':'启用'}"${item.name}"？`, {
        btn: ['确定','取消'] //按钮
      }, function(index){
        LabelServicerService.switchMerchantLabel({
        	tagId:item.tagId,
        	status: item.status==1? 0 : 1
        },function(data){
        	$scope.search();
        	layer.msg('操作成功');
          layer.close(index);
        },function(error){
          layer.alert(error.data.msg);
        })
      }, function(){
      });
    }
});
