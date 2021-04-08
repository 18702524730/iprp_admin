angular.module('iprpAdminApp').controller('FastEnterprisesListCtrl', function ($scope,$modal,Enterprises,PaginationService,$location,session) {
  $('#enterprisesList').siblings().removeClass("selected");
  $('#enterprisesList').addClass("selected");
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
      Enterprises.label_list(params,cb);
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
      for (var i = 0; i< newItems.length; i++) {

        console.log('pageIndex', pgIndex)
        newItems[i].number = pgIndex + i + 1;
        console.log('$scope.pagination', $scope.pagination)
        switch (newItems[i].companySize) {
          case 1:
            newItems[i].companyText = "50人以下"
            break
          case 2:
            newItems[i].companyText = "50～100人"
            break
          case 3:
            newItems[i].companyText = "100人以上"
            break
          default:
            newItems[i].companyText = "--"
        }
        switch (newItems[i].researchOrgLevel) {
          case 1:
            newItems[i].researchOrgLevelText = "区级"
            break
          case 2:
            newItems[i].researchOrgLevelText = "市级"
            break
            case 3:
            newItems[i].researchOrgLevelText = "省级"
            break
            case 4:
            newItems[i].researchOrgLevelText = "国家级"
            break
            case 5:
            newItems[i].researchOrgLevelText = "未设有"
            break
          default:
            newItems[i].researchOrgLevelText = "--"
        }

        switch (newItems[i].street) {
          case 1:
            newItems[i].streetText = "闸弄口街道"
            break
          case 2:
            newItems[i].streetText = "凯旋街道"
            break
          case 3:
            newItems[i].streetText = "采荷街道"
            break
            case 4:
            newItems[i].streetText = "四季青街道"
            break
            case 5:
            newItems[i].streetText = "笕桥街道"
            break
            case 6:
            newItems[i].streetText = "彭埠街道"
            break
            case 7:
            newItems[i].streetText = "钱塘智慧城"
            break
            case 8:
            newItems[i].streetText = "丁兰街道"
            break
          default:
            newItems[i].streetText = "--"
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

      $location.path('main/fast_home/enterprisesDetail/'+id);
    }
    $scope.handleClickRealName = function (seller_id, id) {
      $location.path('main/merchant_home/seller_application_remarks/'+seller_id + '/' + id);
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
