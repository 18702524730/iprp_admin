angular.module('iprpAdminApp').controller('setSellStateCtrl', function ($scope, ProductService, $state, item) {

  $scope.sellStateList = [
    {name: '待售', id: 1},
    {name: '预订', id: 2},
    {name: '已售', id: 3},
    {name: '不可出售', id: 4}
  ];

  console.log(item)

  // 商标数据
  $scope.tmData = {
    saleStatus: item.saleStatus,
    id: item.id,
    saleed: false
  };

    //提交
    // 设置布尔值，防止多次提交
    $scope.boolsave = true;
    $scope.save = function(){
        if (!$scope.tmData.saleStatus) {
            alert('请选择销售状态');
            return;
        }
        if(!$scope.boolsave){
            return false;
        }else{
            $scope.boolsave = false;
        }
        ProductService.editSaleStatus({
            id: $scope.tmData.id,
            saleStatus: $scope.tmData.saleStatus
        },function(data){
            $scope.$close();
            $state.reload();
            $scope.boolsave = true;
        },function(error){
            $scope.boolsave = true;
            alert(error.data.msg);
        });
    };
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };

  $scope.$watch('tmData.saleStatus', function(v){
    if (v==3) {
     $scope.tmData.saleed = true;
    }
    else{
      $scope.tmData.saleed = false;
    }
  });


});
