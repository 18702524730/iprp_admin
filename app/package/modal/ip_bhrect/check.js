angular.module('iprpAdminApp').controller('BhipProtectCheckCtrl', function ($scope,ipService, businessSn, $cookies) {

    // 结算表主键id
    $scope.businessSn = businessSn;
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
    $scope.obj={
      queren: true,
      state: '3'
    };

    $scope.selectFn = function(type) {
      $scope.state = type;
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
      }else if (!$scope.obj.state){
        layer.alert('请选择受理结果');
        return false
      }

      if ($scope.obj.state == '2') {
        if (!$scope.obj.memo){
          layer.alert('请输入告知内容');
          return false
        }
      } else if ($scope.obj.state == '4') {
        if (!$scope.obj.memo){
          layer.alert('请输入不予受理原因');
          return false
        }
      }
      // 初始化单选，避免多次提交
      $scope.obj.queren = false;  
      $scope.error_tip = '';
      $scope.obj.businessSn = $scope.businessSn;
      $scope.obj.state = $scope.obj.state;
      ipService.updateIpProtectInfo($scope.obj, function(item){
          $scope.$close();
      },function(item){
          if(item.status!=200){
              layer.alert(item.data.msg);
          }
      });
    };
});
