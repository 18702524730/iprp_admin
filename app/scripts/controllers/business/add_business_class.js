angular.module('iprpAdminApp').controller('AddBusinessClassCtrl', function ($scope,BusinessClassService,$location) {

    $('#business_class_list').addClass("selected").parent().siblings().children().removeClass("selected");

    $scope.add_business_class_obj = { };
    $scope.bs_class_id = localStorage.getItem('temp_bs_class_id');//变量
    if($scope.bs_class_id != undefined && $scope.bs_class_id != null){
        $scope.add_business_class_obj.bs_class_id = parseInt($scope.bs_class_id);
    }

    BusinessClassService.business_class_second(function(data){
        $scope.business_class_tree_list = data;
    });

    /**
     * 添加服务分类
     */
    $scope.submit = function(){
        if($scope.bs_class_id != null){
            if(!$scope.add_business_class_obj.name || !$scope.add_business_class_obj.bs_class_id){
                $scope.add_business_service_class.submitted = true;
            }else{
                $scope.add_business_class_obj.sort = 1;
                $scope.add_business_class_obj.parent_id = $scope.add_business_class_obj.bs_class_id;
                BusinessClassService.add_business_class({},$scope.add_business_class_obj,function(){
                    $scope.temp = localStorage.getItem('temp_bs_class_id');
                    $location.path('/main/business_home/business_class_list')
                },function(err){
                    $scope.temp = localStorage.getItem('temp_bs_class_id');
                    alert(err.data.msg);
                })
            }
        }else if($scope.bs_class_id === null){
            if(!$scope.add_business_class_obj.name){
                $scope.add_business_service_class.submitted = true;
            }else{
                $scope.add_business_class_obj.sort = 1;
                $scope.add_business_class_obj.parent_id = 0;
                BusinessClassService.add_business_class({},$scope.add_business_class_obj,function(){
                    $location.path('/main/business_home/business_class_list')
                },function(err){
                    alert(err.data.msg);
                })
            }
        }

    }

});
