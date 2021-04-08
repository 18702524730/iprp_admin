angular.module('iprpAdminApp').controller('editPostalCtrl', function ($scope,PostalService,item,$state) {

    $scope.id = item.id;
    $scope.item = item;
    $scope.data = {
      mailNumber:'',
      mailTime:'',
      remarks:''
    };

    $scope.data.mailNumber = item.mailNumber;
    $scope.data.mailTime = item.mailTime && item.mailTime.slice(0, 10);
    $scope.data.remarks = item.remarks;
    $scope.data.addresseeName = item.addresseeName;
    $scope.data.addresseePhone = item.addresseePhone;
    $scope.data.addresseeAddressinfo = item.addresseeAddressinfo;
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

    setTimeout(function(){
    	$('#mailTime').datetimepicker({
		    minView: "month", //选择日期后，不会再跳转去选择时分秒
		    language:  'zh-CN',
		    format: 'yyyy-mm-dd',
		    todayHighlight: true,
		    todayBtn:  1,
		    autoclose:  true
		  });
    }, 1000);


    // 设置布尔值，避免多次提交
    $scope.boolsave = true;
    //提交
    $scope.save = function(){
    		/*if (!$scope.data.mailNumber) {
            $scope.error = '请输入寄件单号';
            return;
        }
        if ($scope.data.mailNumber && /^[a-zA-Z0-9]*$/.test($scope.data.mailNumber)) {
            $scope.error = '寄件单号格式应为数字或字母';
            return;
        }
        if (!$scope.data.mailTime) {
            $scope.error = '请选择寄件日期';
            return;
        }
        if (!$scope.data.addresseeName) {
            $scope.error = '请输入收件人姓名';
            return;
        }
        if (!$scope.data.addresseePhone) {
            $scope.error = '请输入收件人电话';
            return;
        }
        if (!$scope.data.addresseeAddressinfo) {
            $scope.error = '请输入收件人地址';
            return;
        }
        */
        /*if (!$scope.data.remarks) {
            $scope.error = '请输入备注内容，不超过200字';
            return;
        }*/
        if(!$scope.boolsave){
            return false;
        }else{
            $scope.boolsave = false;
        }
        PostalService.edit({
            mailNumber: $scope.data.mailNumber,
            mailTime: $scope.data.mailTime,
            remarks:$scope.data.remarks,
            id: $scope.id,
            addresseeName: $scope.data.addresseeName,
            addresseePhone: $scope.data.addresseePhone,
            addresseeAddressinfo: $scope.data.addresseeAddressinfo,
        },function(data){
            $scope.$close();
            $scope.boolsave = true;
            //$state.reload();
        },function(error){
            $scope.boolsave = true;
            alert(error.data.msg || '出错啦');
        });
    };
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
