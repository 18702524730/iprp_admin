angular.module('iprpAdminApp').controller('MembersThawDetailsCtrl', function ($scope, member_id, MemberService,MemberBlackService,$stateParams,$location) {
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
    
    //确认提交
    //解冻Or冻结
    $scope.editMemberStatus = function(type){//type false/冻结 true/解冻
        MemberService.update_state({member_id:member_id,type:type},{},function(data){
       	     $scope.$close({member_id:member_id});
        	 //$scope.$dismiss("cancel");
        	 //window.location.reload();
             //$location.path('main/user_home/user_black_list');
        },function(error){
            alert(error.data.msg);
        })
    }
    
});










