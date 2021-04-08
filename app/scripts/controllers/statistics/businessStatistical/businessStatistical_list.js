angular.module('iprpAdminApp').controller('BusinessStatisticalListCtrl',function($scope,bsOrderService,orderService,PaginationService,$location,$state,session){
    $('#businessStatistical_list').parent().siblings().children('a').removeClass("selected");
    $('#businessStatistical_list').addClass("selected");

  // 添加时间控件 初始化
    $('#businesspay_start_time,#businesspay_end_time').datetimepicker({
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
    $scope.paymentStartTime = $scope.obj.paymentStartTime && MsecFormat($scope.obj.paymentStartTime);
    $scope.paymentEndTime = $scope.obj.paymentEndTime && MsecFormat($scope.obj.paymentEndTime);

    //前面赋值后重置，避免时间获取潜在bug
	  $scope.obj.paymentStartTime = null;
	  $scope.obj.paymentEndTime = null;

    // 组装后台字段bs_calss_id值
    var get_bs_calss_id = function(){
        var ret = null;
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
            ret = $scope.obj.fou_id ? 4 : $scope.obj.thi_id ? 3 : $scope.obj.sec_id ? 2 : $scope.obj.fir_id ? 1 : null
        }else{
            ret = $scope.typeobj.fou_id ? 4 : $scope.typeobj.thi_id ? 3 : $scope.typeobj.sec_id ? 2 : $scope.typeobj.fir_id ? 1 : null
        }
        return ret;
    };

    //获取时间 start_create_time
    var get_start_create_time = function () {
      if (!$scope.paymentStartTime ) {
        return null
      } else {
        if (!$scope.obj.paymentStartTime) {
          return new Date($scope.paymentStartTime).getTime();
        } else {
          if (typeof $scope.obj.paymentStartTime != 'string') {
            return new Date($scope.obj.paymentStartTime).getTime()
          } else {
            return $scope.obj.paymentStartTime - 0;
          }
        }
      }
    };
    //获取时间  end_create_time
    var get_end_create_time = function () {
      if(!$scope.paymentEndTime) {
        return null
      } else {
        if(!$scope.obj.paymentEndTime) {
          return new Date($scope.paymentEndTime).getTime() + 86399000
        } else {
          if(typeof $scope.obj.paymentEndTime != 'string' ) {
            return new Date($scope.obj.paymentEndTime).getTime() ;
          } else {
            return parseInt($scope.obj.paymentEndTime,10) ;
          }
        }
      }
    };

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
        

        var OweNer = function (pg_index, pg_count, cb) {
            var pageConfig = {
                "pgIndex": pg_index,
                "pgCount": pg_count,
                "paymentStartTime": get_start_create_time(),
                "paymentEndTime": get_end_create_time(),
                "bsClassId": get_bs_calss_id(),
                "bsClassType": get_bs_calss_type(),
            };
            var object = $.extend({}, $scope.obj, pageConfig);
            orderService.businessTongjiList(object, cb);
            var o = $.extend({}, object, $scope.typeobj);
            $location.search(o).replace();
            // $location.path('main/trade_home/bs_order_list').search(o);
        };
        $scope.pagination = new PaginationService(OweNer, 15,1);

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
      $scope.typeobj = {};
      $scope.paymentStartTime = null;
      $scope.paymentEndTime = null;
      init_order_list();
    }

    /**
     * 查看订单详情
     * @param index
     */
    $scope.detail_orders = function(index){
        $location.path('main/trade_home/partner_bs_order_detail/' + index);
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
                  $scope.typeobj.fou_id=null;
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
                        $scope.typeobj.sec_id=null;
                        $scope.typeobj.thi_id=null;
                        $scope.typeobj.fou_id=null;
                        $scope['thiTypeData']=[];
                        $scope['fouTypeData']=[];
                    }
                }else if(type == 2){
                    $scope['thiTypeData'] = data;
                    if (callback) {
                        callback();
                    }else{
                        $scope.typeobj.thi_id=null;
                        $scope.typeobj.fou_id=null;
                        $scope['fouTypeData']=[];
                    }
                }
            },function(error){
                alert(error.data.msg);
            })
          }
        }else{
            if (type == 1) {
                $scope.typeobj.sec_id=null;
                $scope.typeobj.thi_id=null;
                $scope.typeobj.fou_id=null;
                $scope['secTypeData']=[];
                $scope['thiTypeData']=[];
                $scope['fouTypeData']=[];
            }else if(type == 2){
                $scope.typeobj.thi_id=null;
                $scope.typeobj.fou_id=null;
                $scope['thiTypeData']=[];
                $scope['fouTypeData']=[];
            }else if(type == 3){
                $scope.typeobj.fou_id=null;
                $scope['fouTypeData']=[];
            }
        }
    }

    //获取商品一级分类
    bsOrderService.productType(function(data){
        $scope.firTypeData = data;
        $scope.typeobj.fir_id = $scope.obj.fir_id-0 || null;
    },function(error){
        alert(error.data.msg);
    });

    //获取商品二级分类
    if ($scope.obj.fir_id) {
        $scope.bs_type_change(1, $scope.obj.fir_id, function(){
            $scope.typeobj.sec_id = $scope.obj.sec_id-0 || null;
        });
    }

    //获取商品三级分类
    if ($scope.obj.sec_id) {
        $scope.bs_type_change(2, $scope.obj.sec_id, function(){
            $scope.typeobj.thi_id = $scope.obj.thi_id-0 || null;
        });
    }

    //获取四级服务状态
    if ($scope.obj.thi_id) {
        $scope.bs_type_change(3, $scope.obj.thi_id, function(){
            $scope.typeobj.fou_id = $scope.obj.fou_id-0 || null;
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
        "paymentStartTime": get_start_create_time(),
        "paymentEndTime": get_end_create_time(),
        "bsClassId": get_bs_calss_id(),
        "bsClassType": get_bs_calss_type(),
      };
      var object = $.extend({}, $scope.obj, pageConfig);
      object.pgIndex = null;
      object.pgCount = null;
      object.access_token = session.accessToken;
      location.href = rootConfig.adminUrl + '/iprp_operator/api/exportBusinessAmountStatisticList?' + $.param(object)
    }
});

