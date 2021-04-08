angular.module('iprpAdminApp').controller('zsAiCtrl', function ($scope,InvoiceService,PaginationService,$location,$resource,session) {
    $('#zs_ai').parent().siblings().children('a').removeClass("selected");
    $('#zs_ai').addClass("selected");
    // 添加时间控件 初始化
    $('#payTimeBegin,#payTimeEnd').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      todayBtn:  1,
      autoclose: true
    });
    //获取时间
    var get_time = function (name, isEnd) {
        if (!$scope[name] ) {
            return ''
        } else {
            var t = new Date($scope[name]).getTime();
            return isEnd ? t + 86399000 : t;
        }
    };
    function zsAiInfo(){
      InvoiceService.zs_ai.update({
        tradeNo:$scope.obj.trade_no,
        orderSn:$scope.obj.order_sn,
        startPayTime:get_time('payTimeBegin'),
        endPayTime:get_time('payTimeEnd',true)
      },function(data){
        console.log(data);
        $scope.moneyNumber=data;
      })
    }
    // 选择时间限制，开始时间不能超过结束时间
    $scope.$watch('payTimeBegin', function (newItems) {
        if ($scope.payTimeEnd && $scope.payTimeBegin) {
            if (new Date($scope.payTimeEnd).getTime() < new Date($scope.payTimeBegin).getTime()) {
                layer.alert('结束时间需大于开始时间')
                return;
           }
           if (( new Date($scope.payTimeEnd).getTime() - new Date($scope.payTimeBegin).getTime() )> 29*60*60*24*1000) {
                layer.alert('时间跨度不能超过30天')
                return; 
           }
        }
    });
    $scope.$watch('payTimeEnd', function (newItems) {
        if ($scope.payTimeEnd && $scope.payTimeBegin) {
            if (new Date($scope.payTimeEnd).getTime() < new Date($scope.payTimeBegin).getTime()) {
                layer.alert('结束时间需大于开始时间')
                return;
           }
           if (( new Date($scope.payTimeEnd).getTime() - new Date($scope.payTimeBegin).getTime() )> 29*60*60*24*1000) {
                layer.alert('时间跨度不能超过30天')
                return;
           }
        }
    });

    /**
     * 按条件查询
     */
    //获取时间
    var get_time = function (name, isEnd) {
      if (!$scope[name] ) {
        return ''
      } else {
        var t = new Date($scope[name]).getTime();
        return isEnd ? t + 86399000 : t;
      }
    };
    $scope.download = function(){
        if ((!$scope.payTimeBegin || !$scope.payTimeEnd)&&!$scope.obj.trade_no&&!$scope.obj.order_sn) {
            layer.alert('请输入筛选条件')
            return;
        }
        if (new Date($scope.payTimeEnd).getTime() < new Date($scope.payTimeBegin).getTime()) {
            layer.alert('结束时间需大于开始时间')
            return;
        }
        if (( new Date($scope.payTimeEnd).getTime() - new Date($scope.payTimeBegin).getTime() )> 29*60*60*24*1000) {
            layer.alert('时间跨度不能超过30天')
            return;
        }
        $scope.apply_Info();
    };
    $scope.obj={
        pg_index:0   
    }
    // 查询
    $scope.apply_Info = function(){
        zsAiInfo();
        var OweNer = function (pg_index, pg_count, cb) { 
          //获取时间
          var get_time = function (name, isEnd) {
            if (!$scope[name] ) {
              return ''
            } else {
              var t = new Date($scope[name]).getTime();
              return isEnd ? t + 86399000 : t;
            }
          };

        var pageConfig = {
            pg_index:pg_index,
            pg_count:15,
            tradeNo:$scope.obj.trade_no,
            orderSn:$scope.obj.order_sn,
            startPayTime:get_time('payTimeBegin'),
            endPayTime:get_time('payTimeEnd',true),
        };
        var object = $.extend({}, $scope.obj, pageConfig);
        // $location.path('main/fast_home/feedback_apply').search(object);
        InvoiceService.zs_ai.reconci(object, cb);
        };

        $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index); 

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.InfoList = [];
            if (newItems == undefined)
                return;
                
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                $scope.to_loading = true;
                return;
            }
            $scope.InfoList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    // 详情页跳转
    $scope.detail_orders = function(index){
        $location.path('main/trade_home/order_detail/' + index);
    }
    // 数据初始化
    $scope.reset=function(){
        $scope.obj.trade_no='';
        $scope.obj.order_sn='';
        $scope.payTimeBegin='';
        $scope.payTimeEnd='';
    }
    // 导出数据
    $scope.downloadExcle=function(){
        //获取时间
        var get_time = function (name, isEnd) {
            if (!$scope[name] ) {
            return ''
            } else {
            var t = new Date($scope[name]).getTime();
            return isEnd ? t + 86399000 : t;
            }
        };
        var startTime=get_time('payTimeBegin')?get_time('payTimeBegin'):'';
        var endTime=get_time('payTimeEnd',true)?get_time('payTimeEnd',true):'';
        var tradeNo=$scope.obj.trade_no?$scope.obj.trade_no:'';
        var orderSn=$scope.obj.order_sn?$scope.obj.order_sn:'';
        window.open(options.api.base_url+"/reportList?startPayTime="+startTime+"&endPayTime="+endTime+"&tradeNo="+tradeNo+"&orderSn="+orderSn)
    }
    
})