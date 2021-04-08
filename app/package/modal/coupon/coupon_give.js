angular.module('iprpAdminApp').controller('couponGiveCtrl', function ($scope,data, $cookies,marKetList,Upload) {
  $scope.coupon_obj = {};
  $scope.frequencyExcel = true;
  $scope.validNum = 0;
  $scope.unvalidNum = 0;
  $scope.couponId = data.couponId;
  console.log(data,'测试数据')
  detail();
  function detail() {
    marKetList.findSebeCouponDetail({couponId: data.couponId}, function (data) {
        $scope.coupon_detail = data;
        console.log($scope.coupon_detail)
    }, function (error) {
        alert(error.data.msg);
    })
  }
  //关闭
  $scope.cancel = function () {
      $scope.$dismiss("cancel");
  };
  //导入数据
  $scope.uploadFile = function (file) {//上传文件
    console.log(file)
    if(!file){
      $scope.frequencyExcel = true;
      alert("文件格式错误，请上传xls格式的文件");
      return;
    }
    var MAX_POST_SIZE = 1024 * 1024;
    if(file && file.size > MAX_POST_SIZE){
      $scope.frequencyExcel = true;
      alert("上传文件请小于1M");
      return;
    }else{
      Upload.upload({
          url: options.api.base_url + '/importExcelMemberPhone/'+$scope.couponId,
          data: {filedata: file}
      }).then(function (resp) {
        $scope.frequencyExcel = false;
        console.log('测试上传',resp)
          $scope.validNum = resp.data.validNum;
          $scope.unvalidNum = resp.data.unvalidNum;
      }, function (err) {
        $scope.frequencyExcel = false;
      });
    }
  };
  $scope.upFile = function(){
    location.href = options.api.base_url + '/exportExcelMemberPhone/'+$scope.couponId
  }

  $scope.approve = function(){
    if(!$scope.validNum&&$scope.coupon_obj.type==2){
      layer.open({
        title: '提示',
        content:'请添加用户手机号码'
      })
      return;
    }
    layer.open({
      title: '提示'
      ,content: '确认发放该拾贝券吗？'
      ,yes:function(index, layero){
        layer.close(index);
        $scope.$close({
          sendObj:$scope.coupon_obj.type,
          couponId:$scope.couponId
        })
        console.log('ceshi 010101')
      }
    });  
  }  
});
