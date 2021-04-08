angular.module('iprpAdminApp').controller('LabelTplAddCtrl', function ($scope,$modal,LabelServicerService,PaginationService,$location, Upload,$state) {
  $('#label_manage').siblings().removeClass("selected");
  $('#label_manage').addClass("selected");
    //上传图片
  $scope.productPicture = ''

  //添加模板
  $scope.labelAdd = function(){
      if(!$scope.label_name || !$scope.iconUrl || !$scope.iconDisableUrl || !$scope.label_description){
      	//console.log($scope.label_name, $scope.iconUrl, $scope.iconDisableUrl, $scope.label_description)
        $scope.label_tpl_add_Form.submitted = true;
      }else{
        LabelServicerService.label_add({
	      	name: $scope.label_name,
	      	tagDesc: $scope.label_description,
	      	iconUrl: $scope.iconUrl,
	      	iconDisableUrl: $scope.iconDisableUrl,
	      }, function(data){
	      	layer.msg("添加成功");
	      	$state.go('main.merchant_home.label_tpl_list');
		    }, function(error){
		    	layer.alert(error.data.msg);
		    })
      }
  }
  // 上传图标
  $scope.uploadFile = function (file, valName) {
  	if (!file) {return;}
    var filetype = file.type.split("/");
    var MAX_POST_SIZE = 0.03 * 1024 * 1024;
    if(file.size > MAX_POST_SIZE){
        layer.alert("上传的文件请小于30kb");
    }else if(filetype[1] != "png"){
        layer.alert("请上传png格式的图片");
    }else{
        Upload.upload({
            url: options.api.base_url + '/file/upload',
            data: {Filedata: file}
        }).then(function (resp) {
            resp = resp.data;
            console.log(resp)
            if(resp.url){
                $scope[valName] = resp.url;
            }
        }, function (resp) {
        });
    }
	};
});
