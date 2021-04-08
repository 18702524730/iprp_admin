angular.module('iprpAdminApp').controller('AddBadServicerCtrl',function($scope,$stateParams,PaginationService,ServicerService,$modal,$location){
    $('#bad_servicer_list').siblings().removeClass("selected");
    $('#bad_servicer_list').addClass("selected");

    /**
     * 根据服务商或者账号查询服务商
     */
    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "没有符合条件的记录";//加载页面内容
    $scope.search = function(){
        if(!$scope.key_word){
            $scope.serviceForm.submitted = true;
        }else{
            init_badService_list($scope.key_word);
        }
    }
    function init_badService_list(key_word){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            ServicerService.service_list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "keyword": key_word === "" || key_word === undefined ? null : encodeURI(key_word)
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.badServiceList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.badServiceList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    $scope.detail_badService = function(index){
        $location.path('main/merchant_home/add_badServiceManage/' + index);
    }
});
