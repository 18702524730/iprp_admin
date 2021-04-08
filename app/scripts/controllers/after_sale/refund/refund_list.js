angular.module('iprpAdminApp').controller('RefundListCtrl',function($scope,bsOrderService,RefundService,PaginationService,$location,$state){
    $('#refund_list').siblings().removeClass("selected");
    $('#refund_list').addClass("selected");

  // 时间控件 初始化
    $('#complete_begin_time,#complete_end_time,#begin_time,#end_time').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayBtn: true,
      todayHighlight: true,
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
    $scope.begin_time = $scope.obj.begin_time && MsecFormat($scope.obj.begin_time);
    $scope.end_time = $scope.obj.end_time && MsecFormat($scope.obj.end_time);
    $scope.complete_begin_time = $scope.obj.complete_begin_time && MsecFormat($scope.obj.complete_begin_time);
    $scope.complete_end_time = $scope.obj.complete_end_time  && MsecFormat($scope.obj.complete_end_time  );
    $scope.typeobj = {};
    init_refund_list();

    function init_refund_list() {
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        // 组装后台字段product_id值
        var get_product_id = function(){
            var ret = '';
            if ($scope.obj.fir_id) {
                ret = $scope.obj.fou_id || $scope.obj.thi_id || $scope.obj.sec_id || $scope.obj.fir_id || '';
                if(isNaN(ret)) {
                  ret = '';
                }
            }else{
                ret = $scope.typeobj.fou_id || $scope.typeobj.thi_id || $scope.typeobj.sec_id || $scope.typeobj.fir_id || '';
            }
            return ret;
        };
        // 组装后台字段type值
        var get_type = function(){
            var ret = '';
            if ($scope.obj.fir_id) {
                ret = $scope.obj.fou_id ? 4 : $scope.obj.thi_id ? 3 : $scope.obj.sec_id ? 2 : $scope.obj.fir_id ? 1 : '';
            }else{
                ret = $scope.typeobj.fou_id ? 4 : $scope.typeobj.thi_id ? 3 : $scope.typeobj.sec_id ? 2 : $scope.typeobj.fir_id ? 1 : '';
            }
            return ret;
        };

        //获取时间 begin_time
        var get_begin_time = function () {
          if (!$scope.begin_time ) {
            return ''
          } else {
            if (!$scope.obj.begin_time) {
              return new Date($scope.begin_time).getTime();
            } else {
              if (typeof $scope.obj.begin_time != 'string') {
                return new Date($scope.obj.begin_time).getTime()
              } else {
                return $scope.obj.begin_time - 0;
              }
            }
          }
        };

      //获取时间  end_time
        var get_end_time = function () {
          if(!$scope.end_time) {
            return ''
          } else {
            if(!$scope.obj.end_time) {
              return new Date($scope.end_time).getTime() + 86399000
            } else {
              if(typeof $scope.obj.end_time != 'string' ) {
                return new Date($scope.obj.end_time).getTime() ;
              } else {
                return parseInt($scope.obj.end_time,10) ;
                }
              }
            }
        };

        //获取时间 complete_begin_time
        var get_complete_begin_time = function () {
          if (!$scope.complete_begin_time ) {
            return ''
          } else {
            if (!$scope.obj.complete_begin_time) {
              return new Date($scope.complete_begin_time).getTime();
            } else {
              if (typeof $scope.obj.complete_begin_time != 'string') {
                return new Date($scope.obj.complete_begin_time).getTime()
              } else {
                return $scope.obj.complete_begin_time - 0;
              }
            }
          }
        };

        //获取时间 complete_end_time
        var get_complete_end_time = function () {
          if(!$scope.complete_end_time) {
            return ''
          } else {
            if(!$scope.obj.complete_end_time) {
              return new Date($scope.complete_end_time).getTime() + 86399000
            } else {
                if(typeof $scope.obj.complete_end_time != 'string' ) {
                  return new Date($scope.obj.complete_end_time).getTime() ;
                } else {
                  return parseInt($scope.obj.complete_end_time,10) ;
              }
            }
          }
        };


        var OweNer = function (pg_index, pg_count, cb) {
            var ret = {
                "refund_sn":$scope.obj.refund_sn === undefined ? null : $scope.obj.refund_sn,//退款申请单号
                "order_sn":$scope.obj.order_sn,//服务单号
                "user_account":$scope.obj.user_account,//客户姓名
                "begin_time": get_begin_time() ,//申请时间
                "end_time": get_end_time(),//申请时间
                "state": $scope.obj.state,//售后状态 0 退款审核中 1 已退款 2 退款已驳回
                "sp_state": $scope.obj.sp_state,//服务状态 0 待服务 1服务中
                "phone": $scope.obj.phone,//注册手机号
                "complete_begin_time": get_complete_begin_time(),//完成时间
                "complete_end_time": get_complete_end_time(),//完成时间
                "product_id": get_product_id(),//类型id
                "type": get_type(),//商品筛选类型 1一级，2 二级 3 三级
                "pg_index": pg_index,
                "pg_count": pg_count,
                "order_distribute_from": !$scope.obj.order_distribute_from ? null : $scope.obj.order_distribute_from,
                "sp_name": $scope.obj.sp_name === undefined ? null : $scope.obj.sp_name,
                "sp_code": $scope.obj.sp_code === undefined ? null : $scope.obj.sp_code,
            };
            RefundService.list(ret, cb);
            var o = $.extend({}, ret, $scope.typeobj);
            $location.path('main/after_sale_home/refund_list').search(o);
        };
        $scope.pagination = new PaginationService(OweNer, 15);

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.RefundList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.RefundList = newItems;
            //console.log($scope.RefundList);
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
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
    RefundService.productType(function(data){
        $scope.firTypeData = data;
        $scope.typeobj.fir_id = $scope.obj.fir_id-0;
    },function(error){
        //alert(error.data.msg);
    });

    //获取商品二级分类
    if ($scope.obj.fir_id) {
        $scope.bs_type_change(1, $scope.obj.fir_id, function(){
            $scope.typeobj.sec_id = $scope.obj.sec_id-0;
        });
    }

    //获取商品三级分类
    if ($scope.obj.sec_id) {
        $scope.bs_type_change(2, $scope.obj.sec_id, function(){
            $scope.typeobj.thi_id = $scope.obj.thi_id-0;
        });
    }

    //获取四级服务状态
    if ($scope.obj.thi_id) {
        $scope.bs_type_change(3, $scope.obj.thi_id, function(){
            $scope.typeobj.fou_id = $scope.obj.fou_id-0 || '';
        });
    }


    //查找
    $scope.search = function(){
      init_refund_list();
    };

  //重置
    $scope.search_reset = function () {
      $scope.obj = { };
      $scope.typeobj = {};
      $scope.begin_time = null;
      $scope.end_time = null;
      $scope.complete_begin_time = null;
      $scope.complete_end_time = null;
      init_refund_list();
    }

    /**
     * 审核
     * @param index
     */
    /*$scope.refund_check = function(index,state,audit_state){
        if(state !=1 && audit_state === 0){
            $location.path('/main/trade_home/refund_check/' + index);
        }else if(state === 1){
            $location.path('/main/trade_home/wait_refund/' + index);
        }else if(state === 0 && audit_state === 2){
            $location.path('/main/trade_home/reject_check/' + index);
        }else if(state === 2){
            $location.path('/main/trade_home/refund_check/' + index);
        }
    };*/

    $scope.refund_check = function(list){
        $location.path('/main/after_sale_home/refund_check/' + list.refund_id);
    };

    $scope.orderDetail = function(list){
        $location.path('/main/trade_home/bs_order_detail/' + list.order_sn);
    };

    //提示操作
    $scope.hint=false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});

