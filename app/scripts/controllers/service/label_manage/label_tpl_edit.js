angular.module('iprpAdminApp').controller('LabelTplEditCtrl', function ($scope,$modal,$stateParams, LabelServicerService,PaginationService,$location, Upload, $state) {
  $('#label_manage').siblings().removeClass("selected");
  $('#label_manage').addClass("selected");
  init_label_data();
  $scope.editLabel = {}
  // 编辑标签
  $scope.handleClickEditLabel = function(){
    if(!$scope.editLabel.name || !$scope.editLabel.tagDesc || !$scope.iconUrl || !$scope.iconDisableUrl){
        $scope.editLabelForm.submitted = true;
    }else{
      LabelServicerService.label_edit({
      	tagId: $stateParams.label_id,
      	name: $scope.editLabel.name,
      	tagDesc: $scope.editLabel.tagDesc,
      	iconUrl: $scope.iconUrl,
      	iconDisableUrl: $scope.iconDisableUrl,
      }, function(data){
      	layer.msg("编辑成功");
      	$state.go('main.merchant_home.label_tpl_list');
	    }, function(error){
	    	layer.alert(error.data.msg);
	    })
    }
  }
  // 初始化数据
  function init_label_data(){
    LabelServicerService.label_detail({label_id: $stateParams.label_id}, function(data){
      $scope.editLabel = data;
      $scope.iconDisableUrl = data.iconDisableUrl;
      $scope.iconUrl = data.iconUrl;
    }, function(error){
      alert(error.data.msg);
    })
  }
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
