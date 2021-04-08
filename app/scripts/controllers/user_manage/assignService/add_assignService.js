angular.module('iprpAdminApp').controller('AddAssignServiceCtrl', function ($scope,$location,AssignService,$modal) {
    $('#assignService_list').siblings().removeClass("selected");
    $('#assignService_list').addClass("selected");

    $scope.add_assign_obj = { };
    $scope.save = function(){
        if(!$scope.add_assign_obj.apply_code){
            $scope.add_assign_form.submitted = true;
        }else{
            AssignService.Assign.add($scope.add_assign_obj,function(data){
                $location.path('main/user_home/assignService_list');
            },function(error){
                alert(error.data.msg);
            })
        }
    }
});

