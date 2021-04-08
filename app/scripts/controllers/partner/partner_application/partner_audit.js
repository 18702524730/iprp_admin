angular.module('iprpAdminApp').controller('PartnerAuditCtrl', function ($cookies,$scope,$modal,$stateParams, ChannelApplicationService,PaginationService,$location, Upload) {
    $('#partner_application').siblings().removeClass("selected");
    $('#partner_application').addClass("selected");

		setTimeout(function(){
			init_label_data();
		},100)
		$scope.auditFormData = {}
		$scope.type=$stateParams.type
		$scope.id=$stateParams.partner_id
		console.log($scope.id)

    // 初始化数据
    function init_label_data(){
			var detailData;
			if ($stateParams.partner_id.length == 11) {
				ChannelApplicationService.parter_detail({id: $stateParams.partner_id}, function(data){
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
					if ($scope.type == 'det') {
						$scope.auditFormData.auditStatus = data.confirm
						$scope.auditFormData.reason = data.confirmDesc
					}
					if (!$scope.audit_data.adminRemark || $scope.audit_data.adminRemark.length === 0){
						$scope.loading_text = "没有符合条件的记录";//加载页面内容
						return;
					}
					$scope.to_loading = false;//如果不为空 结束加载页面
					console.log(data)
				}, function(error){
					alert(error.data.msg);
				})
			} else {
				ChannelApplicationService.seller_detail({id: $stateParams.partner_id}, function(data){
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
					if ($scope.type == 'det') {
						$scope.auditFormData.auditStatus = data.confirm
						$scope.auditFormData.reason = data.confirmDesc
					}
					if (!$scope.audit_data.adminRemark || $scope.audit_data.adminRemark.length === 0){
						$scope.loading_text = "没有符合条件的记录";//加载页面内容
						return;
					}
					$scope.to_loading = false;//如果不为空 结束加载页面
					console.log(data)
				}, function(error){
					alert(error.data.msg);
				})
			}

    }
    $scope.comfirmFeedback = function () {
			layer.confirm('是否已向申请人反馈？', {
				title: '提示',
				btn: ['是', '否']
			}, function(index, layero){
				console.log($stateParams.partner_id)
			}, function(index){
			});
		}
		$scope.confirmAudit = function () {
			if(!$scope.auditFormData.auditStatus){
					$scope.auditForm.submitted = true;
					return
			} else if ($scope.auditFormData.auditStatus == '3' && !$scope.auditFormData.reason) {
					$scope.auditForm.submitted = true;
			} else {
				console.log($scope.auditFormData)
				ChannelApplicationService.confirm({applyId: $stateParams.partner_id,confirm: $scope.auditFormData.auditStatus,confirmDesc: $scope.auditFormData.reason}, function(data){
					console.log(data)
					layer.msg('提交成功')
					// $location.path('main/merchant_home/partner_application');
					$location.path('main/partner_home/partner_audit/'+ $scope.id + '/det');
				}, function(error){
					layer.msg(error.data.msg)

				})
			// BillTemplateService.bill_tpl.edit_template({bill_template_id:$scope.template_id},$scope.editLabel, function(data){
			//     localStorage.removeItem('bill_template_id');
			//     $scope.$close({bill_template_id:$scope.template_id});
			// },function(error){
			//     alert(error.data.msg)
			// })
			}
		}

		// $location.path('main/merchant_home/seller_audit/'+ $scope.id + '/det');


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
				$('.layui-layer-close1').trigger('click')
				ChannelApplicationService.addRemarks({applyId: $stateParams.partner_id,adminRemark: adminRemark}, function(data){
					console.log(data)
					$scope.audit_data.adminRemark = JSON.parse(data.adminRemark)
					layer.msg('操作成功')
				}, function(error){
					$('.layui-layer-close1').trigger('click')
					layer.msg(error.data.msg);

				})
			}
		}
		$scope.canelAdd = function () {
			$('.layui-layer-close1').trigger('click')
		}
  });

