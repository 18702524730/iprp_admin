angular.module('iprpAdminApp').controller('TechAdvisoryCtrl', function ($scope,$modal,Enterprises,PaginationService,$location,session) {
  $('#techAdvisory').addClass("selected").siblings().removeClass("selected");
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
    $scope.obj.type = 2;
    var OweNer = function(pg_index,pg_count,cb) {
      var params = Object.assign({}, $scope.obj, {"pgIndex": pg_index, "pgCount": pg_count})
      Enterprises.ipSurveyList(params,cb);
    };
    $scope.pagination = new PaginationService(OweNer,10,1,true);

    $scope.$watch('pagination.curPageItems',function(newItems){
      $scope.labelList = [];
      // console.log('newitems', newItems, $scope.pagination.curPageItems)
      if (newItems == undefined)
          return;
      if ($scope.pagination.curPageItems.length === 0){
          $scope.loading_text = "没有符合条件的记录";//加载页面内容
          return;
      }
      var pgIndex = ($scope.pagination.curPage-1)*10
      newItems.forEach(function(item, index){
      	item.isLong = item.content && item.content.replace(/[^\x00-\xff]/g,'01').length>54
      })
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
   * 备注
   * @param id
   */
  $scope.handleMemo = function(id, idx){
  	layer.prompt({title: '备注', formType: 2}, function(text, index){
  		Enterprises.ipSurveyAddRemark({id: id, remark: text}, function(){
  			$scope.labelList[idx].remark = text;
  			layer.close(index);
  		});
	    // layer.msg(text);
	  });
  }

  $scope.handleView = function(text){
  	layer.alert(text, {
  		title: '求助内容',
  		maxWidth: 540
  	});
  }

  // 导出
  $scope.search_export = function(type){
  	var pageConfig = {
  		type: type
    };
    var object = $.extend({}, $scope.obj, pageConfig);
    object.pg_index = null;
    object.pg_count = null;
    object.access_token = session.accessToken;
  	location.href = rootConfig.adminUrl + '/iprp_operator/api/tech/exportExcel?' + $.param(object)
  }
});
