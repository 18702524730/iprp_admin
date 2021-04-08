angular.module('iprpAdminApp').controller('oemDetailCtrl',function($scope, $modal, $stateParams, FeedbackService, marKetList, PaginationService,$location,$state){
  $('#oem_list').addClass("selected").parent().siblings().children().removeClass("selected");

  $scope.auditstatus = {};
  $scope.auditstatus.audit = false;
  $scope.comment = {};
  $scope.comment.memo = '';
  $scope.ispass = {};
  $scope.ispass.step = '1';
  $scope.auditorder = function(){
    FeedbackService.handleZjForeignTradeOemIdentify({
          id: $stateParams.id,
          remark: $scope.comment.memo,
          state: $scope.ispass.step,
      },function(data){
          alert('操作成功')
          $state.reload()
      },function(err){
          alert(err.data.msg)
      })
  };
  
  $scope.closeaudit=function(){
      // $('.auditbox').hide()
      $scope.$dismiss("cancel");
      $scope.comment.memo = ''
  }
  $scope.submitdata=function(){
    if($scope.comment.memo == ''){
      alert('请输入处理结果')
    }else{
      $scope.auditorder();
      $scope.closeaudit()
    }
    
  }
  $scope.showaudit=function(){
    $modal.open({
        resolve:{
            serviceType : function(){
                return false;
            }

        },
        templateUrl: 'package\\modal\\fast\\dealoem.html',
        controller: 'oemDetailCtrl'
    }).result.then(function (result) {
        console.log(1111)
    })
}
  // 初始化查询
  function getTmDetailFn () {
    // 查询商标详情
    FeedbackService.findZjForeignTradeOemIdentifyDetail({id: $stateParams.id}, function(data){
      $scope.tmDetail = data;
    });
  }
  getTmDetailFn();  //初始化查询



});

