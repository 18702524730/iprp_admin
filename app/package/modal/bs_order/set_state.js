angular.module('iprpAdminApp').controller('setStateCtrl', function ($scope,orderService,order_detail,$state,Upload) {

    $scope.order_detail = order_detail;
    $scope.data = {
        state:1
    };
    $scope.obj={
      };
    $scope.fileData = {};
    $scope.uploadFile = function (file) {
        var MAX_POST_SIZE = 5 * 1024 * 1024;
        if(file && file.size > MAX_POST_SIZE){
            alert("上传图片请小于5M");
        }else{
            Upload.upload({
                url: options.api.base_url + '/file/upload',
                data: {Filedata: file}
            }).then(function (resp) {
                resp = resp.data;
                if(resp.url != undefined){
                    $scope.obj.reportUrl = resp.url;
                    $scope.obj.fileName = resp.fileName;
                    $scope.fileData = resp;
                }else{
                    alert('请上传正确格式的文件')
                }
                //console.log($scope.passData.image);
            }, function (resp) {
                resps = resp.data;
                alert('上传失败')
            });
        }
    };
    //提交
    // 设置布尔值，防止多次提交
    $scope.boolsave = true;
    $scope.save = function(){
        if(!$scope.boolsave){
            return false;
        }else{
            $scope.boolsave = false;
        }
        if(!$scope.obj.reportUrl){
            alert('请上传服务合同')
            $scope.boolsave = true;
            return false
        }
        orderService.setServiceState({
            fileName:$scope.obj.fileName,
            fileUrl: $scope.obj.reportUrl,
            orderFuwuId: $scope.order_detail.orderFuwuId,
        },function(data){
            $scope.$close();
            $state.reload();
            $scope.boolsave = true;
        },function(error){
            $scope.boolsave = true;
            alert(error.data.msg);
        });
    };
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
