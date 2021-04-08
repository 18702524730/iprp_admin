angular.module('iprpAdminApp').controller('WmOrderListCtrl',function($scope,cxbOrderService,ChannelService,PaginationService,$location,$state){
    $('#wm_order_list').parent().siblings().children('a').removeClass("selected");
    $('#wm_order_list').addClass("selected");

  // 添加时间控件 初始化
    $('#applyTimeStart,#applyTimeEnd').datetimepicker({
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
    $scope.applyTimeStart = $scope.obj.applyTimeStart && MsecFormat($scope.obj.applyTimeStart);
    $scope.applyTimeEnd = $scope.obj.applyTimeEnd && MsecFormat($scope.obj.applyTimeEnd);

    //前面赋值后重置，避免时间获取潜在bug
	  $scope.obj.applyTimeStart = null;
	  $scope.obj.applyTimeEnd = null;

    init_order_list();
    function init_order_list() {
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        if(!!$scope.obj.account_number){
            if($scope.obj.account_number.indexOf('@') === -1){
                $scope.buyer_mobile = $scope.obj.account_number;
            }else{
                $scope.buyer_email = $scope.obj.account_number;
            }
        }else{
            $scope.buyer_mobile = null;
            $scope.buyer_email = null;
        }


      //获取时间 applyTimeStart
      var get_applyTimeStart = function () {
        if (!$scope.applyTimeStart ) {
          return ''
        } else {
          if (!$scope.obj.applyTimeStart) {
            return new Date($scope.applyTimeStart).getTime();
          } else {
            if (typeof $scope.obj.applyTimeStart != 'string') {
              return new Date($scope.obj.applyTimeStart).getTime()
            } else {
              return $scope.obj.applyTimeStart - 0;
            }
          }
        }
      };

      //获取时间 applyTimeEnd
      var get_applyTimeEnd = function () {
        if(!$scope.applyTimeEnd) {
          return ''
        } else {
          if(!$scope.obj.applyTimeEnd) {
            return new Date($scope.applyTimeEnd).getTime() + 86399000
          } else {
            if(typeof $scope.obj.applyTimeEnd != 'string' ) {
              return new Date($scope.obj.applyTimeEnd).getTime() ;
            } else {
              return parseInt($scope.obj.applyTimeEnd,10) ;
            }
          }
        }
      };

        var OweNer = function (pg_index, pg_count, cb) {
            var pageConfig = {
                "pg_index": pg_index,
                "pg_count": pg_count,
                "applyTimeStart": get_applyTimeStart(),
                "applyTimeEnd": get_applyTimeEnd(),
            };
            var object = $.extend({}, $scope.obj, pageConfig);
            cxbOrderService.list(object, cb);
            var o = $.extend({}, object, $scope.typeobj);
            $location.search(object).replace();
            //$location.path('main/trade_home/cxb_order_list').search(o);
        };
        $scope.pagination = new PaginationService(OweNer, 15);

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.OrderList = [];
            if (newItems == undefined)
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
      $scope.applyTimeStart = null;
      $scope.applyTimeEnd = null;
      init_order_list();
    }

    /**
     * 查看订单详情
     * @param index
     */
    $scope.detail_orders = function(index){
        $location.path('main/trade_home/wm_order_detail/' + index);
    }

});

