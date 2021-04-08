angular.module('iprpAdminApp').controller('MerchantListCtrl',function($scope,$modal,MerchantManageService,PaginationService,$stateParams,$location,Upload,$state){
	$('#merchant_list').addClass("selected").parent().siblings().children().removeClass("selected");

	// 商家类型
	$scope.merchantState = [
		{name:'优选商家', id:1},
		{name:'普通商家', id:2},
	];
	// 营业状态
	$scope.businessType = [
		{name:'启用', id:1},
		{name:'禁用', id:0},
	];
	// 开通状态
	$scope.infoType = [
		{name:'已开通', id:1},
		{name:'未开通', id:2},
	];
	// 主体类型
	$scope.applyStates = [
		{name:'机构', id:1},
		{name:'个人', id:2},
	];
	// 关联创新保
	$scope.cxbRelevance = [
		{name:'是', id:1},
		{name:'否', id:0},
	];


	$scope.obj = $location.search() || {};
	function init_order_list() {
			$scope.to_loading = true;//默认 开始 加载
			$scope.loading_text = "加载中...";//加载页面内容

			var OweNer = function (pgIndex, pgCount, cb) {
					var pageConfig = {
							"pgIndex": pgIndex,
							"pgCount": pgCount
					};
					var object = $.extend({}, $scope.obj, pageConfig);
					$location.search(object).replace();
					MerchantManageService.list(object, cb);
			};
			$scope.pagination = new PaginationService(OweNer, 15);

			$scope.$watch('pagination.curPageItems', function (newItems) {
					$scope.resultList = [];
					$scope.to_loading = false;//如果不为空 结束加载页面
					if (newItems == undefined)
							return;
					if ($scope.pagination.curPageItems.length === 0) {
							$scope.loading_text = "没有符合条件的记录";//加载页面内容
							return;
					}
					for (var i = 0; i< newItems.length; i++) {
						switch (newItems[i].nameStatus) {
							case 0:
								newItems[i].visibleText = "--"
								break
							case 1:
								newItems[i].visibleText = "未开通"
								break
							case 2:
								newItems[i].visibleText = "未开通"
								break
							case 3:
								newItems[i].visibleText = "开通"
								break
							default:
								newItems[i].nameStatusText = "--"
								newItems[i].visibleText = "--"
						}					
					}

					$scope.resultList = newItems;
			});
	}
	init_order_list();


	// 搜索
	$scope.search_order = function(){
		init_order_list();
	};

	// 重置
	$scope.search_reset = function(){
		$scope.obj = {};
		init_order_list();
	};

	//去详情页
	$scope.goDetailFn = function(item, temp) {
		if(temp == 'edit'){
			$state.go('main.merchant_home.merchant_edit', {spId:item.sp_id, spCode: item.sp_code});
		}else{
			$state.go('main.merchant_home.merchant_detail', {spId:item.sp_id, spCode: item.sp_code});
		}
	};
	$scope.setSpState = function(item, state) {
		var obj = Object.assign({}, item);
		obj.state = state;
		MerchantManageService.edit({spId: item.sp_id}, obj, function (data){
			item.spState = state;
			layer.msg('操作成功');
		});
	}
});
