angular.module('iprpAdminApp').controller('CmsDetailCtrl',function($scope,$modal,session,$cookies,CmsUrl,$stateParams,$location,orderService){
    $('#cms_list').addClass("selected").parent().siblings().children().removeClass("selected");

    $scope.range = function(n) {
		    return new Array(n);
		}

    $scope.getDetail = function(){
	    CmsUrl.findEvaluateGoodsDetail({id: $stateParams.id},function(data){
	      console.log(data)
	      $scope.order_detail = data;
	    },function(error){
	      alert(error.data.msg);
	    });
	  };

	  $scope.getDetail();

   	$scope.back = function(){
   		history.go(-1);
   	};

   	$scope.setShow = function(isHide){
   		CmsUrl.updateEvaluateGoodsState({
   			id: $stateParams.id,
   			isHide: isHide ? 1 : 0
   		},function(data) {
   			layer.msg('操作成功')
   			$scope.getDetail();
   		})
   	};
});

