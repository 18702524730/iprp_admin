angular.module('iprpAdminApp').controller('EditUserCtrl', function ($scope,MemberService,MemberApplicationService,TimeService,$stateParams,$location) {

    $('#user_list').siblings().removeClass("selected");
    $('#user_list').addClass("selected");

    //查看详情
    MemberService.detail({member_id:$stateParams.member_id},function(data){
        $scope.member_detail = data;
        if (null !== $scope.member_detail && null != $scope.member_detail.birthday) {
            $scope.birthday = TimeService.format($scope.member_detail.birthday, 'yyyy-MM-dd');
        }
    },function(error){
        alert(error.data.msg);
    })
    //企业信息
    MemberApplicationService.detail({member_id:$stateParams.member_id},function(data){
        $scope.member_application = data;
    },function(error){
        alert(error.data.msg);
    })

    //编辑会员
    $scope.update_member = function(){
        if(!$scope.member_detail.nickname || !$scope.member_detail.truename || !$scope.member_detail.member_industry ||
            !$scope.member_detail.memberIdentificationCard || !$scope.member_detail.areaId || !$scope.member_detail.member_address ||
            !$scope.member_detail.phone || !$scope.member_detail.email || !$scope.member_application.company_name ||
            !$scope.member_application.owner_name || !$scope.member_application.business_licence_number
            || !$scope.member_application.company_address){

            $scope.EditUserForm.submitted = true;
            $scope.$watch("member_detail.areaId",function(data){
                if(data != null && data != undefined){
                    $scope.is_show_area = false;
                }else{
                    $scope.is_show_area = true;
                }
            })
        }else{
            $scope.member_detail.birthday = new Date($scope.birthday).getTime();
            MemberService.update({member_id:$stateParams.member_id},$scope.member_detail,function(data){

            },function(error){
                alert(error.data.msg);
            })
            MemberApplicationService.update({member_id:$stateParams.member_id},$scope.member_application,function(data){
                $location.path('main/user_home/user_list');
            },function(error){
                alert(error.data.msg);
            })
        }
    }
});