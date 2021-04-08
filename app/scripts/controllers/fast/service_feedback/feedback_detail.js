angular.module('iprpAdminApp').controller('feedbackDetailCtrl',function($scope,$modal,FeedbackService,$stateParams,$location,$state){

	FeedbackService.detail({spAdviseId:$stateParams.spAdviseId},function(data){
    $scope.detail = data;
    $scope.adviseType = data.adviseType + '';
  },function(error){
    layer.alert(error.data.msg);
  });


	var isSubmited = false;
  $scope.submit = function(){
  	if (isSubmited) {return;}
  	isSubmited = true;
  	FeedbackService.setFeedbackType({
  		spAdviseId:$stateParams.spAdviseId,
  		adviseType: $scope.adviseType
  	},function(data){
  		isSubmited = false;
  		layer.alert('提交成功！');
      $state.go('main.fast_home.feedback_service');
	  },function(error){
	  	isSubmited = false;
	    layer.alert(error.data.msg || '系统错误');
	  });
  }
})
