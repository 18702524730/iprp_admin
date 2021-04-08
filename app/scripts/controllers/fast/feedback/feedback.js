angular.module('iprpAdminApp').controller('feedbackCtrl',function($scope,$modal,PostalService,$stateParams,$location,$state,Upload,session,PaginationService){
  $('#feedback').addClass("selected").parent().siblings().children().removeClass("selected");
  // 添加时间控件 初始化
  $('#startTime,#endTime,#createStartTime,#createEndTime').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose:  true
  });

  $scope.typeList = [
    {name: '优化', id:1},
    {name: '问题', id:2},
    {name: '需求', id:3},
    {name: '无效信息', id:4},
  ];

  $scope.uploadFile = function (file) {
      //console.log(file.size);
      //var MAX_POST_SIZE = 10 * 1024 * 1024;
      //if(file.size > MAX_POST_SIZE){
          //alert("上传图片请小于10M");
      //}else{
          Upload.upload({
              url: options.api.base_url + '/portalsite/mainConfirmation/addXlsx.htm?access_token=' + session.accessToken,
              data: {fileData: file}
          }).then(function (resp) {
          	resp = resp.data;
            layer.alert(resp.msg);
            if (resp.code == 200) {
            	layer.alert('上传成功');
            	$scope.apply_Info();
            }
          }, function (resp) {
          	resp = resp.data;
            if (resp && resp.msg) {
            	layer.alert(resp.msg);
            }
          });
      //}
  };


  $('.datetimepicker').css('display','none');
  // 获取地址栏信息并赋值给页面
  $scope.obj = $location.search() || {};
  // 地址栏时间转换
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

  $scope.startTime = $scope.obj.startTime && MsecFormat($scope.obj.startTime);
  $scope.endTime = $scope.obj.endTime && MsecFormat($scope.obj.endTime);
  $scope.createStartTime = $scope.obj.createStartTime && MsecFormat($scope.obj.createStartTime);
  $scope.createEndTime = $scope.obj.createEndTime && MsecFormat($scope.obj.createEndTime);

  //获取时间
  var get_time = function (name, isEnd) {
    if (!$scope[name] ) {
      return ''
    } else {
      var t = new Date($scope[name]).getTime();
      return isEnd ? t + 86399000 : t;
    }
  };

  $scope.apply_Info = function(){
  	console.log($scope.obj)
  	var OweNer = function (pg_index, pg_count, cb) {
      //url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
      if ($scope.obj.pg_index) {
        pg_index = $scope.obj.pg_index;
        $scope.obj.pg_index = '';
      }

      var pageConfig = {
        "pg_index": pg_index,
        "pg_count": pg_count
      };
      var object = $.extend({}, $scope.obj, pageConfig);
      $location.path('main/fast_home/feedback').search(object);
      PostalService.findOpinionFeedback(object, cb);
    };

    $scope.pagination = new PaginationService(OweNer, 5, $scope.obj.pg_index);

    $scope.$watch('pagination.curPageItems', function (newItems) {
      $scope.ApplyList = [];
      console.log(newItems)
      if (newItems == undefined)
        return;
      if ($scope.pagination.curPageItems.length === 0) {
        $scope.loading_text = "没有符合条件的记录";//加载页面内容
        $scope.to_loading = true;
        return;
      }
      $scope.ApplyList = newItems;

      setTimeout(function(){
      	$("[data-toggle='popover']").popover({ trigger: "manual" , html: true, animation:false})
      	.on("mouseenter", function () {
		        var _this = this;   // 这里的this触发的dom,需要存起来 否则在下面 .popover的逻辑中this会变为弹出的dom
		        $(this).popover("show");
		        $(".popover").on("mouseleave", function () {
		            $(_this).popover('hide');
		        });
		    }).on("mouseleave", function () {
		        var _this = this;
		        setTimeout(function () {
		            if (!$(".popover:hover").length) {
		                $(_this).popover("hide");
		            }
		        }, 300);
		    });
      },1000);
      $scope.to_loading = false;//如果不为空 结束加载页面
    });
  }
  $scope.apply_Info();

  $scope.exportData = function(){
  	var pageConfig = {
      "startTime": get_time("startTime"),
      "endTime": get_time("endTime", true),
      "createStartTime": get_time("createStartTime"),
      "createEndTime": get_time("createEndTime", true)
    };
    var object = $.extend({}, $scope.obj, pageConfig);
    object.access_token = session.accessToken;
    location.href = options.api.base_url + '/portalsite/mainConfirmation/downXlsx.htm?' + $.param(object);
  }

  // 查询
  $scope.search_apply = function(){
    $scope.obj.startOpinionTime = new Date($scope.obj.startOpinionTime).getTime() || null;
    $scope.obj.endOpinionTime = $scope.obj.endOpinionTime ? new Date($scope.obj.endOpinionTime).getTime() + 86399000 : null;
    $scope.apply_Info();
  };

  //定时刷新
  // window.postalTimer && clearInterval(window.postalTimer);
  // window.postalTimer = setInterval(function(){
  // 	$scope.search_apply();
  // }, 60000);

  $scope.$on('$destroy', function(e){
  	console.log('$destroy postalTimer');
	  window.postalTimer && clearInterval(window.postalTimer);
	});

  // 重置
  $scope.search_reset = function(){
    $scope.obj = {}
    $scope.startTime = null;
    $scope.endTime = null;
    $scope.createStartTime = null;
    $scope.createEndTime = null;
    $scope.apply_Info();
  }
  // 确认联系
  $scope.edit= function(item){
    $modal.open({
        resolve:{
          item : function(){
              return item;
          }
        },
        backdrop:false,
        keyboard:true,
        templateUrl: 'package\\modal\\fast\\editFeedback.html',
        controller: 'editFeedbackCtrl'
    }).result.then(function (result) {
    		$state.reload();
        return;
        /*if (result.isPop == 0) {
            $state.reload();
            return;
        }
        $state.go('main.fast_home.tel_service_detail', {consultationId: $scope.order_detail.consultationId, isPop:0});*/
    });
};
})
