angular.module('iprpAdminApp').controller('ipProtectOrderReportCtrl', function ($scope,ipService, orderSn, $cookies) {

    // 结算表主键id
    $scope.orderSn = orderSn;
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
    $scope.obj={
      queren: true,
      isAccept: '1'
    };

    $scope.selectFn = function(type) {
      $scope.isAccept = type;
    };

    // $scope.$watch('isAccept', function (flowType) {
    //   console.log(222);
    //   console.log(flowType);
    //   console.log($scope.isAccept);
    //   $scope.objwithdrawState = flowType;
    // });

    // 确定
    $scope.confirm = function(){
      if (!$scope.obj.queren) {
        return false;
      }else if (!$scope.obj.settleContent){
        layer.alert('请输入结案反馈内容');
        return false
      }

      // 初始化单选，避免多次提交
      $scope.obj.queren = false;  
      $scope.error_tip = '';
      $scope.obj.orderSn = $scope.orderSn;
      $scope.obj.operateType = 2;
      ipService.handleStereoProtectOrder($scope.obj, function(item){
          $scope.$close();
      },function(item){
          if(item.status!=200){
              layer.alert(item.data.msg);
          }
      });
    };
});
