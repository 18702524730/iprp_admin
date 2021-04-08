angular.module('iprpAdminApp').controller('CouponLookCtrl',function($scope,PaginationService,$location,$state,marKetList,$stateParams){
    $('#coupon_list').siblings().removeClass("selected");
    $('#coupon_list').addClass("selected");
    $scope.pagination = {};
    detail();
    function detail() {
      marKetList.findSebeCouponDetail({couponId: $stateParams.couponId}, function (data) {
          $scope.coupon_detail = data;
          init_refund_list();
      }, function (error) {
          alert(error.data.msg);
      })
    }
    function init_refund_list() {
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内

        var OweNer = function (pg_index, pg_count, cb) {
            var ret = {
              "couponId":$scope.coupon_detail.baseInfo.couponId,
              "couponName":$scope.coupon_detail.baseInfo.couponName,
              "pgIndex": pg_index,
              "pgCount": pg_count
            };
            marKetList.findSebeCouponObtainRecordList(ret, cb);
            var o = $.extend({}, ret);
            $location.path('main/market_home/coupon_look/'+$stateParams.couponId).search(o);
        };
        $scope.pagination = new PaginationService(OweNer, 15, 1, false);

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.CouponList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.CouponList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    
  $scope.couponStateBol = false;
    
  $scope.changeStates = function(){//修改拾贝券状态
    $scope.couponSendState = $scope.coupon_detail.baseInfo.couponSendState;
    $scope.couponStateBol = true;
    layer.open({
      title:'更改发放状态',
      btn:['确认','取消'],
      type: 1,
      yes: function(index, layero){
        layer.close(index);
        $scope.confirm();
      },
      content: $('#radioType') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
  }

  $scope.confirm = function(){
    marKetList.updateSebeCouponSendState({
      couponId:$stateParams.couponId,
      couponSendState:$scope.couponSendState
    },function(resp){
      detail();
    },function(err){
      console.log(err.data.msg)
      var contentDate = err.data.msg;
      layer.open({
        title:'提示',
        content:contentDate
      });
    })
  }
});

