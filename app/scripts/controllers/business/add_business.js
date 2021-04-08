angular.module('iprpAdminApp').controller('AddBusinessCtrl', function ($scope,BusinessClassService,BusinessesService,$location) {
    $('#business_list').siblings().removeClass("selected");
    $('#business_list').addClass("selected");
    $('#business_class_list').removeClass("selected");
    BusinessClassService.business_class_tree(function(data){
        $scope.business_class_tree_list = data;
    });
    $scope.add_business_obj = { };
//    $scope.add_business_obj.state = 1;
//    $scope.turnOn = function($event){
//        var jq = angular.element($event.target);
//        jq.addClass("selected");
//        jq.parent().siblings().children().removeClass("selected");
//        $scope.add_business_obj.state = 0;
//    };
//
//    $scope.turnOff = function($event){
//        var jq = angular.element($event.target);
//        jq.addClass("selected");
//        jq.parent().siblings().children().removeClass("selected");
//        $scope.add_business_obj.state = 1;
//    };

    /**
     * 添加业务服务
     */
    $scope.service_class = { };
    $scope.add_BusinessService = function(){
        if(!$scope.add_business_obj.name || !$scope.add_business_obj.bs_class_id){
            $scope.AddBusinessForm.submitted = true;
        }else{
            $scope.service_class.bs_class_id = $scope.add_business_obj.bs_class_id;
            $scope.add_business_obj.service_class = $scope.service_class;
            BusinessesService.addBusinessService($scope.add_business_obj,function(data){
                $scope.retrun_business = data;
                if($scope.retrun_business != undefined){
                    $location.path('main/business_home/add_business_feedback/' + $scope.retrun_business.bs_id);
                }
            },function(error){
                alert(error.data.msg);
            })
        }
    }
});