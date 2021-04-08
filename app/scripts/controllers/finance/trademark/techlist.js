angular.module('iprpAdminApp').controller('techlistybCtrl',function($scope,$modal,InvoiceService,PaginationService,$location,$state,session){
    $('#techpro').addClass("selected").parent().siblings().children('a').removeClass("selected");

    $scope.obj = $location.search() || {};
    
    init_order_list();
    function init_order_list() {
        
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function (pg_index, pg_count, cb) {
            var pageConfig = {
                "pgIndex": pg_index,
                "pgCount": pg_count,
            };
            var object = $.extend({}, $scope.obj, pageConfig);
            InvoiceService.invoice.selectTech(object, cb);
            var o = $.extend({}, object);
            $location.path('main/finance_home/techlistyb').search(o);
        };
        $scope.pagination = new PaginationService(OweNer, 15 ,1);

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.OrderList = [];
            if (newItems == undefined || newItems ==null || newItems ==[])
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.OrderList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    $scope.setInvoiceMsg = function(order_detail){
      $modal.open({
          resolve:{
              order_detail : function(){
                  return order_detail;
              },
              type: function(){
                return 1
              }
          },
          backdrop:false,
          keyboard:true,
          templateUrl: 'package\\modal\\invoice\\remain_case.html',
          controller: 'remainCaseCtrl'
      }).result.then(function (result) {
          console.log(result);
          init_order_list();
      });
  };
    //按条件查询
    $scope.search_order = function(){
      init_order_list();
    }

    $scope.search_reset = function (){
      $scope.obj = {};
      init_order_list();
    }

    
});

