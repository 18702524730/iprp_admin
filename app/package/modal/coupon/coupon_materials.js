angular.module('iprpAdminApp').controller('materialsCouponCtrl', function ($scope,objList,Upload,$location,$state,PartnerService) {
    console.log(objList)
    $scope.materialsData = objList;
    $scope.obj = {}
    /**
     * 上传打款凭证
     */
    $scope.fileName = '';
    $scope.uploadFile = function (file) {
        console.log(file)
        var MAX_POST_SIZE = 1024 * 1024;
        if(!file){
            // $scope.frequencyExcel = true;
            // alert("文件格式错误，请上传doc格式的文件");
            return; 
        }
        if(!(/(?:doc|docx)$/i.test(file.name))) {
            $scope.frequencyExcel = true;
            alert("文件格式错误，请上传doc格式的文件");
            return;
        }
        if(file && file.size > MAX_POST_SIZE){
            alert("上传文件请小于1M");
        }else{
            $scope.fileName = file.name;
            Upload.upload({
                url: options.api.base_url + '/file/upload',
                data: {Filedata: file}
            }).then(function (resp) {
                $scope.obj.url = resp.data.url.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
                console.log(resp.data.url)
                // $scope.obj.url = resp.data.url;
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

    //确认
    $scope.approve = function () {
        if(!$scope.obj.url){
            alert("请上传文件");
            return;
        }
        if(!$scope.obj.withdrawState){
            alert("请选择类目");
            return;
        }
        var data = {
           title: $scope.fileName,
           url: $scope.obj.url,
           id: $scope.obj.withdrawState
        }
        console.log($scope.obj)
        PartnerService.addMaterial(data,function (resp) {
            $scope.$close()
        })
        // 请求接口
        // $scope.$dismiss("cancel");
    };
    

});
