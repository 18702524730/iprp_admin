angular.module('iprpAdminApp').controller('ipOrderReportCtrl', function ($scope,ipService, orderSn, $cookies, Upload) {

    // 结算表主键id
    $scope.orderSn = orderSn;
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
    $scope.obj={
      queren: true
    };
    $scope.fileData = {};

    $scope.selectFn = function(type) {
      $scope.judgeResult = type;
    };

    // $scope.$watch('judgeResult', function (flowType) {
    //   console.log(222);
    //   console.log(flowType);
    //   console.log($scope.judgeResult);
    //   $scope.objwithdrawState = flowType;
    // });

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
                    $scope.obj.reportUrl = resp.url;
                    $scope.fileData = resp;
                }
                //console.log($scope.passData.image);
            }, function (resp) {
                resp = resp.data;
            });
        }
    };

    // 确定
    $scope.confirm = function(){
      if (!$scope.obj.queren) {
          return false;
      }else if (!$scope.obj.judgeResult){
        layer.alert('请选择判定结果');
        return false
      }else if (!$scope.obj.reportUrl){
        layer.alert('请上传报告');
        return false
      }else{
        // 初始化单选，避免多次提交
        $scope.obj.queren = false;  
      }
      $scope.error_tip = '';
      $scope.obj.orderSn = $scope.orderSn;
      var operateType = $scope.judgeResult == 1 ? 3 : 4;
      $scope.obj.operateType = operateType;
      ipService.handlePatentJudgeOrder($scope.obj, function(item){
          $scope.$close();
      },function(item){
        $scope.obj.queren = false;  
        if(item.data && item.data.status!=200){
            layer.alert(item.data.msg);
        }
      });
    };
});
