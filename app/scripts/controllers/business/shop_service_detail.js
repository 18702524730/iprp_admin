angular.module('iprpAdminApp').controller('BusinessShopServiceDetailCtrl',function($scope,$modal,session,$cookies,mallServiceClassService,$stateParams,$location,$sce){
    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    var getDetail = function(){
	    mallServiceClassService.shopServiceDetail({service_id:$stateParams.id},function(data){
	        $scope.detail = data;
	        $scope.detail.descriptions = $sce.trustAsHtml(data.descriptions);
	        $scope.detail.pictureList = $scope.detail.picture && $scope.detail.picture.split(',');
	    },function(error){
	        alert(error.data.msg);
	    });
    }

    getDetail();

    $scope.edit = function(){
    	var str = `
    		<p>搜索权重值</p>
    		<input type="text" class="search_coefficient" style="width:290px;" value="${$scope.detail.search_coefficient}"/>
    		<p>（0-99，权重数值越大，搜索结果中越靠前。）</p>
    	`;
      layer.alert('',{
        title:'修改权重',
        type: 0,
        shadeClose:true,
        content: str,
        btn: ['确定']
      }, function(index){
      	var d = $('.search_coefficient').val();
      	mallServiceClassService.updateSearchCoefficient({
      		service_id:$stateParams.id,
      		search_coefficient: d
      	},function(data){
	        getDetail();
	        layer.msg('修改成功！');
	        layer.close(index);
		    },function(error){
		      alert(error.data.msg);
		    });

      });
    }

    $scope.checkPass = function(isPass){
	  	var verify_status = isPass === 1 ? 1 : 2;
	  	layer.confirm(`确定${isPass==1? '审核通过':'审核不通过'}么？`, {
	      btn: ['确定','取消'] //按钮
	    }, function(index){
		  	mallServiceClassService.checkPass({
		  		verify_status: verify_status,
		  		id_list: [$scope.detail.service_id]
		  	}, function(data){
		  		getDetail();
		      layer.msg('操作成功！');
			  }, function(data){
			    layer.alert(data.data.msg);
			  });
		  }, function(){
    	});
	  }
});

