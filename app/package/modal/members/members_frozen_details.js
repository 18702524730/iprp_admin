angular.module('iprpAdminApp').controller('MembersFrozenDetailsCtrl', function ($scope, member_id, MemberService,$stateParams,$location) {
	$scope.member_id = member_id;
	
	MemberService.detail({member_id:member_id},function(data){
		  $scope.member_detail = data;
    },function(error){
        alert(error.data.msg)
    }); 
	
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
    
});
