/**
 * Created by Origin on 2017/5/12.
 */

angular.module('iprpAdminApp').controller('memberDongjieCtrl', function ($scope,MemberService,member_id) {
//提交
  $scope.data = {};
  $scope.save = function(){//type false/冻结
    MemberService.update_state({member_id:member_id,type:false,state_remark:$scope.data.memo},{},function(data){
      $scope.$close();
    },function(error){
      alert(error.data.msg);
    })
  };
//关闭
$scope.cancel = function () {
  $scope.$dismiss("cancel");
};


});
