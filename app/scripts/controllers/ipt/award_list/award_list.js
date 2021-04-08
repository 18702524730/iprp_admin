angular.module('iprpAdminApp').controller('AwardListCtrl', function ($scope,$modal,IptService,PaginationService,$location) {
  $('#award_list').siblings().removeClass("selected");
  $('#award_list').addClass("selected");
  $scope.obj = {};
  init_seller_list();

  // 添加时间控件 初始化
  $('#createDate,#chainDate').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose: true
  });

  function init_seller_list(){
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      var OweNer = function(pg_index,pg_count,cb){
        var params = Object.assign({}, $scope.obj, {"pgIndex": pg_index, "pgCount": pg_count});
        $scope.totalData = IptService.findIptPower(params,cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15, 1, false);

      $scope.$watch('pagination.curPageItems',function(newItems){
        console.log(newItems);
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

  //获取时间
  var get_time = function (name, isEnd) {
      if (!$scope[name] ) {
          return ''
      } else {
          var t = new Date($scope[name]).getTime();
          return isEnd ? t + 86399000 : t;
      }
  };

    /**
     * 搜索
     */
    $scope.search = function(){
      $scope.obj.startCreateDate = get_time('createDate');
      $scope.obj.chainDate = get_time('chainDate');
      init_seller_list();
    };

    // 查看
    $scope.checkFn = function (list) {
      if(!list.onChain) {
        return
      }
      layer.open({
        title: 'blockheight： 200',
        content: '<b>blockhash：</b><p>'+ list.chainHash +'</p> '
      });  
    };
});
