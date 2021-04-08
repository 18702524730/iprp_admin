angular.module('iprpAdminApp').controller('GgImportCtrl', function ($scope,$modal,Enterprises,PaginationService,$location,session,Upload) {
  $('#ggImport').addClass("selected").siblings().removeClass("selected");
  $scope.obj = {};

  init_seller_list();

  $scope.streetList = [
		{
			name:'闸弄口街道',
			value: '1',
		},
		{
			name:'凯旋街道',
			value: '2',
		},
		{
			name:'采荷街道',
			value: '3',
		},
		{
			name:'四季青街道',
			value: '4',
		},
		{
			name:'笕桥街道',
			value: '5',
		},
		{
			name:'彭埠街道',
			value: '6',
		},
		{
			name:'钱塘智慧城',
			value: '7',
		},
		{
			name:'丁兰街道',
			value: '8',
		},
	];

	$scope.years = [
		'重认15',
		'复审15',
		'省级15',
		'重认16',
		'复审16',
		'省级16',
		'重认17',
		'复审17',
		'省级17',
	];


  function init_seller_list () {
    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "加载中...";//加载页面内容
    $scope.obj.type = 2;
    var OweNer = function(pg_index,pg_count,cb) {
      var params = Object.assign({}, $scope.obj, {"pgIndex": pg_index, "pgCount": pg_count})
      Enterprises.queryGuogaoList(params,cb);
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

  // 导入
  $scope.uploadFile = function(file){
  	if (!file) {return}
  	Upload.upload({
        url: options.api.base_url + '/tech/importGuogaoExcel?access_token=' + session.accessToken,
        data: {file: file}
    }).then(function (resp) {
    	layer.alert('导入成功');
    	$scope.search();
    }, function (resp) {
    	resp = resp.data;
      if (resp && resp.msg) {
      	layer.alert(resp.msg);
      }
    });
  }

});
