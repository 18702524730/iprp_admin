angular.module('iprpAdminApp').controller('SetupCtrl', function ($scope,bsOrderService,itemData,setup,serviceType,$cookies) {
    // 查询服务商
    $scope.setupList = setup;
    // 获取订单id
    $scope.order_id = itemData.order_id;
    $scope.bs_id = itemData.bs_id
    // 判断是否为合伙人的服务单
    $scope.serviceType = serviceType;
    console.log(serviceType)
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
    $scope.obj={};

 		setTimeout(function() {
 			$('.selectpicker').selectpicker('render');
 		}, 200)


    // 确认
    $scope.obj.queren = true;
    var isSubmited = false;
    $scope.confirm = function(){
    		if (isSubmited) {
    			return;
    		}
        if(!$scope.obj.setup_state){
            $scope.error_tip = '请选择服务商!';
            return false;
        }
        if(!$scope.obj.memo){
            $scope.error_tip = '请填写备注信息!';
            return false;
        }
        if (!$scope.obj.queren) {
            return false;
        }
        isSubmited = true;
        $scope.error_tip = '';
        var data={
            order_id:$scope.order_id,
            is_rebuild_sp: $scope.obj.setup_state == '-1' ? 1 : 2, // 1表示回收 2设置
            access_token:$cookies.get("token"),
            sp_id:$scope.obj.setup_state || null,
            memo:$scope.obj.memo,
            is_contact:1
        };
        // 设置服务商
        if($scope.serviceType){//如果是合伙人的服务单
            console.log($scope.serviceType,'这个订单是合伙人的')
            bsOrderService.setupPartnerOrders({order_id:$scope.order_id},data,function(item){
            		isSubmited = false;
                $scope.$close();
            },function(item){
            		isSubmited = false;
                if(item.status!=200){
                    layer.alert(item.data.msg);
                }
            });
        }else{
            bsOrderService.setupOrders({order_id:$scope.order_id},data,function(item){
            		isSubmited = false;
                $scope.$close();
            },function(item){
            		isSubmited = false;
                if(item.status!=200){
                    layer.alert(item.data.msg);
                }
            });
        }

    };
});
