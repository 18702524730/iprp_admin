angular.module('iprpAdminApp').controller('ExpressCtrl',function($scope,PaginationService,ExpressService,session){
    $('#express_list').siblings().removeClass("selected");
    $('#express_list').addClass("selected");
    $scope.letters = [{ter:'A'},{ter:'B'},{ter:'C'},{ter:'D'},{ter:'E'},{ter:'F'},{ter:'G'},{ter:'H'},{ter:'I'},
        {ter:'J'},{ter:'K'},{ter:'L'},{ter:'M'},{ter:'N'},{ter:'O'},{ter:'P'},{ter:'Q'},{ter:'R'},{ter:'S'},{ter:'T'},{ter:'U'},{ter:'V'},{ter:'W'},{ter:'X'},{ter:'Y'},{ter:'Z'}];
    inti_express();
    function inti_express(){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var feachOwener = function(pg_index,pg_count,cb){
            ExpressService.express.list({
                "pg_index":pg_index,
                "pg_count":pg_count
            },cb);
        };
        $scope.pagination = new PaginationService(feachOwener,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.expressList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.expressList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //修改状态
    $scope.expressState = function(state,id){
        if(state === 1){
            state = 0;
        }else{
            state = 1;
        }
        ExpressService.express.edit({express_id:id,state:state},{},function(data){
            inti_express();
        },function(error){
            alert(error.data.msg);
        })
    };
    //修改常用
    $scope.expressOrder = function(is_order,id){
        if(is_order === true){
            is_order = false;
        }else{
            is_order = true;
        }
        ExpressService.express.edit({express_id:id,is_order:is_order},{},function(data){
            inti_express();
        },function(error){
            alert(error.data.msg);
        })
    };
    //根据首字母筛选
    $scope.expressLetter = function(letter){
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        var feachOwener = function(pg_index,pg_count,cb){
            ExpressService.express.list({
                "pg_index":pg_index,
                "pg_count":pg_count,
                "e_letter" : letter
            },cb);
        };
        $scope.pagination = new PaginationService(feachOwener,15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.expressList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.expressList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    };
    //提示操作
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
