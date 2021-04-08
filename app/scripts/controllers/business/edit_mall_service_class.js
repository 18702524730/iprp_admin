angular.module('iprpAdminApp').controller('EditMallServiceCtrl', function ($scope,BusinessClassService,$stateParams,$location) {
    $('#mall_service_class').siblings().removeClass("selected");
    $('#mall_service_class').addClass("selected");

//    BusinessClassService.business_class_tree(function(data){
//        $scope.business_class_tree_list = data;
//    });

    BusinessClassService.detail_businessClass({bs_class_id : $stateParams.bs_class_id},function(data){
        $scope.business_class_detail = data;
    },function(error){
        alert(error.data.msg);
    });

    /**
     * 提交
     */
    $scope.submit = function(){
        if(!$scope.business_class_detail.name){
            $scope.edit_business_class_form.submitted=true;
        }else{
            BusinessClassService.edit({bs_class_id : $stateParams.bs_class_id},$scope.business_class_detail,function(){
                $location.path('/main/business_home/business_class_list')
            },function(err){
                alert(err.data.msg);
            });
        }
    }
});