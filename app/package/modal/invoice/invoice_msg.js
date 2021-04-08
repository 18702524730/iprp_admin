angular.module('iprpAdminApp').controller('invoiceMsgCtrl', function ($scope,$state,order_detail,InvoiceService,type) {
    $scope.obj = {};
    $scope.details = {}
    $scope.show ={}
    $scope.subobj = {}
    $scope.err ={}
    // 添加时间控件 初始化
    var MsecFormat = function (input) {
      if(input == null || input=='' || typeof(input) == "undefined"){
        return null;
      }
      var _date = new Date(input);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      return year + "-" + month + "-" + day;
    };
    setTimeout(function(){
      $('#payment_start_time').datetimepicker({
          minView: "month", //选择日期后，不会再跳转去选择时分秒
          language:  'zh-CN',
          format: 'yyyy-mm-dd',
          todayHighlight: true,
          todayBtn:  1,
          autoclose: true
        });
        $('.datetimepicker').css('display','none');
        
        
  },0)
    console.log(order_detail)
    
    if(type==1){
      // 国内商标线上
      $scope.show.serverNo = true;
      $scope.details.orderSn = order_detail.orderSn;
      $scope.details.applyName = order_detail.applyName;
      $scope.obj.peInvocieNo = order_detail.peInvocieNo;
      $scope.obj.spInvocieNo = order_detail.spInvocieNo;
      $scope.obj.invoiceTime = order_detail.invoiceTime;
    }
    if(type==2){
      // 国内商标云表
      $scope.show.orderNo = true;
      $scope.details.orderSn = order_detail.orderNo;
      $scope.details.applyName = order_detail.applicant;
      $scope.obj.peInvocieNo = order_detail.officialFeesInvoiceNumber;
      $scope.obj.spInvocieNo = order_detail.serviceChargeInvoiceNumber;
      $scope.obj.invoiceTime = order_detail.billingDate;
      // if(order_detail.billingDate){
      //   $scope.obj.invoiceTime =MsecFormat(order_detail.billingDate);
      // }
    }
    if(type==3){
      // 国际商标
      // $scope.show.orderNo = true;
      // $scope.details.orderSn = order_detail.orderNo;
      $scope.details.applyName = order_detail.applierCn;
      $scope.obj.peInvocieNo = order_detail.officialFeesInvoiceNumber;
      $scope.obj.spInvocieNo = order_detail.serviceChargeInvoiceNumber;
      $scope.obj.invoiceTime = order_detail.billingDate;
      // if(order_detail.billingDate){
      //   $scope.obj.invoiceTime =MsecFormat(order_detail.billingDate);
      // }
    }
    if(type==4){
      // 其他商标
      $scope.show.orderNo = true;
      $scope.details.orderSn = order_detail.orderNo;
      $scope.details.applyName = order_detail.applicant;
      $scope.obj.peInvocieNo = order_detail.officialFeesInvoiceNumber;
      $scope.obj.spInvocieNo = order_detail.serviceChargeInvoiceNumber;
      $scope.obj.invoiceTime = order_detail.billingDate;
      // if(order_detail.billingDate){
      //   $scope.obj.invoiceTime =MsecFormat(order_detail.billingDate);
      // }
    }

    if(type==5){
      // 版权
      $scope.show.copyright = true;
      $scope.details.applyName = order_detail.customerName;
      $scope.obj.peInvocieNo = order_detail.officialFeesNo;
      $scope.obj.spInvocieNo = order_detail.serviceMoneyNo;
      $scope.obj.invoiceTime = order_detail.billingDate;
      // if(order_detail.billingDate){
      //   $scope.obj.invoiceTime =MsecFormat(order_detail.billingDate);
      // }
      // $scope.show.serverNo = true;
    }
    if($scope.obj.invoiceTime){
      $scope.invoiceTime = $scope.obj.invoiceTime && MsecFormat($scope.obj.invoiceTime);
    }
      //前面赋值后重置，避免时间获取潜在bug
        // $scope.createTimeStart = null;
      
      
      //获取时间 start_create_time
      var stamp = function (day) {
        if(day){
          return new Date(day).getTime();
        }else{
          return null
        }
          
        
        // if (!$scope.createTimeStart ) {
        //   return null
        // } else {
        //   if (!$scope.obj.invoiceTime) {
        //     return new Date($scope.createTimeStart).getTime();
        //   } else {
        //     if (typeof $scope.obj.invoiceTime != 'string') {
        //       return new Date($scope.obj.invoiceTime).getTime()
        //     } else {
        //       return $scope.obj.invoiceTime - 0;
        //     }
        //   }
        // }
      };
      
    $scope.save = function(){
      // $scope.subobj.invoiceTime = get_start_create_time()
      if(type==1){
            $scope.subobj.invoiceTime = stamp($scope.obj.invoiceTime)
            $scope.subobj.orderSn = order_detail.orderSn;
            $scope.subobj.peInvocieNo = $scope.obj.peInvocieNo;
            $scope.subobj.spInvocieNo = $scope.obj.spInvocieNo;
            if(!$scope.subobj.peInvocieNo){
              // alert('请填写官费票号')
              $scope.err.nogf = '请填写官费票号'
              return
            }
            if(!$scope.subobj.invoiceTime){
              $scope.err.noday = '请选择开票时间'
              // alert('请选择开票时间')
              return
            }

        InvoiceService.invoice.editOnlineOrderInvoice($scope.subobj,function(data){
          // $scope.cancel();
          // $state.reload()
          $scope.$close('success')
          layer.msg('操作成功');
          
        },function(err){
          alert(err.data.msg||'操作失败')
        })
      }
      if(type==2){
        $scope.subobj.billingDate = stamp($scope.obj.invoiceTime);
        $scope.subobj.id = order_detail.id;
        $scope.subobj.officialFeesInvoiceNumber =$scope.obj.peInvocieNo;
        $scope.subobj.serviceChargeInvoiceNumber = $scope.obj.spInvocieNo;
        if(!$scope.subobj.officialFeesInvoiceNumber){
          // alert('请填写官费票号')
          $scope.err.nogf = '请填写官费票号'
          return
        }
        if(!$scope.subobj.billingDate){
          $scope.err.noday = '请选择开票时间'
          // alert('请选择开票时间')
          return
        }
        // if(!$scope.subobj.officialFeesInvoiceNumber){
        //   alert('请填写官费票号')
        //   return
        // }
        // if(!$scope.subobj.billingDate){
        //   alert('请选择开票时间')
        //   return
        // }
        InvoiceService.invoice.createTradeMark($scope.subobj,function(data){
          // $scope.cancel();
          // $state.reload()
          $scope.$close('success')
          layer.msg('操作成功');
        },function(err){
          alert(err.data.msg||'操作失败')
        })
      }
      if(type==3){
        $scope.subobj.billingDate = stamp($scope.obj.invoiceTime);
        $scope.subobj.id = order_detail.id;
        $scope.subobj.officialFeesInvoiceNumber =$scope.obj.peInvocieNo;
        $scope.subobj.serviceChargeInvoiceNumber = $scope.obj.spInvocieNo;
        if(!$scope.subobj.officialFeesInvoiceNumber){
          // alert('请填写官费票号')
          $scope.err.nogf = '请填写官费票号'
          return
        }
        if(!$scope.subobj.billingDate){
          $scope.err.noday = '请选择开票时间'
          // alert('请选择开票时间')
          return
        }
        InvoiceService.invoice.createTrademarkInternational($scope.subobj,function(data){
          // $scope.cancel();
          // $state.reload()
          $scope.$close('success')
          layer.msg('操作成功');
        },function(err){
          alert(err.data.msg||'操作失败')
        })
      }
      if(type==4){
        $scope.subobj.billingDate = stamp($scope.obj.invoiceTime);
        $scope.subobj.id = order_detail.id;
        $scope.subobj.officialFeesInvoiceNumber =$scope.obj.peInvocieNo;
        $scope.subobj.serviceChargeInvoiceNumber = $scope.obj.spInvocieNo;
        if(!$scope.subobj.officialFeesInvoiceNumber){
          // alert('请填写官费票号')
          $scope.err.nogf = '请填写官费票号'
          return
        }
        if(!$scope.subobj.billingDate){
          $scope.err.noday = '请选择开票时间'
          // alert('请选择开票时间')
          return
        }
        InvoiceService.invoice.createTradeMarkOther($scope.subobj,function(data){
          // $scope.cancel();
          // $state.reload()
          $scope.$close('success')
          layer.msg('操作成功');
        },function(err){
          alert(err.data.msg||'操作失败')
        })
      }
      if(type==5){
        $scope.subobj.billingDate = stamp($scope.obj.invoiceTime);
        $scope.subobj.id = order_detail.id;
        $scope.subobj.officialFeesNo =$scope.obj.peInvocieNo;
        $scope.subobj.serviceMoneyNo = $scope.obj.spInvocieNo;
        if(!$scope.subobj.officialFeesNo){
          // alert('请填写官费票号')
          $scope.err.nogf = '请填写官费票号'
          return
        }
        if(!$scope.subobj.billingDate){
          $scope.err.noday = '请选择开票时间'
          // alert('请选择开票时间')
          return
        }
        InvoiceService.invoice.createSoftWare($scope.subobj,function(data){
          // $scope.cancel();
          // $state.reload()
          $scope.$close('success')
          layer.msg('操作成功');
        },function(err){
          alert(err.data.msg||'操作失败')
        })
      }
    };
    $scope.cancel = function () {
      $scope.obj = {}
      $scope.err = {}
        $scope.$dismiss("cancel");
    };
    
});