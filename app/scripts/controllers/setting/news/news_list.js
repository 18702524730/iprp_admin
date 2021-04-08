angular.module('iprpAdminApp').controller('NewsListCtrl', function ($scope,NewsService,PaginationService,$location) {

    $('#news_list').siblings().removeClass("selected");
    $('#news_list').addClass("selected");
    var array = [];
    $scope.allId = [];
    init_news_list();
    function init_news_list(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var OweNer = function(pg_index,pg_count,cb){
            NewsService.news_list({
                "pg_index":pg_index,
                "pg_count":pg_count
            },cb);
        };
        $scope.pagination = new PaginationService(OweNer,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.allId = [];
            $scope.NewsList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.NewsList = newItems;
            newItems.forEach(function(obj){
                array.push(obj.message_id);
            });
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }

    //单选
    $scope.checkall = false;
    $scope.sChoose = function(id){
        if($scope.allId.indexOf(id) !== -1){
            $scope.allId.splice($scope.allId.indexOf(id),1);
        }else{
            $scope.allId.push(id);
        }
        if($scope.allId.length === array.length){
            $scope.checkall = true;
        }else{
            $scope.checkall = false;
        }
    };
    //全选
    $scope.allChoose = function(){
        $scope.checkall = !$scope.checkall;
        if($scope.checkall){
            $scope.allId = angular.copy(array);
        }else{
            $scope.allId = [];
        }
    };
    /**
     * 处理
     * @private
     */
    var new_ids = [];
    $scope.news_deal = function(message_id,bs_id,type,type_id){
        //处理的时候标记已读
        new_ids.push(message_id);
        NewsService.read_news({read_news_ids: new_ids},{},function(data){
            new_ids = [];
        },function(error){
            alert(error.data.msg);
            new_ids = [];
        })
        if(type === 1){
            //退款
            $location.path('/main/trade_home/refund_check/' + type_id);
        }else if(type === 2){
            //订单
            $location.path('/main/trade_home/order_detail/' + type_id);
        }
    }
    /**
     * 删除
     */
    var delete_news_ids = [ ];
    $scope.news_delete = function(id){
        delete_news_ids.push(id);
        NewsService.deleteBatch({delete_news_ids:delete_news_ids},{},function(data){
            delete_news_ids = [ ];
            init_news_list();
        },function(error){
            alert(error.data.msg);
        })
    }

    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});