angular.module('iprpAdminApp').controller('BhListCtrl',function($scope,ipService,ChannelService,PaginationService,$location,$state, session, $modal){
  $('#protect_list').addClass("selected").parent().siblings().children().removeClass("selected");

  var jdstate = ''
  var fwNumber = ''
  var fwlxrName = ''
  var fwlxrPhone = ''
  var fwbusinessType = ''
  var ProtectListData = ''
  var pagination = {
    totalCount:''
  }
  function ipProtectList (){
    console.log(2)
    $.ajax({
      url: rootConfigNew.adminUrl + '/iprp_operator/api/ipprotect/ipProtectList',
      type: 'GET',
      async: true,
      dataType: 'json',
      headers:{'Authorization':getCookie('user_token')},
      data: {
        'access_token':getCookie('user_token'),
        'state':jdstate,		//状态，1:待受理，2：服务中，3：服务完成，4：不予受理，,K-V传值
        'pgIndex':1,		//页码,K-V传值
        'pgCount':15,		//每页行数,K-V传值
        'businessSn':fwNumber,		//服务编号,K-V传值
        'lxrName':fwlxrName,		//联系人,K-V传值
        'lxrPhone':fwlxrPhone,		//联系人电话,K-V传值
        'businessType':fwbusinessType		//业务类型，1：跨平台电商保护，2：侵权监测，3：侵权判定，4：质量抽检/鉴定/召回，5：行政/刑事，6：海关保护，7：法律服务，8：授权许可
      },
      success: function(res) {
        ProtectListData = res
        pagination.totalCount = res.totalElements
        $(".j-tr-color").empty()
        res.elements.forEach(element => {
          console.log(element.seqNo)
        $(".j-tr-color").append(
          '<tr class="" class="hover">'+
            '<td class="align-center">'+element.seqNo+'</td>'+
            '<td class="align-center">'+element.businessSn+'</td>'+
            '<td class="align-center">'+(element.businessType==1?"跨平台电商保护":element.businessType==2?"侵权监测":element.businessType==3?"侵权判定":element.businessType==4?"质量抽检/鉴定/召回":element.businessType==5?"行政/刑事":element.businessType==6?"海关保护":element.businessType==7?"法律服务":element.businessType==8?"授权许可":"")+'</td>'+
            '<td class="align-center">'+MsecFormat(element.createTime)+'</td>'+
            '<td class="align-center">'+element.lxrName+'</td>'+
            '<td class="align-center">'+element.lxrPhone+'</td>'+
            '<td class="align-center">'+(element.state==1?'待受理':element.state==2?'服务中':element.state==3?'服务完成':element.state==4?'不予受理':'')+'</td>'+
            '<td class="align-center w120">'+
              '<a href="JavaScript:void(0);" class="'+ (element.state==1?'dishide':'') +'">审核</a> '+
              // '<a href="JavaScript:void(0);">结案备注</a>'+
              '<a href="JavaScript:void(0);">详情</a>'+
            '</td>'+
          '</tr>'
        )
        });
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }
  // $('.j-query').click(function(){
  //   ipProtectList()
  // })
  function resetFn(){
    jdstate = ''
    fwNumber = ''
    fwlxrName = ''
    fwlxrPhone = ''
    fwbusinessType = ''
    $(".j-fwstate").val('')
    $(".j-fwNumber").val('')
    $(".j-fwlxrName").val('')
    $(".j-lxrPhone").val('')
    $(".j-fwbusinessType").val('')
  }
  $(".j-reset").click(function(){
    resetFn()
  })
  function getCookie(name){		//获取cookie
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
  }
  $(".j-fwstate").on("change",function(){
    jdstate = $(this).val()
  })
  $(".j-fwNumber").on('input',function(){
    fwNumber = $(this).val()
  })
  $(".j-fwlxrName").on("input",function(){
    fwlxrName = $(this).val()
  })
  $(".j-lxrPhone").on("input",function(){
    fwlxrPhone = $(this).val()
  })
  $(".j-fwbusinessType").on("change",function(){
    fwbusinessType = $(this).val()
  })










  // 添加时间控件 初始化
  $('#startTime,#endTime').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose:  true
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
  $scope.startTime = $scope.obj.startTime && MsecFormat($scope.obj.startTime);
  $scope.endTime = $scope.obj.endTime && MsecFormat($scope.obj.endTime );
  $scope.obj.is_filter_test = $scope.obj.is_filter_test == '1' ? true : false;

  //前面赋值后重置，避免时间获取潜在bug
  $scope.obj.startTime = null;
  $scope.obj.endTime = null;


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


  //获取时间 startTime
  var get_startTime = function () {
    if (!$scope.startTime ) {
      return ''
    } else {
      if (!$scope.obj.startTime) {
        return new Date($scope.startTime).getTime();
      } else {
        if (typeof $scope.obj.startTime != 'string') {
          return new Date($scope.obj.startTime).getTime()
        } else {
          return $scope.obj.startTime - 0;
        }
      }
    }
  };

  //获取时间  endTime
  var get_endTime = function () {
    if(!$scope.endTime) {
      return ''
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


  init_order_list();

  function init_order_list() {
      console.log("ip")
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

      var OweNer = function (pgIndex, pgCount, cb) {
          var pageConfig = {
            'access_token':getCookie('user_token'),
            'state':jdstate,		//状态，1:待受理，2：服务中，3：服务完成，4：不予受理，,K-V传值
            'pgIndex':pgIndex,		//页码,K-V传值
            'pgCount':pgCount,		//每页行数,K-V传值
            'businessSn':fwNumber,		//服务编号,K-V传值
            'lxrName':fwlxrName,		//联系人,K-V传值
            'lxrPhone':fwlxrPhone,		//联系人电话,K-V传值
            'businessType':fwbusinessType		//业务类型，1：跨平台电商保护，2：侵权监测，3：侵权判定，4：质量抽检/鉴定/召回，5：行政/刑事，6：海关保护，7：法律服务，8：授权许可
          };
          // var pageConfig = {
          //     stereoProtectType: 1, //1,电商侵权投诉；2,电商维权申诉,3;质量抽检鉴定;4,海关知产保护
          //     "pgIndex": pgIndex,
          //     "pgCount": pgCount,
          //     "startTime": get_startTime (),
          //     "endTime": get_endTime (),
          // };
          var object = $.extend({}, $scope.obj, pageConfig);
          //console.log($scope.obj)
          $location.path('main/ip_protect_home/protect_list').search(object);
          ipService.ipProtectList(object, cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15, 1, true);

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
    console.log('查询')
      init_order_list();
  }

  $scope.search_reset = function () {
      $scope.obj = { };
      $scope.startTime = null;
      $scope.endTime = null;
      $scope.payment_start_time = null;
      $scope.payment_end_time = null;
      init_order_list();
  }

  /**
   * 查看订单详情
   * @param index
   */
  $scope.detail_orders = function(index){
      $location.path('main/ip_protect_home/protect_detail/' + index);
  }


  // 受理弹窗
  $scope.checkFn = function(businessSn){
    $modal.open({
        resolve:{
          businessSn : function(){
              return businessSn;
          }
        },
        templateUrl: 'package\\modal\\ip_bhrect\\check.html',
        controller: 'BhipProtectCheckCtrl'
    }).result.then(function (result) {
        $scope.search_order();
    });
  };

  // 结案反馈
  $scope.feedbackFn = function(businessSn){
    $modal.open({
        resolve:{
          businessSn : function(){
              return businessSn;
          }
        },
        templateUrl: 'package\\modal\\ip_bhrect\\report.html',
        controller: 'BhipProtectOrderReportCtrl'
    }).result.then(function (result) {
        $scope.search_order();
    });
  };

  //提示操作
  $scope.hint=false;
  $scope.hints = function(){
      $scope.hint = !$scope.hint;
  }
  $scope.accept = function(){
  	var str = '<p class="contact">'+item.contactName+ (item.sex ? ('/'+ (item.sex==1 ? '先生' : '女士')) : '') + ((item.contactName || item.sex) ? '<br>' : '' )+ '<span>'+item.contactPhone.slice(0,3)+'-'+item.contactPhone.slice(3,7)+'-'+item.contactPhone.slice(7)+'</span></p>';
    layer.alert('',{
      title:'操作',
      type: 0,
      shadeClose:true,
      content: str,
      btn: ''
    }, function(index){
      layer.close(index);
    });
  }
  $scope.upload = function(){
  	var str = '<p class="contact">'+item.contactName+ (item.sex ? ('/'+ (item.sex==1 ? '先生' : '女士')) : '') + ((item.contactName || item.sex) ? '<br>' : '' )+ '<span>'+item.contactPhone.slice(0,3)+'-'+item.contactPhone.slice(3,7)+'-'+item.contactPhone.slice(7)+'</span></p>';
    layer.alert('',{
      title:'操作',
      type: 0,
      shadeClose:true,
      content: str,
      btn: ''
    }, function(index){
      layer.close(index);
    });
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
      "startTime": get_startTime (),
      "endTime": get_endTime (),
      "payment_start_time": get_payment_start_time (),
      "payment_end_time": get_payment_end_time (),
      "is_filter_test": $scope.obj.is_filter_test ? 1 : 0
    };
    var object = $.extend({}, $scope.obj, pageConfig);
    object.pgIndex = null;
    object.pgCount = null;
    object.access_token = session.accessToken;
  	location.href = rootConfig.adminUrl + '/iprp_operator/api/findOrdersListReport?' + $.param(object)
  }
});

