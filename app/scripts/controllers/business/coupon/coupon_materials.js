angular.module('iprpAdminApp').controller('couponMaterialsCtrl',function($scope, $modal, $stateParams,$state, $location,Upload,PartnerService){
    $('#partner_materials').siblings().removeClass("selected");
  	$('#partner_materials').addClass("selected");
    $scope.idArray=[];
    
	$scope.addMaterials = function (argument) {//添加材料
		$scope.checkFnMaterials();
	}

$scope.addArray = function(item){//展开，收缩
	if($scope.idArray.indexOf(item.id) == -1){
		$scope.idArray.push(item.id);
	}else{
		$scope.idArray.splice($scope.idArray.indexOf(item.id),1)
	}
		console.log($scope.idArray)
	
}

$scope.removeMaterials = function(item){//删除类目或是材料
	layer.open({
	    title: '提示'
	    ,content: '是否确认删除？'
	    ,yes:function (index, layero) {
	  	layer.close(index);
	  	PartnerService.deleteMaterial({id:item.id},function(resp){
  			console.log(resp)
        alert('删除成功')
  			$scope.searchLists();
  		},function(err){
  			console.log(err)
  		})
	}
});     
  
	
}
$scope.searchLists = function() {//查询材料
 	PartnerService.materialCenter(function (resp){
 		$scope.obj = resp;
 		console.log(resp)
 	},function (err) {
 		// body...
 	})
 } 
$scope.searchLists();
// 弹窗
$scope.checkFnName = function(){//添加材料类目
    $modal.open({
      resolve:{},
      backdrop:'static',
      templateUrl: 'package\\modal\\coupon\\materials_name.html',
      controller: 'materialsNameCtrl'
    }).result.then(function (result) {
        alert('添加成功')
    	$scope.searchLists();
      console.log('成功调取',result)
    },function(err){
      console.log('失败调取')
    });
}

// 弹窗
$scope.checkFnMaterials = function(){
    $modal.open({
      resolve:{
      	objList:function () {
      		return $scope.obj
      	}
      },
      backdrop:'static',
      templateUrl: 'package\\modal\\coupon\\coupon_materials.html',
      controller: 'materialsCouponCtrl'
    }).result.then(function (result) {
    	$scope.searchLists();
      console.log('成功调取00000')
    },function(err){
      console.log('失败调取')
    });
}

// 下载
$scope.downFile = function (file) {
	window.open(file.url)
}
});

