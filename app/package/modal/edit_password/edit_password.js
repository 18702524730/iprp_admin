angular.module('iprpAdminApp').controller('EditPasswordCtrl', function ($scope,UserService,$location) {
  $scope.repeatPassword=false;
  var Pattern = /^(?![a-zA-Z]+$)(?![!\"#\$%&\'\(\)\*\+,-\.\/:;<=>\?@\[\\\]\^_`\{\|\}~]+$)(?!\d+$)\S{10,32}$/;

  var checkValid = function(){
  	var ret = false;
  	if (!$scope.password) {
  		$scope.showEmpty = true;
  		$scope.showInvalid = false;
  	}else{
  		if (!Pattern.test($scope.password)) {
  			$scope.showEmpty = false;
  			$scope.showInvalid = true;
  		}else{
  			$scope.showEmpty = false;
  			$scope.showInvalid = false;
  			ret = true;
  		}
  	}
  	return ret;
  }
  var checkValid2 = function(){
  	var temp = false
  	if (!$scope.r_password) {
  		$scope.showREmpty = true;
  		$scope.repeatPassword = false;
  	}else{
  		if ($scope.password !== $scope.r_password) {
  			$scope.showREmpty = false;
  			$scope.repeatPassword = true;
  		}else{
  			$scope.showREmpty = false;
  			$scope.repeatPassword = false;
  			temp = true;
  		}
  	}
  	return temp;
  }
  $scope.submitBtn=function(){
      if(checkValid() && checkValid2()) {
        UserService.updatePassword.put({password: $.md5($scope.password)},{},function(data) {
            $scope.$dismiss("cancel");
            $location.path("login_page");
        },function(error){
            alert(error.data.msg);
        });
      }
  };

  $scope.$watch("password",function(newValue){
  	if (newValue && newValue.length > 9) {
      checkValid();
    }else{
    	$scope.showEmpty = false;
  		$scope.showInvalid = false;
    }
  },true);

  $scope.$watch("r_password",function(newValue){
    if (newValue && newValue.length > 9) {
      checkValid2();
    }else{
    	$scope.showREmpty = false;
  		$scope.repeatPassword = false;
    }
  },true);

  $scope.blurCheck = function(newValue){
    checkValid();
  }

  $scope.blurCheck2 = function(newValue){
    checkValid2();
  }

  $scope.cancel = function () {
      $scope.$dismiss("cancel");
  };
});
