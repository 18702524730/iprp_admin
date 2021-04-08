angular.module('iprpAdminApp').controller('CouponListCtrl',function($scope,PaginationService,$location,$state,marKetList,$modal,Upload){

    $('#coupon_list').siblings().removeClass("selected");
    $('#coupon_list').addClass("selected");

    $scope.obj = $location.search() || {};
    function init_refund_list() {
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容


      var OweNer = function (pg_index, pg_count, cb) {
        var ret = {
          "couponName":$scope.obj.couponName === undefined ? null : $scope.obj.couponName,
          "couponType":$scope.obj.couponType,
          "couponSendState":$scope.obj.couponSendState,
          "pgIndex": pg_index,
          "pgCount": pg_count,
        };
        console.log(ret,'测试')
        marKetList.findSebeCouponList(ret, cb);
        var o = $.extend({}, ret);
        $location.path('main/market_home/coupon').search(o);
      };
      $scope.pagination = new PaginationService(OweNer, 15, 1, false);

      $scope.$watch('pagination.curPageItems', function (newItems) {
          $scope.RefundList = [];
          if (newItems == undefined)
              return;
          if ($scope.pagination.curPageItems.length === 0) {
              $scope.loading_text = "没有符合条件的记录";//加载页面内容
              return;
          }
          $scope.RefundList = newItems;
          console.log($scope.RefundList);
          $scope.to_loading = false;//如果不为空 结束加载页面
      });
    }

    //查找
    $scope.search = function(){
      console.log("测试")
      init_refund_list();
    };
    $scope.search();
    //重置
    $scope.reset = function () {
      $scope.obj = {};
      init_refund_list();
    }
    $scope.checkFn = function(list){
        $location.path('/main/market_home/coupon_look/' + list.couponId);
    };

    // 弹窗
  $scope.dialogFn = function(info){
    console.log(info)
    $modal.open({
      resolve:{
        data : function(){
          var data = {
            couponId:info.couponId
          }
          return data;
        },
      },
      templateUrl: 'package\\modal\\coupon\\coupon_give.html',
      controller: 'couponGiveCtrl'
    }).result.then(function (result) {
      $scope.sendSebeCoupon(result);
      console.log('测试',result)
    });
  };
  $scope.sendSebeCoupon = function(result){//发放拾贝券
    marKetList.sendSebeCoupon(result,function(resp){
      init_refund_list();
    },function(err){
      console.log(err.data.msg)
      layer.open({
        title: '提示',
        content:err.data.msg
      })
    })
  }
  
});

