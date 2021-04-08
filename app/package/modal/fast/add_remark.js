angular.module('iprpAdminApp').controller('addRemarkCtrl', function ($scope,ProductService, FeedbackService, $state, props) {

  $scope.data = {
    id: props.id,    //商标ID
    remark: ''  //备注内容
  }; 

  $scope.remarkLen = 0;  //备注内容字数

  // 获取备注内容字数
  $scope.getRemarkLenFn = function(){
    $scope.remarkLen = $scope.data.remark.length;
  };

  // 设置布尔值，避免多次提交
  $scope.boolsave = true;
  //提交
  $scope.save = function(){
    if (!$scope.data.remark) {
        $scope.error = '请填写备注';
        return;
    }
    if(!$scope.boolsave){
        return false;
    }else{
        $scope.boolsave = false;
    }
    var params = {};
    var successFn = function(){
      $scope.$close();
      $scope.boolsave = true;
    };
    var errorFn = function(err){
      $scope.boolsave = true;
      alert(error.data.msg);
    };
    if (props.fromPage === 'buy_good_tm_detail') {   //来自求购好标详情页
      params.id = $scope.data.id;
      params.content = $scope.data.remark;
      FeedbackService.remarkBuyGoodsTrademark(params, successFn, errorFn);
    }
    else if (props.fromPage === 'tm_manage_detail') {   //来自商标管理详情页
      params.trademarkId = $scope.data.id;
      params.remark = $scope.data.remark;
      ProductService.addTMRemark(params, successFn, errorFn);
    }
    else if (props.fromPage === 'tm_fast_sell_detail') {   //来自商标速卖详情页
      params.id = $scope.data.id;
      params.content = $scope.data.remark;
      FeedbackService.remarkFastSaleTrademark(params, successFn, errorFn);
    }
    else if (props.fromPage === 'bargain_detail') {   //来自我要砍价详情页
      params.id = $scope.data.id;
      params.content = $scope.data.remark;
      FeedbackService.remarkBargainTrademark(params, successFn, errorFn);
    }
  };

  //关闭
  $scope.cancel = function () {
      $scope.$dismiss("cancel");
  };
});
