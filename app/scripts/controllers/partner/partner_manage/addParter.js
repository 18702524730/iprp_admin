angular.module('iprpAdminApp').controller('PartnerAddCtrl', function ($scope,$modal,PartnerService,PaginationService,$location) {
  $('#partner_manage').siblings().removeClass("selected");
  $('#partner_manage').addClass("selected");

  $scope.obj = {
    memberPhone: '', parentMemberPhone: '', nickname: '', storename: '', organizationName: '', unifiedCreditCode: ''
  };
  $scope.addGoodBackClick = function () {
    $location.path('/main/partner_home/partner_manage');
  }
  $scope.confirm = function(){
    if (!$scope.obj.memberPhone) {
      layer.msg('请填写用户手机号');
      return;
    }
    let phoneReg = /^1[3-9]\d{9}$/
    if (!$scope.obj.parentMemberPhone) {
      layer.msg('请填写邀请人手机号');
      return;
    }
    if ($scope.obj.parentMemberPhone&&!phoneReg.test($scope.obj.parentMemberPhone)) {
      layer.msg('邀请人手机号格式不正确');
      return;
    }
    if (!phoneReg.test($scope.obj.memberPhone)) {
      layer.msg('用户手机号格式不正确');
      return;
    }
    if (!$scope.obj.nickname) {
      layer.msg('请填写用户昵称');
      return;
    }
    if (!$scope.obj.storename) {
      layer.msg('请填写店铺名称');
      return;
    }
    if (!$scope.obj.organizationName) {
      layer.msg('请填写机构名称');
      return;
    }
    if (!$scope.obj.unifiedCreditCode) {
      layer.msg('请填写组织机构代码');
      return;
    }
    layer.open({
      title: '提示'
      ,content: '确定创建该账号？'
      ,btn: ['确定', '取消']
      ,yes:function(index, layero){
        layer.close(index);

        PartnerService.addPartner($scope.obj, function (data) {
          layer.msg('创建成功');
          $location.path('/main/partner_home/partner_manage');
        }, function (err) {
          if (err.data.msg) {
            layer.open({
              title: '提示'
              ,content: '创建失败：'+err.data.msg
              ,btn: ['确定']
              ,yes: function(ind){
                layer.close(ind)
              }
            })
          }
          console.log('err', err.data.msg)
        })
      },
      btn2: function(index, layero){
        layer.close(index);
      }
    });
  }
});
