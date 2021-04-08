angular.module('iprpAdminApp').controller('OpenInvoiceCtrl', function ($scope,$location) {
    $scope.obj = {};
    $scope.obj.invoice_type = "2";
    $scope.obj.type = "2";
    $scope.save = function(){
        if($scope.obj.type != undefined || $scope.obj.type != null || $scope.obj.invoice_type != null){
            $scope.$close({"type":$scope.obj.type,"invoice_type":$scope.obj.invoice_type});
        }
    };
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});