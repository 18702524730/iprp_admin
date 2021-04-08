angular.module('iprpAdminApp').controller('dunhuangCtrl',function($scope,bsOrderService,orderService,PaginationService,$location,$state, session){
    $('#dunhuang_list').addClass("selected").parent().siblings().children('a').removeClass("selected");

    // 添加时间控件 初始化
      $('#beginTime,#endTime,#createTimeBeginTime,#createTimeEndTime').datetimepicker({
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
  
      $scope.beginTime = $scope.obj.beginTime && MsecFormat($scope.obj.beginTime);
      $scope.endTime = $scope.obj.endTime && MsecFormat($scope.obj.endTime);
      $scope.createTimeBeginTime = $scope.obj.createTimeBeginTime && MsecFormat($scope.obj.createTimeBeginTime);
      $scope.createTimeEndTime = $scope.obj.createTimeEndTime && MsecFormat($scope.obj.createTimeEndTime);
      //前面赋值后重置，避免时间获取潜在bug
      $scope.obj.beginTime = null;
      $scope.obj.endTime = null;
      $scope.obj.createTimeBeginTime = null;
      $scope.obj.createTimeEndTime = null;
      //获取时间 start_create_time
      var get_start_time = function () {
        if (!$scope.beginTime ) {
          return null
        } else {
          if (!$scope.obj.beginTime) {
            return new Date($scope.beginTime).getTime();
          } else {
            if (typeof $scope.obj.beginTime != 'string') {
              return new Date($scope.obj.beginTime).getTime()
            } else {
              return $scope.obj.beginTime - 0;
            }
          }
        }
      };
      //获取时间  end_create_time
      var get_end_time = function () {
        if(!$scope.endTime) {
          return null
        } else {
          if(!$scope.obj.endTime) {
            return new Date($scope.endTime).getTime() + 86399000
          } else {
            if(typeof $scope.obj.endTime != 'string' ) {
              return new Date($scope.obj.endTime).getTime() ;
            } else {
              return parseInt($scope.obj.endTime,10) ;
            }
          }
        }
      };
      //获取时间 start_create_time
      var get_start_create_time = function () {
        if (!$scope.createTimeBeginTime ) {
          return null
        } else {
          if (!$scope.obj.createTimeBeginTime) {
            return new Date($scope.createTimeBeginTime).getTime();
          } else {
            if (typeof $scope.obj.createTimeBeginTime != 'string') {
              return new Date($scope.obj.createTimeBeginTime).getTime()
            } else {
              return $scope.obj.createTimeBeginTime - 0;
            }
          }
        }
      };
      //获取时间  end_create_time
      var get_end_create_time = function () {
        if(!$scope.createTimeEndTime) {
          return null
        } else {
          if(!$scope.obj.createTimeEndTime) {
            return new Date($scope.createTimeEndTime).getTime() + 86399000
          } else {
            if(typeof $scope.obj.createTimeEndTime != 'string' ) {
              return new Date($scope.obj.createTimeEndTime).getTime() ;
            } else {
              return parseInt($scope.obj.createTimeEndTime,10) ;
            }
          }
        }
      };
      init_order_list();
      function init_order_list() {
          
          $scope.to_loading = true;//默认 开始 加载
          $scope.loading_text = "加载中...";//加载页面内容
          var OweNer = function (pg_index, pg_count, cb) {
              var pageConfig = {
                  "pgIndex": pg_index,
                  "pgCount": pg_count,
                  "beginTime": get_start_time(),
                  "endTime": get_end_time(),
                  "createTimeBeginTime": get_start_create_time(),
                  "createTimeEndTime": get_end_create_time(),
              };
              var object = $.extend({}, $scope.obj, pageConfig);
              orderService.dunhuangList(object, cb);
              var o = $.extend({}, object);
              $location.path('main/trade_home/dunhuang_list').search(o);
          };
          $scope.pagination = new PaginationService(OweNer,15);
  
          $scope.$watch('pagination.curPageItems', function (newItems) {
              $scope.OrderList = [];
              if (newItems == undefined || newItems ==null || newItems ==[]){
                $scope.loading_text = "页面加载失败"
                return;
              }
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
        $scope.beginTime = null;
        $scope.endTime = null;
        $scope.createTimeBeginTime = null;
        $scope.createTimeEndTime = null;
        init_order_list();
      }
  
      /**
       * 查看订单详情
       * @param index
       */
      $scope.detail_orders = function(index){
          $location.path('main/trade_home/dunhuang_detail/' + index);
      }
      $scope.reception_orders = function(id){
        orderService.receptionOrders({orderFuwuId: id},function(data){
          init_order_list();
        },function(err){
          // layer.alert('',{
          //   title:'提示',
          //   type: 0,
          //   shadeClose:true,
          //   content: '权限不足，若需要请联系管理员申请',
          //   btn: '确定'
          // }, function(index){
          //     layer.close(index);
          // });
          alert(err.data.msg);
        });
      }
      
     
  });
  
  