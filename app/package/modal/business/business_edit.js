angular.module('iprpAdminApp').controller('BusinessEditCtrl', function ($scope,BusinessesService,BusinessClassService,$location) {

    $scope.temp = localStorage.getItem('temp_bs_id');
    $scope.bs_id = $scope.temp;
    /**
     * 服务分类
     */
    BusinessClassService.business_class_tree(function(data){
        $scope.business_class_tree_list = data;
    });

    /***
     * 获取详情
     */
    BusinessesService.detail_businessService({bs_id:$scope.bs_id},function(data){
        $scope.businessService_detail = data;
    });

    /**
     *编辑服务
     */
    $scope.edit_BusinessService = function(){
        if(!$scope.businessService_detail.name || !$scope.businessService_detail.service_class.bs_class_id){
            $scope.EditBusinessForm.submitted = true;
        }else{
            BusinessesService.editBusinessService({bs_id:$scope.bs_id},$scope.businessService_detail,function(data){
                localStorage.removeItem('temp_bs_id');
                $scope.$close({});
                $location.path('main/business_home/edit_business_feedback/' + $scope.bs_id);
            },function(error){
                alert(error.data.msg);
            })
        }
    }

    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});