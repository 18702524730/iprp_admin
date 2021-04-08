angular.module('iprpAdminApp').controller('editHighTechCtrl', function ($scope,HighTechEnterprisesService,item,$state) {

    $scope.id = item.id;
    $scope.item = item;
    $scope.data = {
      __code:'',
      contactState:'',
      remarks:''
    };
    $scope.data.contactState = item.contactState+'';
    $scope.data.remarks = item.remarks;
    var MsecFormat = function (input) {
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "--";
      }
      var _date = new Date(input-0);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      return year + "-" + month + "-" + day + " "+ hour + ":" + minutes;
    };

    // 设置布尔值，避免多次提交
    $scope.boolsave = true;
    //提交
    $scope.save = function(){
        if (!$scope.data.contactState) {
            $scope.error = '请选择联系状态';
            return;
        }
        if (!$scope.data.remarks) {
            $scope.error = '请填写备注';
            return;
        }
        if(!$scope.boolsave){
            return false;
        }else{
            $scope.boolsave = false;
        }
        HighTechEnterprisesService.addRemarks({
            contactState: $scope.data.contactState,
            remarks:$scope.data.remarks,
            id: $scope.id,
        },function(data){
            $scope.$close();
            $scope.boolsave = true;
            //$state.reload();
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
