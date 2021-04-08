angular.module('iprpAdminApp').controller('czEditorCtrl', function ($scope,MemberService,data,czOutList) {
//提交
  $scope.save = function(){
    czOutList.note(data,function(data){
        $scope.$close();
    },function(error){
        alert(error.data.msg);
    });
  };
//关闭
$scope.cancel = function () {
  $scope.$dismiss("cancel");
};
});