angular.module('iprpAdminApp').controller('ServiceCtrl', function ($scope,ChannelService,PaginationService) {
    $scope.obj = { };
    var array = [];
    init_service_list();
    function init_service_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            ChannelService.channel.channel_service({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "name" : !$scope.obj.name ? null : encodeURI($scope.obj.name)
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,10);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.allId = [];
            $scope.serviceList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.serviceList = newItems;
            newItems.forEach(function(obj){
                array.push(obj.sp_id);
            });
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    //搜索
    $scope.search = function(){
        init_service_list();
    }
    //单选
    $scope.checkall = false;
    $scope.sChoose = function(id){
        if($scope.allId.indexOf(id) !== -1){
            $scope.allId.splice($scope.allId.indexOf(id),1);
        }else{
            $scope.allId.push(id);
            $scope.is_assign_show = false;
        }
        if($scope.allId.length === array.length){
            $scope.checkall = true;
            $scope.is_assign_show = false;
        }else{
            $scope.checkall = false;
        }
    };
    //确定
    $scope.assign_save = function(){
        if($scope.allId.length === 0){
            $scope.is_assign_show = true;
        }else{
            $scope.$close({sp_ids:$scope.allId})
        }
    }
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});