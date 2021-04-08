angular.module('iprpAdminApp').controller('foreignTradeDetailCtrl',function($scope, $modal, $stateParams, FeedbackService, marKetList, PaginationService,$location,$state){
    $('#foreign_trade_list').addClass("selected").parent().siblings().children().removeClass("selected");

    $scope.auditstatus = {};
    $scope.auditstatus.audit = false;
    $scope.comment = {};
    $scope.comment.memo = '';
    $scope.ispass = {};
    $scope.ispass.step = '';
    $scope.ispass.errmsg = '';
    $scope.auditorder = function(){
      FeedbackService.handleZjForeignTradeIPProblem({
            id: $stateParams.id,
            state:2,
            remark: $scope.comment.memo,
            busiChange: $scope.ispass.step,
        },function(data){
            alert('操作成功')
            $state.reload()
        },function(err){
            alert(err.data.msg)
        })
    };
    $scope.auditorders = function(){
      FeedbackService.handleZjForeignTradeIPProblem({
            id: $stateParams.id,
            state:1,
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
        $scope.ispass.errmsg = '';
        $scope.ispass.step = '';
        $scope.comment.memo = ''
    }
    $scope.showaudits= function(){
        $scope.auditorders();
    }
    $scope.submitdata=function(){
        if($scope.ispass.step==''){
            $scope.ispass.errmsg = '请选择业务转化结果'
        }else if($scope.comment.memo==''){
            alert('请输入处理结果')
        } else{
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
          templateUrl: 'package\\modal\\fast\\foreign_trade.html',
          controller: 'foreignTradeDetailCtrl'
      }).result.then(function (result) {
          console.log(1111)
      })
  }
    // 初始化查询
    function getTmDetailFn () {
      // 查询商标详情
      FeedbackService.findZjForeignTradeIPProblemDetail({id: $stateParams.id}, function(data){
        $scope.tmDetail = data;
      });
    }
    getTmDetailFn();  //初始化查询

});

