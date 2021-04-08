angular.module('iprpAdminApp').controller('setServiceStateCtrl', function ($scope,bsOrderService,order_detail,$state) {

    $scope.order_detail = order_detail;
    $scope.data = {
        __code:''
    };
    
    bsOrderService.feedbackList({
        order_id: order_detail.order_id
    },function(data){
        $scope.feedbackList = data.data;
    },function(error){
        alert(error.data.msg);
    });

    //提交
    // 设置布尔值，防止多次提交
    $scope.boolsave = true;
    $scope.save = function(){
        if (!$scope.order_detail.__code) {
            alert('请先设置服务状态');
            return;
        }
        if ($scope.memo) {    
        }
        if(!$scope.boolsave){
            return false;
        }else{
            $scope.boolsave = false;
        }
        bsOrderService.setServiceState({
            order_sn:order_detail.order_sn,
            code: $scope.order_detail.__code,
            memo: $scope.data.memo
        },function(data){
            $scope.$close();
            $state.reload();
            $scope.boolsave = true;
        },function(error){
            $scope.boolsave = true;
            alert(error.data.msg);
        });
    };
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
