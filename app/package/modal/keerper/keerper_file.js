angular.module('iprpAdminApp').controller('keerperFileCtrl', function ($scope,MemberService,data,keerperReport) {
//提交
  $scope.save = function(){
    keerperReport.note(data,function(data){
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