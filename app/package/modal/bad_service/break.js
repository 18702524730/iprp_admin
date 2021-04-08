angular.module('iprpAdminApp').controller('BreakCtrl', function ($scope,bs_class_name,name,is_bad_state,create_time,update_time,$location) {

    $scope.obj = { };
    $scope.BsClassName = bs_class_name;
    $scope.BsName = name;
    $scope.is_bad_state = is_bad_state;
    $scope.create_time = new Date().getTime();
    $scope.obj.query_end_date = new Date().getTime();
    setTimeout(function(){
	  	// 添加时间控件 初始化
	    $('#query_end_date').datetimepicker({
	      minView: "month", //选择日期后，不会再跳转去选择时分秒
	      language:  'zh-CN',
	      format: 'yyyy-mm-dd',
	      todayHighlight: true,
	      todayBtn:  1,
	      autoclose:  true
	    });
	    $('.datetimepicker').css('display','none');
    }, 300);

    $scope.save = function(){
      var query_end_date = $scope.obj.query_end_date;
      $scope.update_time = new Date(query_end_date).getTime();
      $scope.$close({/*create_time:$scope.create_time ,*/openTime : $scope.update_time});
    }

    $scope.cancel = function () {
      $scope.$dismiss("cancel");
    };
});