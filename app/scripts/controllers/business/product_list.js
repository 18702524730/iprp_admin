angular.module('iprpAdminApp').controller('ProductListCtrl',function($scope,ProductService,PaginationService,$location,$state){
    $('#product_list').addClass("selected").parent().siblings().children().removeClass("selected");

    // 添加时间控件 初始化
    $('#onShelvesTimeStart,#onShelvesTimeEnd,#offShelfTimeStart,#offShelfTimeEnd').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      todayBtn:  1,
      autoclose:  true
    });
    $('.datetimepicker').css('display','none');

    // 所属业务
    function request_businessTypes(){
        ProductService.businessTypeList(function(resp){
            if(resp.code == 'success'){
                $scope.businessTypes = resp.data;
            }else {
                console.error(resp.msg);
            }
        })
    }
    request_businessTypes();

    var MsecFormat = function (input) {
        if(input == null || input=='' || typeof(input) == "undefined"){
            return "--";
        }
        var _date = new Date(input-0);
        var year = _date.getFullYear();
        var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
        var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
        var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
        var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
        var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
        return year + "-" + month + "-" + day;
    };
    $scope.obj = $location.search() || {};
    $scope.onShelvesTimeStart = $scope.obj.onShelvesTimeStart && MsecFormat($scope.obj.onShelvesTimeStart);
    $scope.onShelvesTimeEnd = $scope.obj.onShelvesTimeEnd && MsecFormat($scope.obj.onShelvesTimeEnd-86399000);
    $scope.offShelfTimeStart = $scope.obj.offShelfTimeStart && MsecFormat($scope.obj.offShelfTimeStart);
    $scope.offShelfTimeEnd = $scope.obj.offShelfTimeEnd  && MsecFormat($scope.obj.offShelfTimeEnd-86399000);
    init_order_list();

    function init_order_list(needInit) {
        if (needInit) {
            $scope.obj = $location.search() || {};
        }
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容

        //获取时间
        var get_time = function (name, isEnd) {
          if (!$scope[name] ) {
            return ''
          } else {
            var t = new Date($scope[name]).getTime();
            return isEnd ? t + 86399000 : t;
          }
        };

        var OweNer = function (pg_index, pg_count, cb) {
            //url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
            if ($scope.obj.pg_index) {
                pg_index = $scope.obj.pg_index;
                $scope.obj.pg_index = '';
            }
            var pageConfig = {
                "pg_index": pg_index,
                "pg_count": pg_count,
                "onShelvesTimeStart": get_time("onShelvesTimeStart"),
                "onShelvesTimeEnd": get_time("onShelvesTimeEnd", true),
                "offShelfTimeStart": get_time("offShelfTimeStart"),
                "offShelfTimeEnd": get_time("offShelfTimeEnd", true)
            };
            var object = $.extend({}, $scope.obj, pageConfig);
            $location.search(object).replace();
            ProductService.list(object, cb);
        };
        $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index);

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.OrderList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.OrderList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    //按条件查询
    $scope.search_order = function(){
        init_order_list();
    }

    $scope.search_reset = function () {
        $scope.obj = { };
        $scope.onShelvesTimeStart = null;
        $scope.onShelvesTimeEnd = null;
        $scope.offShelfTimeStart = null;
        $scope.offShelfTimeEnd = null;
        init_order_list();
    }

    //查看
    $scope.viewGood = function(index){
      $state.go('main.business_home.product_detail', {productPriceId: index});
    }

    // 上架、下架、删除 更新状态接口
    $scope.updateGoodState = function(productPriceId, state){
        ProductService.update_good_state({
            productPriceId: productPriceId,
            state: state
        }, function(resp){
            if(resp.code == 'success'){
                layer.alert('操作成功');
                init_order_list(true);
            }else{
                layer.alert(resp.msg);
            }
        });
    }

    //上架
    $scope.onShelves = function(item){
      layer.confirm('确定上架该商品？', {
        btn: ['确定','取消'] //按钮
      }, function(index){
        $scope.updateGoodState(item.productPriceId, 1);
        layer.close(index);
      }, function(){
      });
    }

    //下架
    $scope.offShelf = function(item){
      layer.confirm('确定下架该商品？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        $scope.updateGoodState(item.productPriceId, 3);
        layer.close(index);
      }, function(){
      });
    }

    //删除
    $scope.deleteGood = function(item){
      layer.confirm('确定删除该商品？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        $scope.updateGoodState(item.productPriceId, 4);
        layer.close(index);
      }, function(){
      });
    }

    $scope.editDetail = function(index){
      $state.go('main.business_home.edit_good_detail', {productPriceId: index});
    }

    //提示操作
    $scope.hint=false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});

