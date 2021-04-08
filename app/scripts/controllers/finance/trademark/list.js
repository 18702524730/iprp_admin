angular.module('iprpAdminApp').controller('trademarkOnlineCtrl',function($scope,$modal,InvoiceService,PaginationService,$location,$state,session){
    $('#trademark_online').addClass("selected").parent().siblings().children('a').removeClass("selected");

  // 添加时间控件 初始化
    $('#payment_start_times').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      todayBtn:  1,
      autoclose: true
    });
    $('.datetimepicker').css('display','none');
    var MsecFormat = function (input) {
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "--";
      }
      var _date = new Date(input-0);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      return year + "-" + month + "-" + day;
    };
    $scope.obj = $location.search() || {};
    $scope.typeobj = {};

    $scope.newObj = {};
    
    $scope.orderOriginIds = null;
    $scope. custPlatformIds = null;
    $scope.createTimeStart = $scope.obj.createTimeStart && MsecFormat($scope.obj.createTimeStart);
    $scope.createTimeEnd = $scope.obj.createTimeEnd && MsecFormat($scope.obj.createTimeEnd);
    //前面赋值后重置，避免时间获取潜在bug
	  $scope.obj.createTimeStart = null;
	  $scope.obj.createTimeEnd = null;
	
    
    //获取时间 start_create_time
    var get_start_create_time = function () {
      if (!$scope.createTimeStart ) {
        return null
      } else {
        if (!$scope.obj.createTimeStart) {
          return new Date($scope.createTimeStart).getTime();
        } else {
          if (typeof $scope.obj.createTimeStart != 'string') {
            return new Date($scope.obj.createTimeStart).getTime()
          } else {
            return $scope.obj.createTimeStart - 0;
          }
        }
      }
    };
    //获取时间  end_create_time
    var get_end_create_time = function () {
      if(!$scope.createTimeEnd) {
        return null
      } else {
        if(!$scope.obj.createTimeEnd) {
          return new Date($scope.createTimeEnd).getTime() + 86399000
        } else {
          if(typeof $scope.obj.createTimeEnd != 'string' ) {
            return new Date($scope.obj.createTimeEnd).getTime() ;
          } else {
            return parseInt($scope.obj.createTimeEnd,10) ;
          }
        }
      }
    };
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
            templateUrl: 'package\\modal\\invoice\\invoice_msg.html',
            controller: 'invoiceMsgCtrl'
        }).result.then(function (result) {
          console.log(result)
          init_order_list();
          
        });
    };
    

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
            InvoiceService.invoice.findOnlineInvoiceList(object, cb);
            var o = $.extend({}, object);
            $location.path('main/finance_home/trademark_online').search(o);
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
    //按条件查询
    $scope.search_order = function(){
      init_order_list();
    }

    $scope.search_reset = function (){
      $scope.obj = {};
      init_order_list();
    }

    
});

