angular.module('iprpAdminApp').controller('partnerCheckCtrl', function ($scope,PartnerService, id, $cookies) {

    // 结算表主键id
    $scope.cashId = id;
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
    $scope.obj={
      queren: true
    };
    $scope.withdrawState = '';

    $scope.selectFn = function(type) {
      $scope.withdrawState = type;
    };

    // $scope.$watch('withdrawState', function (flowType) {
    //   console.log(222);
    //   console.log(flowType);
    //   console.log($scope.withdrawState);
    //   $scope.objwithdrawState = flowType;
    // });

    // 确定
    $scope.confirm = function(){
      if (!$scope.obj.queren) {
          return false;
      }else if ($scope.withdrawState == ''){
        layer.alert('请选择审核结果');
        return false
      }else{
        // 初始化单选，避免多次提交
        $scope.obj.queren = false;  
      }
      $scope.error_tip = '';
      $scope.obj.id = parseInt($scope.cashId);
      $scope.obj.withdrawState = Number($scope.withdrawState);
      PartnerService.auditWithdrawDetail($scope.obj, function(item){
          $scope.$close();
      },function(item){
          if(item.status!=200){
              layer.alert(item.data.msg);
          }
      });
    };
});
