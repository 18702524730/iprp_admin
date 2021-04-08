angular.module('iprpAdminApp').controller('CmsTagCtrl',function($scope,$modal,CmsUrl,PaginationService,$stateParams,$location,Upload,$state){
  $('#cms_tag').addClass("selected").parent().siblings().children().removeClass("selected");

  // 反馈状态
  $scope.obj = $location.search() || {};
  function init_order_list() {
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容

      var OweNer = function (pg_index, pg_count, cb) {
          var pageConfig = {
              "pg_index": pg_index,
              "pg_count": pg_count
          };
          var object = $.extend({}, $scope.obj, pageConfig);
          $location.search(object).replace();
          CmsUrl.findLabel(object, cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15);
  }
  init_order_list();

  $scope.$watch('pagination.curPageItems', function (newItems) {
      $scope.resultList = [];
      if (newItems == undefined)
          return;
      if ($scope.pagination.curPageItems.length === 0) {
          $scope.loading_text = "没有符合条件的记录";//加载页面内容
          return;
      }
      $scope.resultList = newItems;
      $scope.to_loading = false;//如果不为空 结束加载页面
  });

  // 重置
  $scope.search_reset = function(){
    $scope.obj = {};
    init_order_list();
  };

  // 搜索
  $scope.search_order = function(){
    init_order_list();
  };

  $scope.editTxt = '';
  $scope.edit = function(item){
	  // var index = layer.open();
	  var str = `
	    <p><span style="color:#f10;">*</span>标签名称:</p>
	    <input type="text" class="edit_txt" style="margin-bottom:10px; width:200px;" placeholder="最多8个字" value="${item.labelName}" maxlength="8" />
	  `;
	  layer.open({
	    title: '编辑评价标签',
	    btn: ['确认'],
	    content: str,
	    yes: function() {
	      CmsUrl.updateLabel({
		 			id: item.id,
		 			labelName: $('.edit_txt').val(),
		 		},function(data) {
		 			layer.msg('编辑成功')
		 			//layer.close(layer.index);
		 			$scope.search_order();
		 		})
	    }
	  });
	}

	$scope.remove = function(item){
	  layer.open({
	    title: '提示',
	    btn: ['确认'],
	    content: `确认删除“${item.labelName}”么？`,
	    yes: function() {
	      layer.close(layer.index);
	      CmsUrl.deleteLabel({
		 			id: item.id,
		 		},function(data) {
		 			layer.msg('删除成功')
		 			//layer.close(layer.index);
		 			$scope.search_order();
		 		})
	    }
	  });
	}

	$scope.add = function(){
	  var str = `
	    <p><span style="color:#f10;">*</span>标签名称:</p>
	    <input type="text" class="edit_txt" style="margin-bottom:10px; width:200px;" placeholder="最多8个字" maxlength="8" />
	    <p id="__tag_err" style="color:#f10;display:none;">标签名称不能为空</p>
	  `;
	  layer.open({
	    title: '新增评价标签',
	    btn: ['确认'],
	    content: str,
	    yes: function() {
	    	if (!$('.edit_txt').val().trim()) {
	    		$('#__tag_err').show().html('标签名称不能为空');
	    		return;
	    	} else{
	    		$('#__tag_err').hide();
	    	}
	      CmsUrl.addLabel({
		 			labelName: $('.edit_txt').val(),
		 		},function(data) {
		 			layer.msg('保存成功')
		 			//layer.close(layer.index);
		 			$scope.search_order();
		 		}, function(error){
		 			layer.alert(error.data && error.data.msg || '服务异常');
		 		})
	    }
	  });
	}
});
