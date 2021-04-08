angular.module('iprpAdminApp').controller('UserDetailCtrl', function ($scope,MemberService,MemberApplicationService,AssignService,$stateParams,$modal,$location) {

    $('#user_list').siblings().removeClass("selected");
    $('#user_list').addClass("selected");

    //查看详情
    MemberService.detail({member_id:$stateParams.member_id},function(data){
        $scope.member_detail = data;
    },function(error){
        alert(error.data.msg);
    })
    //企业信息
    MemberApplicationService.detail({member_id:$stateParams.member_id},function(data){
        $scope.member_application = data;
    },function(error){
        alert(error.data.msg);
    })

    //解冻Or冻结
    $scope.editMemberStatus = function(type){//type false/冻结 true/解冻
        MemberService.update_state({member_id:$stateParams.member_id,type:type},{},function(data){
            $location.path('main/user_home/user_list')
        },function(error){
            alert(error.data.msg);
        })
    };

    //查询既往服务商
    MemberService.assign_sp({
        member_id:$stateParams.member_id,
        "pg_index":0,
        "pg_count":999
    },function(data){
        $scope.AssignService = data;
    });


    //账号关联
    $scope.account_relevance = function(){
        $modal.open({
            resolve:{

            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\member\\account_associated.html',
            controller: 'AccountAssociatedCtrl'
        }).result.then(function (result) {
                $scope.allot_service_obj.sp_id = result.sp_id;
                $scope.allot_service_obj.sp_code = result.sp_code;
                $scope.allot_service_obj.sp_name = result.sp_name;
        });
    }

});