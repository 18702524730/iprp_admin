angular.module('iprpAdminApp').controller('addCustomerCtrl', function ($scope,telService,order_detail,isAdd,isPop,$state) {

    $scope.order_detail = order_detail;
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

    $scope.data = {
        __code:'',
        contactStartTime:isAdd? '' : MsecFormat(order_detail.memberReceptionDTOs[order_detail.memberReceptionDTOs.length - 1].contactStartTime),
        contactEndTime:isAdd? MsecFormat(new Date().getTime()) : '',
        remarks:''
    };

    setTimeout(function(){
        // 添加时间控件 初始化
        $('#finished_start_time,#finished_end_time').datetimepicker({
          minView: 0, //选择日期后，不会再跳转去选择时分秒
          language:  'zh-CN',
          format: 'yyyy-mm-dd hh:ii',
          todayHighlight: true,
          todayBtn:  1,
          autoclose:  true
        });
        $('.datetimepicker').css('display','none');
    },500);

    //+28800000
    
    
    /*bsOrderService.feedbackList({
        order_id: order_detail.order_id
    },function(data){
        $scope.feedbackList = data.data;
    },function(error){
        alert(error.data.msg);
    });*/

    // 设置布尔值，避免多次提交
    $scope.boolsave = true;
    //提交
    $scope.save = function(){
        var s = new Date($scope.data.contactStartTime).getTime();
        var e = new Date($scope.data.contactEndTime).getTime();
        if (!$scope.data.contactStartTime || !$scope.data.contactEndTime) {
            $scope.error = '请填写联系时间';
            return;
        }
        if (e<s) {
            $scope.error = '结束时间须大于开始时间';
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
        telService.finishReception({
            fkConsultationId: order_detail.consultationId,
            consultationReceptionId:(isAdd ? '' : order_detail.fkConsultationReceptionId),
            contactStartTime: s,
            contactEndTime: e,
            remarks: $scope.data.remarks
        },function(data){
            $scope.$close({isPop:isPop});
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
