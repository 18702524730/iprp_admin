angular.module('iprpAdminApp').controller('CSOrderListCtrl',function($scope,bsOrderService,ChannelService,PaginationService,$location,$state,session){
    $('#channel_service_order').addClass("selected").parent().siblings().children('a').removeClass("selected");

    // 添加时间控件 初始化
    $('#createTimeStart,#createTimeEnd').datetimepicker({
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
    $scope.createTimeStart = $scope.obj.createTimeStart && MsecFormat($scope.obj.createTimeStart);
    $scope.createTimeEnd = $scope.obj.createTimeEnd && MsecFormat($scope.obj.createTimeEnd);
    $scope.orderOriginId = null;
    $scope. custPlatformId = null;
    //前面赋值后重置，避免时间获取潜在bug
	  $scope.obj.createTimeStart = null;
	  $scope.obj.createTimeEnd = null;
    //获取订单来源
    bsOrderService.findOrderOrigin(function(data){
      $scope.origindata = data;
    },function(err){
      console.log(err)
    })
  //获取客户平台
  bsOrderService.findOrderPlatfom(function(data){
    $scope.platfomdata = data;
  },function(err){
    console.log(err)
  })
  // 获取服务状态
  bsOrderService.getServiceState({bsId:1},function(data){
    $scope.serviceState = data.data;
  },function(){})
    // 组装后台字段bs_calss_id值
    var get_bs_calss_id = function(){
        var ret = '';
        if ($scope.obj.fir_id) {
            ret = $scope.obj.fou_id || $scope.obj.thi_id || $scope.obj.sec_id || $scope.obj.fir_id
        }else{
            ret = $scope.typeobj.fou_id || $scope.typeobj.thi_id || $scope.typeobj.sec_id || $scope.typeobj.fir_id
        }
        return ret;
    };
    // 组装后台字段bs_calss_type值
    var get_bs_calss_type = function(){
        var ret = '';
        if ($scope.obj.fir_id) {
            ret = $scope.obj.fou_id ? 4 : $scope.obj.thi_id ? 3 : $scope.obj.sec_id ? 2 : $scope.obj.fir_id ? 1 : ''
        }else{
            ret = $scope.typeobj.fou_id ? 4 : $scope.typeobj.thi_id ? 3 : $scope.typeobj.sec_id ? 2 : $scope.typeobj.fir_id ? 1 : ''
        }
        return ret;
    };

    //获取时间 createTimeStart
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
    //获取时间  createTimeEnd
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

    //获取时间 finished_start_time
    var get_finished_start_time = function () {
      if (!$scope.finished_start_time ) {
        return null
      } else {
        if (!$scope.obj.finished_start_time) {
          return new Date($scope.finished_start_time).getTime();
        } else {
          if (typeof $scope.obj.finished_start_time != 'string') {
            return new Date($scope.obj.finished_start_time).getTime()
          } else {
            return $scope.obj.finished_start_time - 0;
          }
        }
      }
    };

    //获取时间  finished_end_time
    var get_finished_end_time = function () {
      if(!$scope.finished_end_time) {
        return null
      } else {
        if(!$scope.obj.finished_end_time) {
          return new Date($scope.finished_end_time).getTime() + 86399000
        } else {
          if(typeof $scope.obj.finished_end_time != 'string' ) {
            return new Date($scope.obj.finished_end_time).getTime() ;
          } else {
            return parseInt($scope.obj.finished_end_time,10) ;
          }
        }
      }
    };

    //获取时间 payment_start_time
    var get_payment_start_time = function () {
      if (!$scope.payment_start_time ) {
        return null
      } else {
        if (!$scope.obj.payment_start_time) {
          return new Date($scope.payment_start_time).getTime();
        } else {
          if (typeof $scope.obj.payment_start_time != 'string') {
            return new Date($scope.obj.payment_start_time).getTime()
          } else {
            return $scope.obj.payment_start_time - 0;
          }
        }
      }
    };

    //获取时间 payment_end_time
    var get_payment_end_time = function () {
      if(!$scope.payment_end_time) {
        return null
      } else {
        if(!$scope.obj.payment_end_time) {
          return new Date($scope.payment_end_time).getTime() + 86399000
        } else {
          if(typeof $scope.obj.payment_end_time != 'string' ) {
            return new Date($scope.obj.payment_end_time).getTime() ;
          } else {
            return parseInt($scope.obj.payment_end_time,10) ;
          }
        }
      }
    };

    init_order_list();
    function init_order_list() {
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function (pgIndex, pgCount, cb) {
            var pageConfig = {
                "pgIndex": pgIndex,
                "pgCount": pgCount,
                "createTimeStart": get_start_create_time(),
                "createTimeEnd": get_end_create_time(),
                "orderOriginIds[0]": $scope.orderOriginId,
                "custPlatformIds[0]": $scope. custPlatformId
            };
            var object = $.extend({}, $scope.obj, pageConfig);
            bsOrderService.channelList(object, cb);
            // var o = $.extend({}, object, $scope.typeobj);
            var o = $.extend({}, object);
            $location.path('main/trade_home/channel_service_order').search(o);
        };
        $scope.pagination = new PaginationService(OweNer ,15,1);
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
      $scope.orderOriginId = null;
      $scope. custPlatformId = null;
      $scope.typeobj = {};
      $scope.createTimeStart = null;
      $scope.createTimeEnd = null;
      init_order_list();
    }

    /**
     * 查看订单详情
     * @param index
     */
    $scope.detail_orders = function(index){
        $location.path('main/trade_home/service_order_detail/' + index);
    }

    $scope.bs_type_change = function(type, id, callback){
        if (id) {
          if (type == 3) {
            bsOrderService.serviceStatus({
                bsId: id
            },function(data){
              $scope['fouTypeData'] = data.data;
              if (callback) {
                  callback();
              }else{
                  $scope.typeobj.fou_id='';
              }
            },function(error){
              alert(error.data.msg);
            })
          }else{
            bsOrderService.productType({
                type:type,
                parent_id: id
            },function(data){
                if (type == 1) {
                    $scope['secTypeData'] = data;
                    if (callback) {
                        callback();
                    }else{
                        $scope.typeobj.sec_id='';
                        $scope.typeobj.thi_id='';
                        $scope.typeobj.fou_id='';
                        $scope['thiTypeData']=[];
                        $scope['fouTypeData']=[];
                    }
                }else if(type == 2){
                    $scope['thiTypeData'] = data;
                    if (callback) {
                        callback();
                    }else{
                        $scope.typeobj.thi_id='';
                        $scope.typeobj.fou_id='';
                        $scope['fouTypeData']=[];
                    }
                }
            },function(error){
                alert(error.data.msg);
            })
          }
        }else{
            if (type == 1) {
                $scope.typeobj.sec_id='';
                $scope.typeobj.thi_id='';
                $scope.typeobj.fou_id='';
                $scope['secTypeData']=[];
                $scope['thiTypeData']=[];
                $scope['fouTypeData']=[];
            }else if(type == 2){
                $scope.typeobj.thi_id='';
                $scope.typeobj.fou_id='';
                $scope['thiTypeData']=[];
                $scope['fouTypeData']=[];
            }else if(type == 3){
                $scope.typeobj.fou_id='';
                $scope['fouTypeData']=[];
            }
        }
    }

    //获取商品一级分类
    bsOrderService.productType(function(data){
        $scope.firTypeData = data;
        $scope.typeobj.fir_id = $scope.obj.fir_id-0 || '';
    },function(error){
        alert(error.data.msg);
    });

    //获取商品二级分类
    if ($scope.obj.fir_id) {
        $scope.bs_type_change(1, $scope.obj.fir_id, function(){
            $scope.typeobj.sec_id = $scope.obj.sec_id-0 || '';
        });
    }

    //获取商品三级分类
    if ($scope.obj.sec_id) {
        $scope.bs_type_change(2, $scope.obj.sec_id, function(){
            $scope.typeobj.thi_id = $scope.obj.thi_id-0 || '';
        });
    }

    //获取四级服务状态
    if ($scope.obj.thi_id) {
        $scope.bs_type_change(3, $scope.obj.thi_id, function(){
            $scope.typeobj.fou_id = $scope.obj.fou_id-0 || '';
        });
    }

    //提示操作
    $scope.hint=false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }

    $scope.search_export = function(index){
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
      var pageConfig = {
        "createTimeStart": get_start_create_time(),
        "createTimeEnd": get_end_create_time(),
        "finished_start_time": get_finished_start_time(),
        "finished_end_time": get_finished_end_time(),
        "payment_start_time": get_payment_start_time(),
        "payment_end_time": get_payment_end_time(),
        "bs_calss_id": get_bs_calss_id(),
        "bs_calss_type": get_bs_calss_type(),
        "is_filter_test": $scope.obj.is_filter_test ? 1 : 0
      };
      var object = $.extend({}, $scope.obj, pageConfig);
      object.pgIndex = null;
      object.pgCount = null;
      object.access_token = session.accessToken;
      location.href = rootConfig.adminUrl + '/iprp_operator/api/findBsOrdersListReport?' + $.param(object)
    }
});

