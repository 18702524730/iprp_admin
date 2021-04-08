angular.module('iprpAdminApp').controller('MarketActiveSetCtrl',function($scope,marKetList,ChannelService,PaginationService,$location,$state,$http){
  $('#order_list').addClass("selected").parent().siblings().children().removeClass("selected");

    var MsecFormat = function (input) {
        if(input == null || input=='' || typeof(input) == "undefined"){
            return "--";
        }
    };
    
    $scope.reallist = [{}];
    init_order_list();
    function init_order_list() {
        $scope.to_loading = true;//默认 开始 加载
        var OweNer = function (pg_index, pg_count, cb) {
            var pageConfig = {
                "pg_index": pg_index,
                "pg_count": pg_count
            };
            $location.path('main/market_home/activeSet');
            marKetList.winnum(pageConfig, cb);//中奖记录
        };
        $scope.pagination = new PaginationService(OweNer, 15);//中奖记录
        //中奖记录
        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.OrderList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                return;
            }
            $scope.OrderList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //实时榜单
    $scope.reallist = [];
    $scope.lucklist = [];
    realtime();
    function realtime(){
        marKetList.realTime({"pageNo": 0,"pageSize": 20},function(data){
            $scope.reallist = data.data;
        },function(error){

        });
        marKetList.luckyList({"pageNo": 0,"pageSize": 20},function(data){
            $scope.lucklist = data.data;
        },function(error){

        });
    }
    //送话费剩余名额
    phone_list();
    $scope.datalist=[];
    function phone_list(){
        marKetList.activeList({},function(data){
            $scope.phonebill = data;
            for(var i=0;i<data.length;i++){
                $scope.datalist.push(data[i].num);
            }
        },function(error){

        })
    };
    $scope.phonenumber = function(item,id,index){
        var num = parseInt(item);
        if(item>=$scope.datalist[index]){
            alert("输入的数量不得大于当前值");
            return;
        }

        marKetList.activeChange({id:id,num:num},function(data){
            alert("修改成功！")
        },function(){

        })
    }
    // 实时榜单
    $scope.realclick = function(){
        let realnum = $scope.reallist.length;
        for(var i=0;i<realnum;i++){
            if(!$scope.reallist[i].prizeNum){
                $scope.reallist[i].prizeNum = 1;
            }
        };
        marKetList.setReal({},$scope.reallist,function(data){
            alert("修改成功！")
        },function(){

        })
    }
    // 幸运榜单
    $scope.luckclick = function(){
        let lucknum = $scope.lucklist.length;
        for(var i=0;i<lucknum;i++){
            if(!$scope.lucklist[i].prizeNum){
                $scope.lucklist[i].prizeNum = 1;
            }
        };
        marKetList.setLucky({},$scope.lucklist,function(data){
            alert("修改成功！")
        },function(){

        })
    }
});

