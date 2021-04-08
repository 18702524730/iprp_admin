angular.module('iprpAdminApp').controller('refundReasonCtrl', function ($scope,RefundService,itemData,Upload,$location,$state) {

    $scope.itemData = itemData;
    $scope.pics = itemData.refund_images;
    $scope.passVisible = itemData.audit_state == 1; //3商家通过，4先行赔付
    $scope.audit_state = itemData.audit_state == 1 ? 3 : 4;

    //通过数据
    $scope.passData = {
        refundMthd:0,
        refundAmount:'',
        note:'',
        fileName:'',
        image:[]
    };
    //驳回数据
    $scope.rejectData = {
        rejectReason:'',
        note:''
    };




    /**
     * 上传打款凭证
     */
    $scope.uploadFile = function (file) {
        var MAX_POST_SIZE = 10 * 1024 * 1024;
        if(file && file.size > MAX_POST_SIZE){
            alert("上传图片请小于10M");
        }else{
            Upload.upload({
                url: options.api.base_url + '/file/upload',
                data: {Filedata: file}
            }).then(function (resp) {
                resp = resp.data;
                if(resp.url != undefined){
                    $scope.passData.image.push(resp.url);
                }
                //console.log($scope.passData.image);
            }, function (resp) {
                resp = resp.data;
            });
        }
    };


    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };

    // 设置布尔值，避免多次提交
    $scope.boolapprove = true;
    //审批通过
    $scope.approve = function(){
    	if (!$scope.passVisible) {
    		if (!$scope.passData.amount) {
	    		layer.alert('请输入实退金额');
	    		return;
    		}
    		if ($scope.passData.amount > itemData.amount_user) {
	    		layer.alert('实退金额不能大于退款金额');
	    		return;
    		}
    	}
    	if (!$scope.passData.image.length) {
    		layer.alert('请上传打款凭证');
    		return;
    	}
    	if (!$scope.boolapprove) {
    		return;
    	}
      $scope.boolapprove = false;
      RefundService.approve({
	      "refund_id" : $scope.itemData.refund_id,
	      "audit_state":$scope.audit_state,
	      "voucherImage":$scope.passData.image,
	      "amount": $scope.passData.amount
      },function(data){
      	if (data.codes == 'fail') {
      		layer.alert(data.msg);
      		return;
      	}
        $scope.cancel();
        $state.reload();
        $scope.boolapprove = true;
        layer.msg('操作成功')
      },function(error){
        $scope.boolapprove = true;
        layer.alert(error.msg || '服务异常');
      })
    };

});
