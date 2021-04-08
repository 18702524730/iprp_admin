angular.module('iprpAdminApp').controller('CWOrderListCtrl',function($scope,bsOrderService,ChannelService,PaginationService,$location,$state,session){
    $('#channel_work_order').addClass("selected").parent().siblings().children('a').removeClass("selected");

  // 添加时间控件 初始化
    $('#createTimeStart,#createTimeEnd,#payment_start_time,#payment_end_time,#finished_start_time,#finished_end_time').datetimepicker({
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
    
    // $scope.buyer_mobile = null;
    // $scope.buyer_email = null;
    $scope.orderOriginIds = null;
    $scope. custPlatformIds = null;
    $scope.createTimeStart = $scope.obj.createTimeStart && MsecFormat($scope.obj.createTimeStart);
    $scope.createTimeEnd = $scope.obj.createTimeEnd && MsecFormat($scope.obj.createTimeEnd);
    // $scope.finished_start_time = $scope.obj.finished_start_time && MsecFormat($scope.obj.finished_start_time);
    // $scope.finished_end_time = $scope.obj.finished_end_time  && MsecFormat($scope.obj.finished_end_time);
    // $scope.payment_start_time = $scope.obj.payment_start_time && MsecFormat($scope.obj.payment_start_time);
    // $scope.payment_end_time = $scope.obj.payment_end_time && MsecFormat($scope.obj.payment_end_time);
    // $scope.obj.is_filter_test = $scope.obj.is_filter_test == '1' ? true : false;
    //前面赋值后重置，避免时间获取潜在bug
	  $scope.obj.createTimeStart = null;
	  $scope.obj.createTimeEnd = null;
	  // $scope.obj.finished_start_time = null;
	  // $scope.obj.finished_end_time = null;
	  // $scope.obj.payment_start_time = null;
    // $scope.obj.payment_end_time = null;
    // var result  = [];
    // var results = [];
    // $scope.selectinit = function(){
    //   $(".multipenav input").prop("checked", false);
    //   $("#classification").children("#initial").append("请选择");
    //   $(".multipenav_1st").click(function () {
    //       $(".multipenav,.multipenav_close").toggle();
    //   });
    //   $(".multipenav_close").click(function () {
    //       $(".multipenav,.multipenav_close").hide();
    //   });
    // }
    // $scope.selectinits = function(){
    //   $(".multipenavs input").prop("checked", false);
    //   $("#classifications").children("#initials").append("请选择");
    //   $(".multipenav_1sts").click(function () {
    //       $(".multipenavs,.multipenav_closes").toggle();
    //   });
    //   $(".multipenav_closes").click(function () {
    //       $(".multipenavs,.multipenav_closes").hide();
    //   });
    // }
    // $scope.selectinit();
    // $scope.selectinits();
    // $scope.willselect = function(index,item){
    //   var checked1 = $('.li-input:nth('+index+')').prop("checked");
    //     var theid = item.id
    //     var theindex = result.indexOf(theid);
    //     if (checked1 == false) {
    //         $("#classification").children("#initial").remove();
    //         $('.li-input:nth('+index+')').prop("checked", true);
    //         result.push(theid)
    //         $("#classification").append("<span id='" + (item.id) + "'>" + (item.name + "，") + "</span>");
    //             console.log(result)
    //     } else {
    //       $('.li-input:nth('+index+')').prop("checked", false); 
    //         if(theindex>-1){
    //             result.splice(theindex,1)
    //         }
    //         $("#classification").children("#" + (item.id)).remove();
    //         var length = $("#classification").html().length
    //         if (length === 0) {
    //             $("#classification").append("<span id='initial'>请选择</span>");
    //         }
    //         console.log(result)
    //     }
    // }
    // $scope.willselects = function(index,item){
    //   var checked1 = $('.li-inputs:nth('+index+')').prop("checked");
    //     var theid = item.id
    //     if (checked1 == false) {
    //         $("#classifications").children("#initials").remove();
    //         $('.li-inputs:nth('+index+')').prop("checked", true);
    //         results.push(theid)
    //         $("#classifications").append("<span id='" + (item.id) + "'>" + (item.name + "，") + "</span>");
    //             console.log(results)
    //     } else {
    //       $('.li-inputs:nth('+index+')').prop("checked", false);
    //         var theindex = results.indexOf(theid);
    //         if(theindex>-1){
    //             results.splice(theindex,1)
    //         }
            
    //         $("#classifications").children("#" + (item.id)).remove();
    //         var length = $("#classifications").html().length
    //         if (length === 0) {
    //             $("#classifications").append("<span id='initials'>请选择</span>");
    //         }
    //         console.log(results)
    //     }
    // }
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

    //获取时间 finished_start_time
    // var get_finished_start_time = function () {
    //   if (!$scope.finished_start_time ) {
    //     return ''
    //   } else {
    //     if (!$scope.obj.finished_start_time) {
    //       return new Date($scope.finished_start_time).getTime();
    //     } else {
    //       if (typeof $scope.obj.finished_start_time != 'string') {
    //         return new Date($scope.obj.finished_start_time).getTime()
    //       } else {
    //         return $scope.obj.finished_start_time - 0;
    //       }
    //     }
    //   }
    // };

    //获取时间  finished_end_time
    // var get_finished_end_time = function () {
    //   if(!$scope.finished_end_time) {
    //     return ''
    //   } else {
    //     if(!$scope.obj.finished_end_time) {
    //       return new Date($scope.finished_end_time).getTime() + 86399000
    //     } else {
    //       if(typeof $scope.obj.finished_end_time != 'string' ) {
    //         return new Date($scope.obj.finished_end_time).getTime() ;
    //       } else {
    //         return parseInt($scope.obj.finished_end_time,10) ;
    //       }
    //     }
    //   }
    // };

    //获取时间 payment_start_time
    // var get_payment_start_time = function () {
    //   if (!$scope.payment_start_time ) {
    //     return ''
    //   } else {
    //     if (!$scope.obj.payment_start_time) {
    //       return new Date($scope.payment_start_time).getTime();
    //     } else {
    //       if (typeof $scope.obj.payment_start_time != 'string') {
    //         return new Date($scope.obj.payment_start_time).getTime()
    //       } else {
    //         return $scope.obj.payment_start_time - 0;
    //       }
    //     }
    //   }
    // };

    //获取时间 payment_end_time
    // var get_payment_end_time = function () {
    //   if(!$scope.payment_end_time) {
    //     return ''
    //   } else {
    //     if(!$scope.obj.payment_end_time) {
    //       return new Date($scope.payment_end_time).getTime() + 86399000
    //     } else {
    //       if(typeof $scope.obj.payment_end_time != 'string' ) {
    //         return new Date($scope.obj.payment_end_time).getTime() ;
    //       } else {
    //         return parseInt($scope.obj.payment_end_time,10) ;
    //       }
    //     }
    //   }
    // };

    init_order_list();
    function init_order_list() {
        
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        // if(!!$scope.obj.account_number){
        //     if($scope.obj.account_number.indexOf('@') === -1){
        //         $scope.buyer_mobile = $scope.obj.account_number;
        //     }else{
        //         $scope.buyer_email = $scope.obj.account_number;
        //     }
        // }else{
        //     $scope.buyer_mobile = null;
        //     $scope.buyer_email = null;
        // }
        var OweNer = function (pg_index, pg_count, cb) {
            var pageConfig = {
                "pgIndex": pg_index,
                "pgCount": pg_count,
                "createTimeStart": get_start_create_time(),
                "createTimeEnd": get_end_create_time(),
                "orderOriginIds[0]": $scope.orderOriginIds,
                "custPlatformIds[0]": $scope. custPlatformIds,
                // "finished_start_time": get_finished_start_time(),
                // "finished_end_time": get_finished_end_time(),
                // "payment_start_time": get_payment_start_time(),
                // "payment_end_time": get_payment_end_time(),
                // "bs_calss_id": get_bs_calss_id(),
                // "bs_calss_type": get_bs_calss_type(),
                // "is_filter_test": $scope.obj.is_filter_test ? 1 : 0
            };
            // var orobj = {}
            // if(result.length>0){
            //   for(var i=0;i<result.length;i++){
            //     orobj['orderOriginIds['+i+']'] = result[i]
            //   }
            // }
            // var pltobj = {}
            // if(results.length>0){
            //   for(var j=0;j<results.length;j++){
            //     pltobj['custPlatformIds['+j+']'] = results[j]
            //   }
            // }
            // console.log(result,results)
            var object = $.extend({}, $scope.obj, pageConfig);
            bsOrderService.channelWorkOrderList(object, cb);
            var o = $.extend({}, object);
            $location.path('main/trade_home/channel_work_order').search(o);
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
      // $("#classification").html('');
      // $(".multipenav input").prop("checked", false);
      // $("#classification").append("<span id='initial'>请选择</span>");
      // $("#classifications").html('');
      // $(".multipenavs input").prop("checked", false);
      // $("#classifications").append("<span id='initials'>请选择</span>");
      $scope.obj = {};
      $scope.orderOriginIds = null;
      $scope.custPlatformIds = null;
      $scope.createTimeStart = null;
      $scope.createTimeEnd = null;
      // result =[];
      // results=[];
      // $scope.finished_start_time = null;
      // $scope.finished_end_time = null;
      // $scope.payment_start_time = null;
      // $scope.payment_end_time = null;
      init_order_list();
    }

    /**
     * 查看订单详情
     * @param index
     */
    $scope.detail_orders = function(index){
        $location.path('main/trade_home/work_order_detail/' + index);
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
    var openNum = localStorage.getItem('isopen')
    if(openNum==1){
      $('.commontipsdo').css({'display':'block'})
    }
    setTimeout(function(){
      $('.commontipsdo').css({'opacity':0,'display':'none'})
    },5000)
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
        "start_create_time": get_start_create_time(),
        "end_create_time": get_end_create_time(),
        "finished_start_time": get_finished_start_time(),
        "finished_end_time": get_finished_end_time(),
        "payment_start_time": get_payment_start_time(),
        "payment_end_time": get_payment_end_time(),
        "bs_calss_id": get_bs_calss_id(),
        "bs_calss_type": get_bs_calss_type(),
        "is_filter_test": $scope.obj.is_filter_test ? 1 : 0
      };
      var object = $.extend({}, $scope.obj, pageConfig);
      object.pg_index = null;
      object.pg_count = null;
      object.access_token = session.accessToken;
      location.href = rootConfig.adminUrl + '/iprp_operator/api/findBsOrdersListReport?' + $.param(object)
    }
});

