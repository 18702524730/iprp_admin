angular.module('iprpAdminApp').controller('CouponAddCtrl',function($scope,$modal,RefundService,$stateParams,$location,marKetList,$state){
  $('#coupon_list').siblings().removeClass("selected");
  $('#coupon_list').addClass("selected");
  $scope.couponData = {};
  // 添加时间控件 初始化
  $('#startCouponTime,#endCouponTime').datetimepicker({
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

  
  $scope.removeName = function(item){
    console.log(item)
    $scope.productNumArr.splice(item,1);
    $scope.allProductNumInfo.splice(item,1);
  }
  //查看订单详情
  $scope.orderDetail = function(order_sn){
      $location.path('/main/trade_home/bs_order_detail/' + order_sn);
  };

  // 弹窗
  $scope.checkFn = function(){
      $scope.productBol = false;
    $modal.open({
      resolve:{
        ProductNum:function(){
          var data = {
            allProductNum:$scope.productNumArr,
            allProductNumInfo:$scope.allProductNumInfo
          }
          return data
        }
      },
      backdrop:'static',
      templateUrl: 'package\\modal\\coupon\\coupon_shop.html',
      controller: 'couponReasonCtrl'
    }).result.then(function (result) {
      console.log('成功调取')
      $scope.productBol = true;
      $scope.productNumArr = result.allProductNumLook;
      $scope.allProductNumInfo = result.allProductNumInfoLook;
    },function(err){
      console.log('失败调取')
      $scope.productBol = true;
      $scope.productNumArr = $scope.productNumArr;
      $scope.allProductNumInfo = $scope.allProductNumInfo;
    });
  };
  $scope.addCouponInfo = function(){//数据判断
    var reg01 = /^[1-9]\d{0,5}$/;//10000以内整数数字
    var reg02 = /^[1-9]\d{0,2}$/;//100以内整数数字
    var reg03 = /^[1-9]\d{0,4}$/;//100以内整数数字

    if(!$scope.couponData.couponName){//券名称
      $scope.errCouponName = '券名称不能为空';
      return;
    }else{$scope.errCouponName = ''}

    if(!$scope.couponData.couponType){//券类型：
      $scope.errCouponType = '请选择券类型';
      return;
    }else{$scope.errCouponType = ''}

    if(!$scope.couponData.couponAmount){//券比例，券金额
      if($scope.couponData.couponType == 1){
        $scope.errCouponAmount = '升润比例不能为空'
      }else{
        $scope.errCouponAmount = '升润金额不能为空'
      }
      return;
    }else{//升润券和金额限制
      if($scope.couponData.couponType == 1){//升润
        if(reg02.test($scope.couponData.couponAmount)){
          if($scope.couponData.couponAmount > 50){
            $scope.errCouponAmount = '升润比例不能超过50%'
            return;
          }else{
            $scope.errCouponAmount = ''
          }
        }else{
          $scope.errCouponAmount = '请输入50以内正整数'
          return;
        }
      }else{//升佣
        if(reg03.test($scope.couponData.couponAmount)){
          if($scope.couponData.couponAmount > 2000){
            $scope.errCouponAmount = '升润金额不能超过2000元'
            return;
          }else{
            $scope.errCouponAmount = ''
          }
        }else{
          $scope.errCouponAmount = '请输入2000以内正整数'
          return;
        }
        
      }
      $scope.errCouponAmount = '';
    }

    if(!$scope.couponData.usageObj){//使用对象：
      $scope.errUsageObj = '请选择使用对象'
      return;
    }else{$scope.errUsageObj = ''}

    if(!$scope.couponData.applicableTimeType){//使用时限：
      $scope.errApplicableTimeType = '请选择使用时限'
      return;
    }else if($scope.couponData.applicableTimeType == 2){//计时
      $scope.errApplicableTimeType = '';
      if(!$scope.couponData.applicableTimeDay){
        $scope.errTimes = '请填写使用时限'
        return;
      }
      if(reg02.test($scope.couponData.applicableTimeDay)){
        if($scope.couponData.applicableTimeDay > 60){
          $scope.errTimes = '使用时限在60天以内'
          return;
        }
        $scope.errTimes = '';
      }else{$scope.errTimes = '请输入60以内正整数'}
      
    }else if($scope.couponData.applicableTimeType == 1){//时段
      $scope.errApplicableTimeType = '';
      if(!$scope.endCouponTime||!$scope.startCouponTime){
        $scope.errTimes = '请选择使用时间范围'
        return;
      }
      $scope.errTimes = '';
    }

    if(!$scope.couponData.couponNum){//生成数量
      $scope.errCouponNum = '请填写生成数量'
      return;
    }else if(!reg01.test($scope.couponData.couponNum)){
      $scope.errCouponNum = '请输入10000以内正整数';
    }else{
      if($scope.couponData.couponNum > 10000){
        $scope.errCouponNum = '生成数量不能超过10000';
        return;
      }
      $scope.errCouponNum = '';
    }

    if(!$scope.couponData.isRepeatGet){//重复领取：
      $scope.errCouponRepeatGet = '请选择是否可以重复领取'
      return;
    }else{$scope.errCouponRepeatGet = ''}

    if(!$scope.couponData.productType){//适用商品：
      $scope.errProductType = '请选择使用商品'
      return;
    }else{$scope.errProductType = ''}
    $scope.layerOpen();
    console.log($scope.couponData)
  } 
  $scope.layerOpen = function(){
    layer.open({
      title: '提示'
      ,content: '确认添加该拾贝券吗？'
      ,yes:function(index, layero){
        $scope.addCoupon(index, layero);
      }
    });  
  }
  $scope.addCoupon = function(index, layero){
    var endCouponTime = 0;
    if($scope.endCouponTime){
      endCouponTime = (24*60*60*1000-1000)+new Date($scope.endCouponTime).getTime();
    }
    var data = {
      'couponName':$scope.couponData.couponName,
      'couponType':$scope.couponData.couponType,
      'couponAmount':$scope.couponData.couponAmount,
      'usageObj':$scope.couponData.usageObj,
      'applicableTimeType':$scope.couponData.applicableTimeType,
      'isRepeatGet':$scope.couponData.isRepeatGet,
      'productType':$scope.couponData.productType,
      'couponNum':$scope.couponData.couponNum,

      'applicableTimeDay':$scope.couponData.applicableTimeType == 2 ? $scope.couponData.applicableTimeDay:null,

      'applicableTimeStart':$scope.couponData.applicableTimeType == 1 ? new Date($scope.startCouponTime).getTime():'',
      'applicableTimeEnd':$scope.couponData.applicableTimeType == 1 ? endCouponTime :'',
      'productNumArr':$scope.productNumArr
    }

    marKetList.addSebeCoupon(data,function(resp){
      layer.close(index);
      $state.go('main.market_home.coupon')
    },function(err){
      layer.close(index);
      layer.open({
        title: '提示'
        ,content: err.data.msg
      }); 
    })
  }
});

