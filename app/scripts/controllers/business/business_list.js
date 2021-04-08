angular.module('iprpAdminApp').controller('BusinessListCtrl', function ($scope,$modal,BusinessService,PaginationService,$location) {

    $('#business_list').siblings().removeClass("selected");
    $('#business_list').addClass("selected");
    $('#business_class_list').removeClass("selected");

    init_business_list();
    function init_business_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            BusinessService.list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "bs_class_name" : !$scope.bs_class_name ? null : encodeURI($scope.bs_class_name),
                "bs_name" : !$scope.bs_name ? null : encodeURI($scope.bs_name)
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.businessList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.businessList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    $scope.search = function(){
        init_business_list();
    }

    /**
     * 编辑
     * @param index
     */
    $scope.edit_business = function(index){
        $location.path('main/business_home/edit_business_feedback/' + index);
    }

    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
