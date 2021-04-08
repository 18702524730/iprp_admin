angular.module('iprpAdminApp').controller('CzoutListCtrl',function($scope,czOutList,ChannelService,PaginationService,$location,$state){
   $('#admin_list').addClass("selected").parent().siblings().children().removeClass("selected");
  // 申请时间排序
  $scope.isActive = false;
  $scope.sortingClick = function(){
    if($scope.isActive){
        $scope.isActive = true;
        $scope.obj.orderByTime = 2;
    }else{
        $scope.isActive = false;
        $scope.obj.orderByTime = 1;
    }
    init_order_list();
  };
  //跳转详情页面
  $scope.czdetail = function(item){
      $location.path('main/master_home/cz_detail/'+item.orderSn);
  };
  // 添加时间控件 初始化
  $('#start_notarization_time,#end_notarization_time,#start_create_time,#end_create_time').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose:  true
  }); 
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
    $scope.start_notarization_time = $scope.obj.start_notarization_time && MsecFormat($scope.obj.start_notarization_time);
    $scope.end_notarization_time = $scope.obj.end_notarization_time && MsecFormat($scope.obj.end_notarization_time );
    $scope.start_create_time = $scope.obj.start_create_time && MsecFormat($scope.obj.start_create_time);
    $scope.end_create_time = $scope.obj.end_create_time  && MsecFormat($scope.obj.end_create_time );
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

        // 组装后台字段bs_calss_type值
        var get_bs_calss_type = function(){
          var ret = '';
          if ($scope.obj.fir_id) {
            ret = $scope.obj.thi_id ? 3 : $scope.obj.sec_id ? 2 : $scope.obj.fir_id ? 1 : ''
          }else{
            ret = $scope.typeobj.thi_id ? 3 : $scope.typeobj.sec_id ? 2 : $scope.typeobj.fir_id ? 1 : ''
          }
          return ret;
        };


        //获取存证时间 start_notarization_time
        var get_start_notarization_time = function () {
          if (!$scope.start_notarization_time ) {
            return ''
          } else {
            if (!$scope.obj.start_notarization_time) {
              return new Date($scope.start_notarization_time).getTime();
            } else {
              if (typeof $scope.obj.start_notarization_time != 'string') {
                return new Date($scope.obj.start_notarization_time).getTime()
              } else {
                return $scope.obj.start_notarization_time - 0;
              }
            }
          }
        };

        //获取时间  end_notarization_time
        var get_end_notarization_time = function () {
          if(!$scope.end_notarization_time) {
            return ''
          } else {
            if(!$scope.obj.end_notarization_time) {
              return new Date($scope.end_notarization_time).getTime() + 86399000
            } else {
              if(typeof $scope.obj.end_notarization_time != 'string' ) {
                return new Date($scope.obj.end_notarization_time).getTime() ;
              } else {
                return parseInt($scope.obj.end_notarization_time,10) ;
              }
            }
          }
        };

        //获取出证时间 start_create_time
        var get_start_create_time = function () {
          if (!$scope.start_create_time ) {
            return ''
          } else {
            if (!$scope.obj.start_create_time) {
              return new Date($scope.start_create_time).getTime();
            } else {
              if (typeof $scope.obj.start_create_time != 'string') {
                return new Date($scope.obj.start_create_time).getTime()
              } else {
                return $scope.obj.start_create_time - 0;
              }
            }
          }
        };

        //获取时间 end_create_time
        var get_end_create_time = function () {
          if(!$scope.end_create_time) {
            return ''
          } else {
            if(!$scope.obj.end_create_time) {
              return new Date($scope.end_create_time).getTime() + 86399000
            } else {
              if(typeof $scope.obj.end_create_time != 'string' ) {
                return new Date($scope.obj.end_create_time).getTime() ;
              } else {
                return parseInt($scope.obj.end_create_time,10) ;
              }
            }
          }
        };

        var OweNer = function (pg_index, pg_count, cb) {
            var pageConfig = {
                "pg_index":pg_index,
                "pg_count":pg_count,
                "startNotarizationTime": get_start_notarization_time (),//存证开始时间
                "endNotarizationTime": get_end_notarization_time (),//存证结束时间
                "startCreateTime": get_start_create_time (),//出证申请开始时间
                "endCreateTime": get_end_create_time (),//出证申请结束时间
                "orderByTime":$scope.obj.orderByTime//申请时间升序
            };
            var object = $.extend({}, $scope.obj, pageConfig);
            $location.path('main/fast_home/czout_list').search(object);
            czOutList.list(object, cb);
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

    $scope.search_reset = function () {
        $scope.obj = {};
        $scope.start_notarization_time = null;
        $scope.end_notarization_time = null;
        $scope.start_create_time = null;
        $scope.end_create_time = null;
        init_order_list();
    }

    /**
     * 订单编辑
     * @param index
     */
    $scope.czEditor = function(item){
        $location.path('main/fast_home/czout_note/'+item.orderSn);
    }

    //提示操作
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});