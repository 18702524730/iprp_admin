angular.module('iprpAdminApp').controller('OrderSettingCtrl', function ($scope,SettingService) {
    $('#order_set').addClass("selected").parent().siblings().children().removeClass("selected");
    /**
     * 根据name查询
     */
    init_setting();
    function init_setting(){
        SettingService.setting.detail({
            "name":"sp_distribute"
        },function(data){
            $scope.OrderSetDetail = data;
            $scope.OrderSetDetail.value = parseInt(data.value);
        })
    }

    $scope.turnOn = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.OrderSetDetail.value = 0;
    };

    $scope.turnOff = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.OrderSetDetail.value = 1;
    };

    //设置
    $scope.setOrder = function(){
        SettingService.setting.edit({
            name:"sp_distribute"
        },$scope.OrderSetDetail,function(data){
            alert("保存成功!!!")
            init_setting();
        },function(error){
            alert(error.data.msg);
        })
    }
});