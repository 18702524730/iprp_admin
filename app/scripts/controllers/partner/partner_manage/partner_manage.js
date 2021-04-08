angular.module('iprpAdminApp').controller('PartnerManageCtrl', function ($scope,$modal,PartnerService,PaginationService,$location) {
  $('#partner_manage').siblings().removeClass("selected");
  $('#partner_manage').addClass("selected");

  // 添加时间控件 初始化
  $('#payTimeBegin,#payTimeEnd').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose: true
  });
  //获取时间
  var get_time = function (name, isEnd) {
      if (!$scope[name] ) {
          return ''
      } else {
          var t = new Date($scope[name]).getTime();
          return isEnd ? t + 86399000 : t;
      }
  };
  // 选择时间限制，开始时间不能超过结束时间
  $scope.$watch('payTimeBegin', function (newItems) {
      if ($scope.payTimeEnd && $scope.payTimeBegin) {
          if (new Date($scope.payTimeEnd).getTime() < new Date($scope.payTimeBegin).getTime()) {
              layer.alert('结束时间需大于开始时间')
              return;
         }
         if (( new Date($scope.payTimeEnd).getTime() - new Date($scope.payTimeBegin).getTime() )> 29*60*60*24*1000) {
              layer.alert('时间跨度不能超过30天')
              return; 
         }
      }
  });
  $scope.$watch('payTimeEnd', function (newItems) {
      if ($scope.payTimeEnd && $scope.payTimeBegin) {
          if (new Date($scope.payTimeEnd).getTime() < new Date($scope.payTimeBegin).getTime()) {
              layer.alert('结束时间需大于开始时间')
              return;
         }
         if (( new Date($scope.payTimeEnd).getTime() - new Date($scope.payTimeBegin).getTime() )> 29*60*60*24*1000) {
              layer.alert('时间跨度不能超过30天')
              return;
         }
      }
  });

  $scope.obj = {};
  init_seller_list();

  function init_seller_list(){
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      var OweNer = function(pg_index,pg_count,cb){
        var params = Object.assign({}, $scope.obj, {"pgIndex": pg_index, "pgCount": pg_count});
        PartnerService.parnterList(params,cb);
      };
      $scope.pagination = new PaginationService(OweNer,15, 1, true);

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
      $scope.obj.startTime = get_time('payTimeBegin');
      $scope.obj.endTime = get_time('payTimeEnd', true);
      init_seller_list();
    };

    /**
     * 查看详情
     */
    $scope.checkDetailFn = function(memberSn) {
      $location.path('main/partner_home/partner_manage_detail/' + memberSn);
    };

    /**
     * 审核
     * @param partner_id
     */
    $scope.handleClickFeedBaack = function(partner_id){
      // #/main/partner_home/partner_application
        $location.path('main/partner_home/partner_audit/'+partner_id+'/bl');
    };
    
});
