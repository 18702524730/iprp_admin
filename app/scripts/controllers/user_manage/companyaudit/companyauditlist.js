angular.module('iprpAdminApp').controller('CompanyAuditListCtrl', function ($scope,$modal, PaginationService,bsOrderService,$location) {
    $('#company_certification_list').removeClass("selected");
    $('#assignService_list').removeClass("selected");
    $('#company_certification_list').siblings().removeClass("selected");
    $('#company_certification_list').addClass("selected");
    // 添加时间控件 初始化
    $('#complete_end_time,#complete_start_time').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      todayBtn:  1,
      autoclose: true
    });
    $('.datetimepicker').css('display','none');
    $scope.obj = $location.search() || {};
    $scope.checkstatus= {};
    $scope.checkstatus.isChecked = '2'
    //获取时间 start_create_time
    var get_start_create_time = function () {
        if (!$scope.createTimeStart ) {
          return null
        } else {
          if (!$scope.obj.createTimeStart) {
            return new Date($scope.createTimeStart).getTime();
          } else {
            if (typeof $scope.obj.createTimeStart != 'string') {
              return new Date($scope.obj.createTimeStart).getTime()
            } else {
              return $scope.obj.createTimeStart - 0;
            }
          }
        }
      };
      //获取时间  end_create_time
      var get_end_create_time = function () {
        if(!$scope.createTimeEnd) {
          return null
        } else {
          if(!$scope.obj.createTimeEnd) {
            return new Date($scope.createTimeEnd).getTime() + 86399000
          } else {
            if(typeof $scope.obj.createTimeEnd != 'string' ) {
              return new Date($scope.obj.createTimeEnd).getTime() ;
            } else {
              return parseInt($scope.obj.createTimeEnd,10) ;
            }
          }
        }
      };
    function init_member_manage_list(){
       
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        
        var OweNer = function(pg_index,pg_count,cb){
            var pageConfig = {
                "pg_index": pg_index,
                "pg_count": pg_count,
                // "createTimeStart": get_start_create_time(),
                // "createTimeEnd": get_end_create_time(),
            };
            if($scope.checkstatus.isChecked){
              $scope.obj.isChecked =$scope.checkstatus.isChecked
            }else{
              $scope.obj.isChecked = null
            }
            var object = $.extend({}, $scope.obj,pageConfig);
            bsOrderService.company_audit_list(object, cb);
            var o = $.extend({}, object);
            $location.path('main/user_home/company_audit_list').search(o);
        };
        $scope.pagination = new PaginationService(OweNer, 15);

        $scope.$watch('pagination.curPageItems',function(newItems){
            $scope.member_list = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0){
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.member_list = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    init_member_manage_list();


    
    $scope.search = function(){
        init_member_manage_list();
    };
    $scope.reset = function(){
        $scope.obj = {}
        $scope.checkstatus ={}
        init_member_manage_list();
    };
    //查看详情
    $scope.detail_orders = function(index){
        $location.path('main/user_home/company_audit_detail/' + index);
    };
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
