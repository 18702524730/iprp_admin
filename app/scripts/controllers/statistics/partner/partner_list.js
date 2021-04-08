angular.module('iprpAdminApp').controller('PartnerListCtrl', function ($scope,$modal,PartnerService,PaginationService,$location) {
  $('#partner_list').siblings().removeClass("selected");
  $('#partner_list').addClass("selected");
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
        $scope.obj.startCreateTime = 1540432800000;
        var params = Object.assign({}, $scope.obj, {"pgIndex": pg_index, "pgCount": pg_count});
        $scope.totalData = PartnerService.countPartnerIncome(params,cb);
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
        console.log($scope.pagination)
        var count = ($scope.pagination.curPage - 1) * $scope.pagination.countPerPage
        for (var i = 0; i< newItems.length; i++) {
          newItems[i].number = count + i+1
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
      init_seller_list();
    };
    $scope.reset = function(){
      $scope.obj = {};
      $('.invit').find('.iconWrap').find('i').removeClass('current')
      $('.openStore').find('.iconWrap').find('i').removeClass('current')
      $('.orderNum').find('.iconWrap').find('i').removeClass('current')
      init_seller_list();
    };
    // 邀请人排序点击事件
    $scope.inviteClick = function () {
      $('.openStore').find('.iconWrap').find('i').removeClass('current')
      $('.orderNum').find('.iconWrap').find('i').removeClass('current')

      delete $scope.obj.isOpenNumberSort
      delete $scope.obj.partnerInviteOrderNumberSort

      if (!$('.invit').find('.iconWrap').find('i.current').length) {
        $('.invit').find('.iconWrap').find('i').eq(0).addClass('current')
        $scope.obj.inviteNumberSort = 2
        init_seller_list();
      } else {
        $('.invit').find('.iconWrap').find('i.current').removeClass('current').siblings().addClass('current')
        $scope.obj.inviteNumberSort == 2 ? $scope.obj.inviteNumberSort = 1 : $scope.obj.inviteNumberSort = 2
        init_seller_list();
      }
    }
    // 开店人数排序
    $scope.openStoreClick = function () {
      $('.invit').find('.iconWrap').find('i').removeClass('current')
      $('.orderNum').find('.iconWrap').find('i').removeClass('current')
      delete $scope.obj.inviteNumberSort
      delete $scope.obj.partnerInviteOrderNumberSort

      if (!$('.openStore').find('.iconWrap').find('i.current').length) {
        $('.openStore').find('.iconWrap').find('i').eq(0).addClass('current')
        $scope.obj.isOpenNumberSort = 1
        init_seller_list();
      } else {
        $('.openStore').find('.iconWrap').find('i.current').removeClass('current').siblings().addClass('current')
        $scope.obj.isOpenNumberSort == 1 ? $scope.obj.isOpenNumberSort = 2 : $scope.obj.isOpenNumberSort = 1
        init_seller_list();
      }
    }
    // 已开单人数排序
    $scope.orderNumClick = function () {
      $('.invit').find('.iconWrap').find('i').removeClass('current')
      $('.openStore').find('.iconWrap').find('i').removeClass('current')
      delete $scope.obj.inviteNumberSort
      delete $scope.obj.isOpenNumberSort

      if (!$('.orderNum').find('.iconWrap').find('i.current').length) {
        $('.orderNum').find('.iconWrap').find('i').eq(0).addClass('current')
        $scope.obj.partnerInviteOrderNumberSort = 1
        init_seller_list();
      } else {
        $('.orderNum').find('.iconWrap').find('i.current').removeClass('current').siblings().addClass('current')
        $scope.obj.partnerInviteOrderNumberSort == 1 ? $scope.obj.partnerInviteOrderNumberSort = 2 : $scope.obj.partnerInviteOrderNumberSort = 1
        init_seller_list();
      }
    }
    $scope.handleClickDetail = function(memberSn){
      $location.path('main/partner_home/partner_manage_detail/' + memberSn);
      // $location.path('main/fast_home/partner_audit/'+partner_id+'/det');
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
