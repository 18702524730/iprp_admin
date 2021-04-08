angular.module('iprpAdminApp').controller('CxbCtrl', function ($scope,InvoiceService,PaginationService,$location,$resource,session) {
    $('#cxb').siblings().removeClass("selected");
    $('#cxb').addClass("selected");

    // 添加时间控件 初始化
    $('#payTimeBegin,#payTimeEnd').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      todayBtn:  1,
      autoclose: true
    });
    $('.datetimepicker').css('display','none');

    var s = $resource(options.api.base_url + '/cxb/duizhang',{access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        }
    });

    function download(){
      /*s.list({
        payTimeBegin: $scope.payTimeBegin ? new Date($scope.payTimeBegin).getTime() : null,
        payTimeEnd: $scope.payTimeEnd ? new Date($scope.payTimeEnd).getTime() + 86399000 : null,
      },function(data){

      },function(error){
        alert(error.data.msg);
      });*/
      location.href = options.api.base_url + '/cxb/duizhang?'+ $.param({
        access_token:session.accessToken,
        payTimeBegin: $scope.payTimeBegin ? new Date($scope.payTimeBegin).getTime() : null,
        payTimeEnd: $scope.payTimeEnd ? new Date($scope.payTimeEnd).getTime() + 86399000 : null,
      })
    }

    $scope.$watch('payTimeBegin', function (newItems) {
        if ($scope.payTimeEnd && $scope.payTimeBegin) {
            if (new Date($scope.payTimeEnd).getTime() < new Date($scope.payTimeBegin).getTime()) {
                layer.alert('结束时间需大于开始时间')
                return;
           }
           if (( new Date($scope.payTimeEnd).getTime() - new Date($scope.payTimeBegin).getTime() )> 29*60*60*24*1000) {
                layer.alert('时间跨度不能超过30天')
                return;
           }
        }
    });
    $scope.$watch('payTimeEnd', function (newItems) {
        if ($scope.payTimeEnd && $scope.payTimeBegin) {
            if (new Date($scope.payTimeEnd).getTime() < new Date($scope.payTimeBegin).getTime()) {
                layer.alert('结束时间需大于开始时间')
                return;
           }
           if (( new Date($scope.payTimeEnd).getTime() - new Date($scope.payTimeBegin).getTime() )> 29*60*60*24*1000) {
                layer.alert('时间跨度不能超过30天')
                return;
           }
        }
    });

    /**
     * 按条件查询
     */
    $scope.download = function(){
        if (!$scope.payTimeBegin || !$scope.payTimeEnd) {
            layer.alert('请选择开始时间或结束时间')
            return;
        }
        if (new Date($scope.payTimeEnd).getTime() < new Date($scope.payTimeBegin).getTime()) {
            layer.alert('结束时间需大于开始时间')
            return;
        }
        if (( new Date($scope.payTimeEnd).getTime() - new Date($scope.payTimeBegin).getTime() )> 29*60*60*24*1000) {
            layer.alert('时间跨度不能超过30天')
            return;
        }
        download();
    };

    $scope.reset = function (){
      $scope.payTimeBegin = null;
      $scope.payTimeEnd = null;
    }

    //提示操作
    $scope.hint=true;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});
