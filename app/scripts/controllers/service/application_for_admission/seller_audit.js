angular.module('iprpAdminApp').controller('SellerAuditCtrl', function ($cookies,$scope,$modal,$stateParams, ChannelApplicationService,PaginationService,$location, Upload) {
    $('#seller_application').siblings().removeClass("selected");
    $('#seller_application').addClass("selected");
		console.log('seller_id',$stateParams.seller_id)
  	console.log($cookies.get('name'))
		init_label_data();
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
    $scope.comfirmFeedback = function () {
			layer.confirm('是否已向申请人反馈？', {
				title: '提示',
				btn: ['是', '否']
			}, function(index, layero){
				console.log($stateParams.seller_id)
			}, function(index){
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
				// console.log($scope.remarks, $cookies.get('name'))
				var adminRemark = []

				var adminRemark = $scope.audit_data.adminRemark || [];
				adminRemark.push({operator: $cookies.get('name'), createTime: new Date().getTime(), content: $scope.remarks})
				adminRemark = JSON.stringify(adminRemark)
				console.log('adminremarks', adminRemark)
				$('.layui-layer-close1').trigger('click')
				ChannelApplicationService.addRemarks({applyId: $stateParams.seller_id,adminRemark: adminRemark}, function(data){
					layer.msg('操作成功')
					$scope.audit_data.adminRemark = JSON.parse(data.adminRemark)
				
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
				// console.log($scope.auditFormData)
			// BillTemplateService.bill_tpl.edit_template({bill_template_id:$scope.template_id},$scope.editLabel, function(data){
			//     localStorage.removeItem('bill_template_id');
			//     $scope.$close({bill_template_id:$scope.template_id});
			// },function(error){
			//     alert(error.data.msg)
			// })
			}	
		}
  });
  