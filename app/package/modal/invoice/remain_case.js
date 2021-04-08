angular.module('iprpAdminApp').controller('remainCaseCtrl', function ($scope,$state,order_detail,InvoiceService,type) {
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
      $('#firstinvoice_time,#secinvoice_time,#lastinvoice_time,#invoice_timea,#invoice_timeb,#invoice_timec,#invoice_timed,#invoice_timee,#invoice_timef,#invoice_timeg,#invoice_timeh').datetimepicker({
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
      // 科技项目
      $scope.show.type = 1;
      $scope.details.orderSn = order_detail.customerName;
      if(order_detail.preInvoiceDate){
        $scope.obj.firstinvoice_time =MsecFormat(order_detail.preInvoiceDate);
      }
      if(order_detail.secondInvoiceDate){
        $scope.obj.secinvoice_time =MsecFormat(order_detail.secondInvoiceDate);
      }
      if(order_detail.lastInvoiceDate){
        $scope.obj.lastinvoice_time =MsecFormat(order_detail.lastInvoiceDate);
      }
      $scope.obj.preInvoiceNo = order_detail.preInvoiceNo;
      $scope.obj.secondInvoiceNo = order_detail.secondInvoiceNo;
      $scope.obj.lastInvoiceNo = order_detail.lastInvoiceNo;
    }
    if(type==2){
      // 专利许可
      $scope.show.type = 2;
      $scope.details.orderSn = order_detail.companyName;
      $scope.obj.invoiceNum = order_detail.invoiceNum;
    }
    if(type==3){
      // 遗留案件
      $scope.show.type = 3;
      $scope.details.orderSn = order_detail.ext35;
      $scope.obj.invoice_timea = MsecFormat(order_detail.ext41);
      $scope.obj.invoice_timeb = MsecFormat(order_detail.ext65);
      $scope.obj.invoice_timec = MsecFormat(order_detail.ext86);
      $scope.obj.invoice_timed = MsecFormat(order_detail.ext100);
      $scope.obj.invoice_timee = MsecFormat(order_detail.ext109);
      $scope.obj.invoice_timef = MsecFormat(order_detail.ext118);
      $scope.obj.invoice_timeg = MsecFormat(order_detail.ext127);
      $scope.obj.invoice_timeh = MsecFormat(order_detail.ext135);

      $scope.obj.guanfeea = order_detail.ext39;
      $scope.obj.guanfeeb = order_detail.ext63;
      $scope.obj.guanfeec = order_detail.ext84;
      $scope.obj.guanfeed = order_detail.ext98;
      $scope.obj.guanfeee = order_detail.ext107;
      $scope.obj.guanfeef = order_detail.ext116;
      $scope.obj.guanfeeg = order_detail.ext125;
      $scope.obj.guanfeeh = order_detail.ext133;
      $scope.obj.guanfeei = order_detail.ext142;
      $scope.obj.guanfeej = order_detail.ext146;
      $scope.obj.guanfeek = order_detail.ext150;

      $scope.obj.fuwufeea = order_detail.ext40;
      $scope.obj.fuwufeeb = order_detail.ext64;
      $scope.obj.fuwufeec = order_detail.ext85;
      $scope.obj.fuwufeed = order_detail.ext99;
      $scope.obj.fuwufeee = order_detail.ext108;
      $scope.obj.fuwufeef = order_detail.ext117;
      $scope.obj.fuwufeeg = order_detail.ext126;
      $scope.obj.fuwufeeh = order_detail.ext134;
      $scope.obj.fuwufeei = order_detail.ext143;
      $scope.obj.fuwufeej = order_detail.ext147;
      $scope.obj.fuwufeek = order_detail.ext151;
      // if(order_detail.billingDate){
      //   $scope.obj.invoiceTime =MsecFormat(order_detail.billingDate);
      // }
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
            $scope.subobj.preInvoiceDate = stamp($scope.obj.firstinvoice_time)
            $scope.subobj.preInvoiceNo = $scope.obj.preInvoiceNo;
            $scope.subobj.secondInvoiceDate = stamp($scope.obj.secinvoice_time)
            $scope.subobj.secondInvoiceNo = $scope.obj.secondInvoiceNo;
            $scope.subobj.lastInvoiceDate = stamp($scope.obj.lastinvoice_time)
            $scope.subobj.lastInvoiceNo = $scope.obj.lastInvoiceNo;
            $scope.subobj.id = order_detail.id

        InvoiceService.invoice.createTech($scope.subobj,function(data){
          // $scope.cancel();
          // $state.reload()
          $scope.$close('success')
          layer.msg('操作成功');
          
        },function(err){
          alert(err.data.msg||'操作失败')
        })
      }
      if(type==2){
        $scope.subobj.id = order_detail.id;
        $scope.subobj.invoiceNum =$scope.obj.invoiceNum;
        // if(!$scope.subobj.invoiceNum){
        //   layer.msg('请输入发票号码');
        //   return
        // }
        InvoiceService.invoice.createPatentBook($scope.subobj,function(data){
          // $scope.cancel();
          // $state.reload()
          $scope.$close('success')
          layer.msg('操作成功');
        },function(err){
          alert(err.data.msg||'操作失败')
        })
      }
      if(type==3){
        $scope.subobj.dataUniqueNumber = order_detail.dataUniqueNumber;
        $scope.subobj.ext41  = MsecFormat($scope.obj.invoice_timea);
        $scope.subobj.ext65  = MsecFormat($scope.obj.invoice_timeb);
        $scope.subobj.ext86  = MsecFormat($scope.obj.invoice_timec);
        $scope.subobj.ext100  = MsecFormat($scope.obj.invoice_timed);
        $scope.subobj.ext109  = MsecFormat($scope.obj.invoice_timee);
        $scope.subobj.ext118  = MsecFormat($scope.obj.invoice_timef);
        $scope.subobj.ext127  = MsecFormat($scope.obj.invoice_timeg);
        $scope.subobj.ext135  = MsecFormat($scope.obj.invoice_timeh);

        $scope.subobj.ext39  = $scope.obj.guanfeea;
        $scope.subobj.ext63  = $scope.obj.guanfeeb;
        $scope.subobj.ext84  = $scope.obj.guanfeec;
        $scope.subobj.ext98  = $scope.obj.guanfeed;
        $scope.subobj.ext107  = $scope.obj.guanfeee;
        $scope.subobj.ext116  = $scope.obj.guanfeef;
        $scope.subobj.ext125  = $scope.obj.guanfeeg;
        $scope.subobj.ext133  = $scope.obj.guanfeeh;
        $scope.subobj.ext142  = $scope.obj.guanfeei;
        $scope.subobj.ext146  = $scope.obj.guanfeej;
        $scope.subobj.ext150  = $scope.obj.guanfeek;

        $scope.subobj.ext40  = $scope.obj.fuwufeea;
        $scope.subobj.ext64 = $scope.obj.fuwufeeb;
        $scope.subobj.ext85 = $scope.obj.fuwufeec;
        $scope.subobj.ext99 = $scope.obj.fuwufeed;
        $scope.subobj.ext108 = $scope.obj.fuwufeee;
        $scope.subobj.ext117 = $scope.obj.fuwufeef;
        $scope.subobj.ext126 = $scope.obj.fuwufeeg;
        $scope.subobj.ext134 = $scope.obj.fuwufeeh;
        $scope.subobj.ext143 = $scope.obj.fuwufeei;
        $scope.subobj.ext147 = $scope.obj.fuwufeej;
        $scope.subobj.ext151 = $scope.obj.fuwufeek;
        InvoiceService.invoice.editRemainCaseInvoice($scope.subobj,function(data){
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