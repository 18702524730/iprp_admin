angular.module('iprpAdminApp').controller('addTmCtrl', function ($scope, marKetList, $state, id) {

    // 商标编号
    $scope.data = {
      goods_sn: ''
    };

    // 设置布尔值，避免多次提交
    $scope.boolsave = true;

    //提交
    $scope.saveFn = function(){
        if (!$scope.data.goods_sn) {
            $scope.error = '请填写商标编号';
            return;
        }
        if(!$scope.boolsave){
            return false;
        }else{
            $scope.boolsave = false;
        }
        marKetList.addPositionTrademark({
            id: id,
            goods_sn: $scope.data.goods_sn
        },function(data){
          $scope.boolsave = true;
          console.log(data)
          if (data.msg) {
            alert(data.msg);
            return;
          }
          else{
            $scope.$close();
          }
        },function(e){
            $scope.$close();
            alert(e.data.msg)
        });
    };
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
