angular.module('iprpAdminApp').controller('MasterCzCtrl',function($scope,ntOrderService,ChannelService,PaginationService,$location,$state){

    $('#cz').parent().siblings().children('a').removeClass("selected");
    $('#cz').addClass("selected");

  // 添加时间控件 初始化
    $('#endCreateTime,#startCreateTime,#startValidTime,#endValidTime').datetimepicker({
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
    $scope.buyer_mobile = null;
    $scope.buyer_email = null;
    $scope.startValidTime = $scope.obj.startValidTime && MsecFormat($scope.obj.startValidTime);
    $scope.endValidTime = $scope.obj.endValidTime && MsecFormat($scope.obj.endValidTime);
    $scope.startCreateTime = $scope.obj.startCreateTime && MsecFormat($scope.obj.startCreateTime);
    $scope.endCreateTime = $scope.obj.endCreateTime && MsecFormat($scope.obj.endCreateTime);
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

      //到期时间 startValidTime
      var get_startValidTime = function () {
        if (!$scope.startValidTime ) {
          return ''
        } else {
          if (!$scope.obj.startValidTime) {
            return new Date($scope.startValidTime).getTime();
          } else {
            if (typeof $scope.obj.startValidTime != 'string') {
              return new Date($scope.obj.startValidTime).getTime()
            } else {
              return $scope.obj.startValidTime - 0;
            }
          }
        }
      };

      //到期时间  endValidTime
      var get_endValidTime = function () {
        if(!$scope.endValidTime) {
          return ''
        } else {
          if(!$scope.obj.endValidTime) {
            return new Date($scope.endValidTime).getTime() + 86399000
          } else {
            if(typeof $scope.obj.endValidTime != 'string' ) {
              return new Date($scope.obj.endValidTime).getTime() ;
            } else {
              return parseInt($scope.obj.endValidTime,10) ;
            }
          }
        }
      };

      //获取时间 startCreateTime
      var get_startCreateTime = function () {
        if (!$scope.startCreateTime ) {
          return ''
        } else {
          if (!$scope.obj.startCreateTime) {
            return new Date($scope.startCreateTime).getTime();
          } else {
            if (typeof $scope.obj.startCreateTime != 'string') {
              return new Date($scope.obj.startCreateTime).getTime()
            } else {
              return $scope.obj.startCreateTime - 0;
            }
          }
        }
      };

      //获取时间 endCreateTime
      var get_endCreateTime = function () {
        if(!$scope.endCreateTime) {
          return ''
        } else {
          if(!$scope.obj.endCreateTime) {
            return new Date($scope.endCreateTime).getTime() + 86399000
          } else {
            if(typeof $scope.obj.endCreateTime != 'string' ) {
              return new Date($scope.obj.endCreateTime).getTime() ;
            } else {
              return parseInt($scope.obj.endCreateTime,10) ;
            }
          }
        }
      };


        var OweNer = function (pg_index, pg_count, cb) {
          //url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
          if ($scope.obj.pg_index) {
            pg_index = $scope.obj.pg_index;
            $scope.obj.pg_index = '';
          }
          var pageConfig = {
            "pg_index": pg_index,
            "pg_count": pg_count,
            "startValidTime": get_startValidTime(),
            "endValidTime": get_endValidTime(),
            "startCreateTime": get_startCreateTime(),
            "endCreateTime": get_endCreateTime()
          };
          var object = $.extend({}, $scope.obj, pageConfig);
          ntOrderService.list(object, cb);
          $location.path('main/master_home/cz_list').search(object);
        };
        $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index);

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
      $scope.obj.pg_index = 0;
      init_order_list();
    }

  //重置 按钮
  $scope.search_reset = function () {
    $scope.obj = { };
    $scope.startValidTime = null;
    $scope.endValidTime = null;
    $scope.startCreateTime = null;
    $scope.endCreateTime = null;
    init_order_list();
  }



    /**
     * 查看订单详情
     * @param index
     */
    $scope.detail_orders = function(index){
      $state.go('main.master_home.cz_detail', {order_sn: index});
      //$location.path('main/master_home/cz_detail/' + index);
    }


    //提示操作
    $scope.hint=false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});

