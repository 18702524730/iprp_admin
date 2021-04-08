
angular.module('iprpAdminApp').controller('PartnerApplicationRemarksCtrl', function ($scope,$modal,$cookies,$stateParams, PaginationService, ChannelApplicationService) {
  $('#partner_application').siblings().removeClass("selected");
  $('#partner_application').addClass("selected");
  init_data();
    //上传图片

  $scope.partner_id = $stateParams.partner_id
  $scope.remarks = '';
  // console.log($cookies.get('name'))
  // 初始化数据
  function init_data(){
    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "加载中...";//加载页面内容
    var OweNer = function(pg_index,pg_count,cb){
      ChannelApplicationService.label_list({
        "pg_index":pg_index,
        "pg_count":pg_count
      },cb);
    };
    $scope.pagination = new PaginationService(OweNer,15);

    $scope.$watch('pagination.curPageItems',function(newItems){
      $scope.remarksList = [];
      if (newItems == undefined)
          return;
      if ($scope.pagination.curPageItems.length === 0){
          $scope.loading_text = "没有符合条件的记录";//加载页面内容
          return;
      }
      $scope.remarksList = newItems;
      $scope.to_loading = false;//如果不为空 结束加载页面
  });
}
$scope.addRemarks = function () {
  layer.open({
    type: 1,
    content: $('#addDialog'),
    title: '新增备注',
    // btn: ['确定', '取消'],
    btnAlign: 'c',
    anim: 2,
    // yes: function (index, layero) {
    //   if(!$scope.remarks){
    //     $scope.addRemarksForm.submitted = true;
    //   }else{
    //     console.log($scope.remarks, $cookies.get('name'))
    //   }
    // },
    // btn2: function (index, layero) {
    //   layer.close(index)
    //   return false;
    // },
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
    console.log($scope.remarks, $cookies.get('name'))
      // BillTemplateService.bill_tpl.edit_template({bill_template_id:$scope.template_id},$scope.editLabel, function(data){
      //     localStorage.removeItem('bill_template_id');
      //     $scope.$close({bill_template_id:$scope.template_id});
      // },function(error){
      //     alert(error.data.msg)
      // })
  }
}
$scope.canelAdd = function () {
  $('.layui-layer-close1').trigger('click')
}
});
