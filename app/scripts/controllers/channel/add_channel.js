angular.module('iprpAdminApp').controller('AddChannelCtrl',function($scope,ChannelService,$location){
    $('#channel_list').siblings().removeClass("selected");
    $('#channel_list').addClass("selected");
    $scope.channel_obj = { };
    $scope.channel_obj.online_pay = 1;

    $scope.turnOn = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.channel_obj.online_pay = 1;
    };
    $scope.turnOff = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.channel_obj.online_pay = 0;
    };
    /**
     * 添加渠道商
     */
    $scope.add_channel = function(){
        if(!$scope.channel_obj.code || !$scope.channel_obj.name || !$scope.channel_obj.describe || !$scope.channel_obj.url){
            $scope.AddChannelForm.submitted = true;
        }else{
            $scope.channel_obj.commission_rate = "10.00"; //先写死
            ChannelService.channel.addChannel($scope.channel_obj,function(data){
                $location.path('/main/channel_home/channel_list')
            },function(error){
                alert(error.data.msg);
            })
        }
    }
});
