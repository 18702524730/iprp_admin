
angular.module('iprpAdminApp').controller('FastDemandDetail', function ($scope,$modal,$stateParams, Outpatient) {
  $('#outpatient_demand').siblings().removeClass("selected");
  $('#outpatient_demand').addClass("selected");
  init_data();
    //上传图片

  $scope.sellerApplicationDetail = {}
  $scope.helpId = $stateParams.id
  // 初始化数据
  function init_data () {
    Outpatient.demand_detail({helpId: $stateParams.id}, function(data){
      $scope.demandDetail = data;
      if (!$scope.demandDetail.memberDemandRemarksList || $scope.demandDetail.memberDemandRemarksList.length === 0){
        $scope.loading_text = "没有符合条件的记录";//加载页面内容
        return;
      }
    }, function(error){
      alert(error.data.msg);
    })
  }


  // init_label_data();
  $scope.type = $stateParams.type
  $scope.auditFormData = {}
  $scope.id=$stateParams.seller_id
  // 初始化数据
  function init_label_data(){
    ChannelApplicationService.seller_detail({id: $stateParams.seller_id}, function(data){
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      if (data.applyType == 0) {
        data.applyTypeText = "个人商家"
      } else if (data.applyType == 1) {
        data.applyTypeText = "机构商家"
      } else if (data.applyType == 2) {
        data.applyTypeText = "个人合伙人"
      } else if (data.applyType == 3) {
        data.applyTypeText = "机构合伙人"
      } else {
        data.applyTypeText = "--"
      }
      if (data.adminRemark) {
        if (data.adminRemark.indexOf('[') == 0) {
          data.adminRemark = JSON.parse(data.adminRemark)
        } else {
          data.adminRemark = []
        }
      }
      $scope.audit_data = data;
      console.log('addaa', $scope.audit_data)
      if ($scope.type == 'det') {
        $scope.auditFormData.auditStatus = data.confirm
        $scope.auditFormData.reason = data.confirmDesc
      }

      if (!$scope.audit_data.adminRemark || $scope.audit_data.adminRemark.length === 0){
        $scope.loading_text = "没有符合条件的记录";//加载页面内容
        return;
      }
      $scope.to_loading = false;//如果不为空 结束加载页面
      console.log($scope.audit_data)
    }, function(error){
      alert(error.data.msg);
    })
  }


  $scope.addRemarks = function () {
    layer.open({
      type: 1,
      content: $('#addDialog'),
      title: '新增备注',
      // btn: ['确定', '取消'],
      btnAlign: 'c',
      anim: 2,
      cancel: function (index, layero) {
        layer.close(index)
        return false;
      },
      success: function () {
        $scope.remarks = ''
      }
    })
  }

  $scope.comfirmAdd = function () {
    if(!$scope.remarks){
      $scope.addRemarksForm.submitted = true;
    }else{
      $('.layui-layer-close1').trigger('click')
      Outpatient.addRemarks({helpId: $stateParams.id, remarks: $scope.remarks}, function(data){
        layer.msg('操作成功')
        init_data()
      
      }, function(error){
        $('.layui-layer-close1').trigger('click')
        layer.msg(error.data.msg);

      })
    }
  }
  $scope.canelAdd = function () {
    $('.layui-layer-close1').trigger('click')
  }

  $scope.confirmAudit = function () {
    console.log('asdasa', $scope.auditFormData)
    if(!$scope.auditFormData.auditStatus){
        $scope.auditForm.submitted = true;
    }else if ($scope.auditFormData.auditStatus == '3' && !$scope.auditFormData.reason) {
        $scope.auditForm.submitted = true;
    } else {
      var tex = ''

      if ($scope.auditFormData.auditStatus == '3') {
        ChannelApplicationService.confirm({applyId: $stateParams.seller_id,confirm: $scope.auditFormData.auditStatus,confirmDesc: $scope.auditFormData.reason}, function(data){
          console.log(data)
          layer.msg('操作成功')
          $location.path('main/merchant_home/seller_audit/'+ $scope.id + '/det');
          $scope.audit_data.adminRemark = JSON.parse(data.adminRemark)
          layer.close(index); 
        }, function(error){
          layer.msg(error.data.msg)
          layer.close(index); 
        })
        return
      }
      layer.confirm('是否申请通过，并开通商家权限？', {
        title: '提示',
        btn: ['否', '是']
      }, function(index, layero){
        layer.close(index); 
      }, function(index, layero){
        layer.close(index); 
        console.log($scope.auditFormData)
        ChannelApplicationService.confirm({applyId: $stateParams.seller_id,confirm: $scope.auditFormData.auditStatus,confirmDesc: $scope.auditFormData.reason}, function(data){
          console.log(data)
          layer.msg('操作成功')
          $location.path('main/merchant_home/seller_audit/'+ $scope.id + '/det');
          $scope.audit_data.adminRemark = JSON.parse(data.adminRemark)
          
        }, function(error){
          layer.msg(error.data.msg)
          layer.close(index); 
        })
      });
    }	
  }
});
