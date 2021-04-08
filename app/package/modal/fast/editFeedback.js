angular.module('iprpAdminApp').controller('editFeedbackCtrl', function ($scope,PostalService,item,$state) {

    $scope.id = item.id;
    $scope.item = item;
    $scope.data = {
      selectOpinionType: '',
      receiveName:''
    };

    $scope.typeList = [
      {name: '优化', id:1},
      {name: '问题', id:2},
      {name: '需求', id:3},
      {name: '无效信息', id:4},
    ];

    // 设置布尔值，避免多次提交
    $scope.boolsave = true;
    //提交
    $scope.save = function(){
        if(!$scope.boolsave){
            return false;
        }else{
            $scope.boolsave = false;
        }
        console.log($scope.data);
        if (!$scope.data.selectOpinionType) {
          layer.alert('请选择意见类型'); 
          return
        }
        if (!$scope.data.receiveName) {
          layer.alert('请填写意见查收人！'); 
          return
        }
        PostalService.updateOpinionFeedback({
            id: item.id,
            opinionType: $scope.data.selectOpinionType,
            receiveName: $scope.data.receiveName,
        },function(data){
            $scope.$close();
            $scope.boolsave = true;
            //$state.reload();
        },function(error){
            $scope.boolsave = true;
            alert(error.data.msg || '出错啦');
        });
    };
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
