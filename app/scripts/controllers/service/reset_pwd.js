angular.module('iprpAdminApp').controller('ServicerResetPwdCtrl',function($scope,ServicerService,$stateParams,$location){
    $scope.reset_obj = { };
    //提交
    $scope.submit = function(){
        if(!$scope.reset_obj.password || !$scope.reset_obj.new_password){
            $scope.ServiceResetPwdForm.submitted = true;
        }else{
            if($scope.r_password != $scope.reset_obj.new_password) {
                $scope.repeatPassword=true;
            }else {
                $scope.repeatPassword=false;
                ServicerService.reset_pwd({sp_id:$stateParams.sp_id},$scope.reset_obj,function(data) {
                    $location.path('/main/merchant_home/servicer_list');
                },function(error){
                    alert(error.data.msg);
                });
            }
        }
    };
    $scope.$watch("r_password",function(newValue){
        if($scope.reset_obj.new_password != "") {
            if ($scope.reset_obj.new_password === newValue) {
                $scope.repeatPassword = false;
            }else{
                $scope.repeatPassword = true;
            }
        }
    },true);
});
