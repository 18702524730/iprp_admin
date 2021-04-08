angular.module('iprpAdminApp').controller('EditAssignServiceCtrl', function ($scope,$stateParams,$location,AssignService) {
    $('#assignService_list').siblings().removeClass("selected");
    $('#assignService_list').addClass("selected");

    /**
     * 获取详情
     */
    AssignService.Assign.detail({designation_id : $stateParams.designation_id},function(data){
        $scope.assgin_detail = data;
    },function(error){
        alert(error.data.msg);
    })

    /**
     * 编辑
     */
    $scope.save = function(){
        if(!$scope.assgin_detail.apply_code){
            $scope.edit_assign_form.submitted = true;
        }else{
            AssignService.Assign.edit({designation_id : $stateParams.designation_id},$scope.assgin_detail,function(data){
                $location.path('main/user_home/assignService_list');
            },function(error){
                alert(error.data.msg);
            })
        }
    }

});

