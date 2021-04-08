'use strict';
angular.module('iprpAdminApp').controller('ApplyUserDetailCtrl',function ($scope,$location,AreaService,MemberApplicationService,$stateParams) {

    $('#apply_user_list').siblings().removeClass("selected");
    $('#apply_user_list').addClass("selected");
        /**
         * 获取详情
         */
        MemberApplicationService.detail({member_id:$stateParams.member_id},function(date){
            $scope.member_detail = date;
        },function(error){
            alert(error.date.msg);
        });

        /**
         * 拒绝
         */
        $scope.obj_application = { };
        $scope.turn_down = function(member_id){
            if(!$scope.member_detail.message){
                $scope.check_member_form.submitted = true;
            }else{
                $scope.obj_application.state_remark = $scope.member_detail.message;
                $scope.obj_application.status = 0;
                MemberApplicationService.update_status({member_id:member_id},$scope.obj_application,function(date){
                     $location.path('/main/user_home/apply_user_list')
                },function(error){
                    alert(error.date.msg)
                })
            }
        }

        /**
         * 通过
         */
        $scope.pass = function(member_id){
            if(!$scope.member_detail.message){
                $scope.check_member_form.submitted = true;
            }else{
                $scope.obj_application.state_remark = $scope.member_detail.message;
                $scope.obj_application.status = 1;
                MemberApplicationService.update_status({member_id:member_id},$scope.obj_application,function(date){
                        $location.path('/main/user_home/apply_user_list')
                    },function(error){
                        alert(error.date.msg)
                    })
            }
        }
});
