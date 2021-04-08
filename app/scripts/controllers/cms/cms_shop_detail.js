angular.module('iprpAdminApp').controller('CmsShopDetailCtrl',function($scope,$modal,session,$cookies,CmsUrl,$stateParams,$location,orderService){
    $('#cms_shop').addClass("selected").parent().siblings().children().removeClass("selected");

    $scope.range = function(n) {
		    return new Array(n);
		}

    $scope.getDetail = function(){
	    CmsUrl.findEvaluateShopDetail({id: $stateParams.id},function(data){
	      $scope.order_detail = data;
	    },function(error){
	      alert(error.data.msg);
	    });
	  }

	  $scope.getDetail();

   	$scope.back = function(){
   		history.go(-1);
   	}

   	$scope.setShow = function(isHide){
   		CmsUrl.updateEvaluateShopState({
   			id: $stateParams.id,
   			isHide: isHide ? 1 : 0
   		},function(data) {
   			layer.msg('操作成功')
   			$scope.getDetail();
   		})
   	}
});

