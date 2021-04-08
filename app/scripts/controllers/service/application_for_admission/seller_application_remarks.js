
angular.module('iprpAdminApp').controller('SellerApplicationRemarksCtrl', function ($location,$scope,$modal,$cookies,$stateParams, PaginationService, ChannelApplicationService) {
  $('#seller_application').siblings().removeClass("selected");
  $('#seller_application').addClass("selected");
  init_label_data();
    //上传图片

  $scope.seller_id = $stateParams.seller_id
  $scope.id = $stateParams.id
  // console.log($cookies.get('name'))
  // 初始化数据
  function init_label_data(){
    ChannelApplicationService.getServiceInfo({phone: $stateParams.seller_id}, function(data){
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      if (data.nameStatus == 0) {
        data.nameStatusText = "待认证"
      }
      if (data.nameStatus == 1) {
        data.nameStatusText = "待审核"
      }
      if (data.nameStatus == 2) {
        data.nameStatusText = "审核不通过"
      }
      if (data.nameStatus == 3) {
        data.nameStatusText = "审核通过"
      }
      if (data.spType == 2) {
        data.spTypeText = "个人"
      }
      if (data.spType == 1) {
        data.spTypeText = "公司"
      }
      if (data.spType == 3) {
        data.spTypeText = "个体工商户"
      }
      
      $scope.serviceData = data;
      $scope.to_loading = false;//如果不为空 结束加载页面
      console.log($scope.audit_data)
    }, function(error){
      layer.msg(error.data.msg);
    })
  }


// $scope.confirmAudit = function () {
// // putService
// // layer.msg('hello');
// // return
//   ChannelApplicationService.putService({id: $scope.serviceData.sp_id, nameStatus: '3'}, function(data){
//     layer.msg('提交成功')
//   }, function(error){
//     alert(error.data.msg);
//   })
// }

$scope.confirmAudit = function () {
  layer.open({
    type: 1,
    content: $('#addDialog'),
    title: '请选择认证状态',
    // btn: ['确定', '取消'],
    btnAlign: 'c',
    anim: 2,

    cancel: function (index, layero) {
      layer.close(index)
      return false;
    }
  })
}

$scope.comfirmAdd = function () {
  if(!$scope.remarks){
    $scope.addRemarksForm.submitted = true;
  }else{
    $('.layui-layer-close1').trigger('click')
    ChannelApplicationService.putService({id: $scope.serviceData.sp_id, nameStatus: $scope.remarks}, function(data){
      layer.msg('提交成功')
      $location.path('main/merchant_home/seller_application');
    }, function(error){
      layer.msg(error.data.msg)
    })
    console.log($scope.remarks)
  }
}
$scope.canelAdd = function () {
  $('.layui-layer-close1').trigger('click')
}
});
