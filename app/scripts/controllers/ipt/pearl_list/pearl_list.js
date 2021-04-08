angular.module('iprpAdminApp').controller('PearlListCtrl', function ($scope,$modal,IptService,PaginationService,$location) {
  $('#pearl_list').siblings().removeClass("selected");
  $('#pearl_list').addClass("selected");
  $scope.obj = {};

  init_seller_list();
  getcountAllIpt()


  // 添加时间控件 初始化
  $('#startCreateDate,#startPickDate,#endPickDate,#endCreateDate').datetimepicker({
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
        $scope.totalData = IptService.findIptBeach(params,cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15, 1, true);

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
        console.log('newItems', newItems)
        $scope.to_loading = false;//如果不为空 结束加载页面
    });
  }

  function getcountAllIpt(){
    var params = Object.assign({}, $scope.obj);
    $scope.total = IptService.countAllIpt(params);
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

  // $scope.total_data = {};
  // // 查询ipt统计信息
  // function getCashDetailFn () {
  //   IptService.iptStatisticsInfo( function(data){
  //     $scope.total_data = data;
  //   });
  // }
  // getCashDetailFn();  //查询ipt统计信息

    /**
     * 搜索
     */
    $scope.search = function(){
      console.log(get_time('startCreateDate'))
      if (get_time('startCreateDate')) {$scope.obj.startCreateDate = get_time('startCreateDate');}
      if (get_time('startPickDate')) {$scope.obj.startPickDate = get_time('startPickDate');}
      if (get_time('endCreateDate')) {$scope.obj.endCreateDate = get_time('endCreateDate') + 24*3600*1000;}
      if (get_time('endPickDate')) {$scope.obj.endPickDate = get_time('endPickDate') + 24*3600*1000;}
    
      init_seller_list();
      getcountAllIpt();
    };

    $scope.reset = function () {
      $scope.obj = {};
      $scope.startCreateDate = ''
      $scope.endCreateDate = ''
      $scope.startPickDate = ''
      $scope.endPickDate = ''
      init_seller_list();
      getcountAllIpt();
    }

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
