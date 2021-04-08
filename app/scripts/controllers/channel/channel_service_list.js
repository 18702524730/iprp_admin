angular.module('iprpAdminApp').controller('ChannelServiceListCtrl',function($scope,ChannelService,ChannelSpService,PaginationService,$stateParams){
    $('#channel_list').siblings().removeClass("selected");
    $('#channel_list').addClass("selected");
    var OweNer = function(pg_index,pg_count,cb){
        ChannelSpService.channelSp.channelService({
            "pg_index":pg_index,
            "pg_count":pg_count
        },cb);
    };
    $scope.pagination = new PaginationService(OweNer,15);
    /**
     * 获取详情
     */
    ChannelService.channel.detail({channel_id:$stateParams.channel_id},function(data){
        $scope.channel_detail = data;
        if($scope.channel_detail != null){
            init_channel_service_list();
        }
    });
    function init_channel_service_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            ChannelSpService.channelSp.channelService({
                "pg_index":pg_index,
                "pg_count":pg_count,
                channel_id :$scope.channel_detail.channel_id,
                bs_id:$stateParams.bs_id
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.channelServiceList = [];
            if (newItems == undefined || $scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.channelServiceList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    /**
     * 取消指定
     * @param id
     */
    var channelSp_ids = [];
    $scope.cancel_assign = function(id){
        channelSp_ids.push(id);
        ChannelSpService.channelSp.del_channel_service({channel_id:$stateParams.channel_id,channelSp_ids:channelSp_ids},function(data){
            channelSp_ids = []
            init_channel_service_list();
        },function(error){
            alert(error.data.msg);
        })
    }
});
