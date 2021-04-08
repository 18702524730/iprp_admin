angular.module('iprpAdminApp').controller('PaymentEditCtrl',function($scope,$stateParams,PayService,$location){
    PayService.detail_pay({
        payment_id:$stateParams.payment_id
    },function(date){
        $scope.payDetail=date;
    });
    $scope.turnOn = function(){
         $scope.payDetail.state = 1;
     };
     $scope.turnOff = function(){
        $scope.payDetail.state = 0;
     };
    /**
     * 编辑
     */
    $scope.edit=function(){
        if(!$scope.payDetail.image){
            $scope.edit_payment_form.submitted = true;
        }else{
            PayService.edit_pay({payment_id:$stateParams.payment_id},$scope.payDetail,function(){
                $location.path('/main/setting_home/payment_list')
            },function(error){
                alert(error.data.msg);
            })
        }
    }

    /*$scope.return=function(){
        $location.path('/manage/setting_home/payment_system')
    }*/
});
