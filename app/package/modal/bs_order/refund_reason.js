angular.module('iprpAdminApp').controller('refundReasonCtrl', function ($scope,bsOrderService,itemData) {

    $scope.itemData = itemData;
    $scope.pics = itemData.refund_images;

    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
