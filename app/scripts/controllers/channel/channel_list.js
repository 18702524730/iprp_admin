angular.module('iprpAdminApp').controller('ChannelListCtrl',function($scope,ChannelService,PaginationService,$location){
    $('#channel_list').siblings().removeClass("selected");
    $('#channel_list').addClass("selected");
    init_channel_list();
    function init_channel_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            ChannelService.channel.list({
                "pg_index":pg_index,
                "pg_count":pg_count
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.channelList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.channelList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //编辑渠道商
    $scope.edit_channel = function(index){
        $location.path('/main/channel_home/edit_channel/' + index);
    };
    $scope.assign_channel = function(index){
        $location.path('/main/channel_home/assign_servicer/' + index);
    };
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});