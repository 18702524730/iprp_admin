angular.module('iprpAdminApp').controller('telServiceCtrl',function($scope,telService,PaginationService,$location,$state, session,$interval){
   $('#tel_service_list').addClass("selected").parent().siblings().children().removeClass("selected");

  //查询接待员
  telService.findAllReceptionName(function(data){
      $scope.receptions = data;
  },function(error){
      alert(error.data.msg);
  });

  $scope.adminId = session.admin_id;

  //跳转详情页面
  $scope.viewDetail = function(item, isPop, isAdd){
    var ret = {};
    if (isPop) {
      ret.isPop = 1
    }
    if (isAdd) {
      ret.isAdd = 1
    }
    $location.path('main/fast_home/tel_service_detail/'+item.consultationId).search(ret);
  };

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
  $scope.OrderList = [];
  // 自动刷新数据
  var timer= $interval(function(){
    roundRobin();
  },30000);
  // 路由变化即清除计时器
  $scope.$on("$destroy", function() {
    if (angular.isDefined(timer)) {
      $interval.cancel(timer);
      timer = undefined;
    }
  });
  //轮循刷新数据
  function roundRobin(){
      var OweNer = function (pg_index, pg_count, cb) {
        //url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
        if ($scope.obj.pg_index) {
          pg_index = $scope.obj.pg_index;
          $scope.obj.pg_index = '';
        }
        var pageConfig = {
            "pg_index":pg_index,
            "pg_count":pg_count
        };
        var object = $.extend({}, $scope.obj, pageConfig);
        $location.path('main/fast_home/tel_service').search(object);

        telService.list(object, cb);
        telService.list(object,function(data){
          $scope.OrderList = data.elements;
        });
      };

      $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index);
  }
  init_order_list();

  function init_order_list(needInit) {
      if (needInit) {
        $scope.obj = $location.search() || {};
      }
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      var OweNer = function (pg_index, pg_count, cb) {
        //url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
        if ($scope.obj.pg_index) {
          pg_index = $scope.obj.pg_index;
          $scope.obj.pg_index = '';
        }
        var pageConfig = {
            "pg_index":pg_index,
            "pg_count":pg_count
        };
        var object = $.extend({}, $scope.obj, pageConfig);
        $location.path('main/fast_home/tel_service').search(object);
        telService.list(object, cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index);
      $scope.$watch('pagination.curPageItems', function (newItems) {
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
      $scope.obj.pg_index = 0;
      init_order_list();
    }

    $scope.search_reset = function () {
        $scope.obj = {};
        $scope.start_notarization_time = null;
        $scope.end_notarization_time = null;
        $scope.start_create_time = null;
        $scope.end_create_time = null;
        init_order_list();
    }

    $scope.zoom = function(item){
    	var str = '<p class="contact">'+item.contactName+ (item.sex ? ('/'+ (item.sex==1 ? '先生' : '女士')) : '') + ((item.contactName || item.sex) ? '<br>' : '' )+ '<span>'+item.contactPhone.slice(0,3)+'-'+item.contactPhone.slice(3,7)+'-'+item.contactPhone.slice(7)+'</span></p>';
      layer.alert('',{
        title:'联系方式',
        type: 0,
        shadeClose:true,
        content: str,
        btn: ''
      }, function(index){
        layer.close(index);
      });
      /*layer.confirm('',{
        title:'联系方式',
        type: 0,
        content: '<p class="contact">'+item.contactName+'/'+ (item.sex==1 ? '先生' : '女士') + '<br><span>'+item.contactPhone.slice(0,3)+'-'+item.contactPhone.slice(3,7)+'-'+item.contactPhone.slice(7)+'</span></p>',
        btn: ['确认联系']
      }, function(index){
        layer.close(index);
        $state.go('main.fast_home.tel_service_detail', {consultationId: item.consultationId, isPop: 1});
      });*/
    }

    /**
     * 接待
     * @param index
     */
    $scope.reception = function(item){
      telService.reception({
        fkConsultationId: item.consultationId
      },function(data){
        init_order_list(true);
      },function(error){
        alert(error.data.msg);
      });
    }

    //提示操作
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
