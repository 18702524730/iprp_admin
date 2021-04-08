angular.module('iprpAdminApp').controller('EditChannelCtrl',function($scope,ChannelService,$stateParams,$location){
    $('#channel_list').siblings().removeClass("selected");
    $('#channel_list').addClass("selected");
    /**
     * 获取详情
     */
    ChannelService.channel.detail({channel_id:$stateParams.channel_id},function(data){
        $scope.channel_detail = data;
    });

    $scope.turnOn = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.channel_detail.online_pay = 1;
    };
    $scope.turnOff = function($event){
        var jq = angular.element($event.target);
        jq.addClass("selected");
        jq.parent().siblings().children().removeClass("selected");
        $scope.channel_detail.online_pay = 0;
    };
    /**
     * 编辑渠道商
     */
    $scope.save_channel = function(){
        if(!$scope.channel_detail.code || !$scope.channel_detail.name || !$scope.channel_detail.describe || !$scope.channel_detail.url){
            $scope.EditChannelForm.submitted = true;
        }else{
            $scope.channel_detail.commission_rate = "10.00"; //先写死
            ChannelService.channel.editChannel({channel_id:$stateParams.channel_id},$scope.channel_detail,function(data){
                $location.path('/main/channel_home/channel_list')
            },function(error){
                alert(error.data.msg);
            })
        }
    }
});