angular.module('iprpAdminApp').controller('materialsNameCtrl', function ($scope, $cookies,marKetList,Upload,PartnerService) {
  $scope.obj = {};
  $scope.approve = function(){
    console.log($scope.obj.materialsType)
    if(!$scope.obj.materialsType){
      layer.open({
        title: '提示',
        content:'请添加类目名称'
      })
      return;
    }
    layer.open({
      title: '提示'
      ,content: '确认添加该类目吗？'
      ,yes:function(index, layero){
        layer.close(index);
        $scope.addName($scope.obj.materialsType)
        // $scope.$close({
        //   sendObj:$scope.obj.materialsType
        // })
        console.log('ceshi 010101')
      }
    });  
  } 
  $scope.addName = function (name) {

    PartnerService.addMaterialCategory({title:name},function (resp) {
      $scope.$close({
        sendObj:$scope.obj.materialsType
      })
    },function (argument) {
      alert(argument.data.msg)
      console.log(argument.data.msg)
    })
  }
  //关闭
  $scope.cancel = function () {
      $scope.$dismiss("cancel");
  };
});
