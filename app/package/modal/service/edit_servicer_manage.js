angular.module('iprpAdminApp').controller('EditServicerManage', function ($scope,itemD,$location,BusinessService) {

    /**
     * 获取支付单详情
     */
    /*BillOrderPaymentDetailService.pay_detail({
        bill_order_pay_id:bill_order_pay_id,
        bill_order_id:bill_order_id
    },function(data){
        $scope.order_pay_detail = data;
    },function(error){
        alert(error.data.msg);
    });*/
    $scope.itemD = angular.copy(itemD);

    /**
     * 审核
     */
    $scope.error = "";
    //设置布尔值，防止多次提交
    $scope.boolsave = true;
    $scope.save = function(){
        var sp_ability = $scope.itemD.item.sp_ability
        if(!sp_ability){
            $scope.error = "请输入能力值！";
            return;
        }
        if (!(/^[1-9]\d*$/.test(sp_ability))) {
            $scope.error = "能力值必须是大于0的整数！";
            return;
        }
        if(!$scope.boolsave){
            return false;
        }else{
            $scope.boolsave = false;
        }
        $scope.error = "";
        BusinessService.serviceSpBs({
            sp_id: $scope.itemD.item.sp_id //这儿modal里有时会取不到$stateParams.sp_id，覆盖一下
        },{
            sp_id: $scope.itemD.item.sp_id,
            sp_bs_id: $scope.itemD.isEdit? $scope.itemD.item.sp_bs_id: '',
            sp_code: $scope.itemD.item.sp_code,
            check: true,
            bs_id: $scope.itemD.item.bs_id,
            channel_id: $scope.itemD.item.channel_id,
            sp_ability: $scope.itemD.item.sp_ability
        },function(date){
            $scope.$close({});
            $scope.boolsave = true;
        },function(error){
            $scope.boolsave = true;
            alert(error.data.msg);
        })
    };

    //关闭
    $scope.cancel = function () {
        //$scope.itemD.item.sp_ability = '';
        $scope.$dismiss("cancel");
    };
});