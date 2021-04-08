angular.module('iprpAdminApp').controller('zsSingleCtrl', function ($scope,InvoiceService,PaginationService,$location,$resource,session) {
    $('#zs_ai').parent().siblings().children('a').removeClass("selected");
    $('#zs_ai').addClass("selected");
    
    $scope.obj={
      pg_index:0
    }

    $scope.apply_Info = function(){
        if(!$scope.obj.order_sn&&!$scope.obj.trade_no){
          layer.alert('请填写订单号或商户订单号');
          return;
        }
        var OweNer = function (pg_index, pg_count, cb) {
          //获取时间
          var get_time = function (name, isEnd) {
            if (!$scope[name] ) {
              return ''
            } else {
              var t = new Date($scope[name]).getTime();
              return isEnd ? t + 86399000 : t;
            }
          };

        var pageConfig = {
            pg_index:pg_index,
            pg_count:15,
            tradeNo:$scope.obj.trade_no,
            orderSn:$scope.obj.order_sn
        };
        var object = $.extend({}, $scope.obj, pageConfig);
        // $location.path('main/fast_home/feedback_apply').search(object);
        InvoiceService.zs_ai.liation(object, cb);
        };

        $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index); 

        $scope.$watch('pagination.curPageItems', function (newItems) {
          $scope.InfoList = [];
          if (newItems == undefined)
            return;
          if ($scope.pagination.curPageItems.length === 0) {
            $scope.loading_text = "没有符合条件的记录";//加载页面内容
            $scope.to_loading = true;
            return;
          }
          $scope.InfoList = newItems;
          $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    $scope.reset=function(){
      $scope.obj.trade_no='';
      $scope.obj.order_sn='';
    }
    $scope.detail_orders = function(index){
        $location.path('main/trade_home/order_detail/' + index);
    }
   
})