angular.module('iprpAdminApp').controller('RecordStatisticsCtrl', function ($scope,$modal,IptService,PaginationService,$location) {
  $('#record_statistics').siblings().removeClass("selected");
  $('#record_statistics').addClass("selected");
  // 添加时间控件 初始化
  $('#iptcreateDate,#chainDate').datetimepicker({
    minView: "month", //选择日期后，不会再跳转去选择时分秒
    language:  'zh-CN',
    format: 'yyyy-mm-dd',
    todayHighlight: true,
    todayBtn:  1,
    autoclose: true
  });

  $scope.audit_data = {};
  $scope.iptCount = {}; // 珍珠统计
  $scope.iptPowerCount = {}; // 创力统计
  
  // 查询ipt统计信息
  function getCashDetailFn () {
    IptService.iptStatisticsInfo( function(data){
      $scope.audit_data = data;
    });
  }
  // 珍珠统计
  function getCountIpt(){
    IptService.countIpt( function(data){
      data.total = parseFloat(data.effectiveIpt + data.invalidIpt).toFixed(4);
      $scope.iptCount = data;
    });
  }
  // 创力统计
  function getCountIptPower () {
    IptService.countIptPower( function(data){
      $scope.iptPowerCount = data;
    });
  }
  getCountIpt();
  getCountIptPower();
  getCashDetailFn();  //查询ipt统计信息

});
