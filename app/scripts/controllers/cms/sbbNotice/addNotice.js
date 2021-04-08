angular.module('iprpAdminApp').controller('AddNoticeCtrl',function($scope,$modal,session,$cookies,Upload,SbbService,$stateParams,$location,orderService){
  $('#sbb_notice').addClass("selected").parent().siblings().children().removeClass("selected");

  $scope.obj = {title: '', content: '', category: 2};
  $scope.range = function(n) {
      return new Array(n);
  }
  $('#startCreateDate,#startPickDate,#endPickDate,#endCreateDate').datetimepicker({
    minView: "0", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd hh:ii',
    todayHighlight: true,
    todayBtn:  1,
    autoclose: true
  });

  $scope.getDetail = function(){
    SbbService.findEvaluateGoodsDetail({id: $stateParams.id},function(data){
      console.log(data)
      $scope.obj = data;
    },function(error){
      alert(error.data.msg);
    });
  };
  if ($stateParams.id) {
    $scope.getDetail();
  }


  $scope.addGoodClick = function () {
    var obj = $scope.obj;
    if (!obj.title) {
      layer.msg('请输入公告标题')
      return
    }
    if (!obj.content) {
      layer.msg('请输入公告内容')
      return
    }
    var object;
    if ($stateParams.id) {
      object = $.extend({}, $scope.obj, {id: $stateParams.id});
    } else {
      object = $.extend({}, $scope.obj);
    }
    SbbService.addAndUpdateMarketingContent($scope.obj, function(data){
      layer.msg('操作成功');
      history.go(-1);
      // $scope.getDetail();
    });
    console.log($scope.obj)
  }


   $scope.back = function(){
     history.go(-1);
   };

   $scope.setShow = function(isHide){
     SbbService.updateEvaluateGoodsState({
       id: $stateParams.id,
       isHide: isHide ? 1 : 0
     },function(data) {
       layer.msg('操作成功')
       $scope.getDetail();
     })
   };
});

