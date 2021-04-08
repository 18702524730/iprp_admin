angular.module('iprpAdminApp').controller('ProductDetailCtrl',function($scope,$modal,session,$cookies,ProductService,$stateParams,$location,$sce){
    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    /**
     * 订单详情
     */
    ProductService.good_detail({productPriceId:$stateParams.productPriceId},function(data){
        $scope.detail = data;
        $scope.detail.businessIntroduction = $sce.trustAsHtml(data.businessIntroduction);
        $scope.detail.applyProcess = $sce.trustAsHtml(data.applyProcess);
        $scope.detail.commonProblem = $sce.trustAsHtml(data.commonProblem);
    },function(error){
        alert(error.data.msg);
    });
});

