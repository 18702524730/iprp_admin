angular.module('iprpAdminApp').controller('editPositionModalCtrl', function ($scope, $state, marKetList, positionObj) {


  $scope.positionList = [
    {name: '热门好标', id: 1},
    {name: '热门类别', id: 2}
  ];

  $scope.data = {
    goods_sn: positionObj.goods_sn,
    selectId: '',  //选择你的运营栏目
    selectListId: ''  //选择的栏目
  };
  $scope.list = [];  //栏目名称列表

  // 编辑的时候默认选择运营栏目
  if (positionObj.type) {
    $scope.data.selectId = positionObj.type+'';
  }


  $scope.getListFn = function(id){
    
  };

  $scope.$watch('data.selectId', function(n, o){
    marKetList.findAllPosition({business_type: n}, function(data){
      $scope.list = data.elements;
    });
  });


    //提交
    // 设置布尔值，防止多次提交
    $scope.boolsave = true;
    $scope.save = function(){
        if(!$scope.boolsave){
            return false;
        }else{
            $scope.boolsave = false;
        }
        if (positionObj.type) {   //修改
          marKetList.updatePositionTrademark({
            position_id: $scope.data.selectListId,
            position_trademark_id: positionObj.id   //运营位商标ID
          },function(data){
            if (data.msg) {
              alert(data.msg);
            }
              $scope.$close();
              $state.reload();
              $scope.boolsave = true;
          },function(error){
              $scope.boolsave = true;
              alert(error.data.msg);
          });
        }
        else{  //新增
          marKetList.addPositionTrademark({
            id: $scope.data.selectListId,
            goods_sn: $scope.data.goods_sn 
          },function(data){
            if (data.msg) {
              alert(data.msg);
            }
              $scope.$close();
              $state.reload();
              $scope.boolsave = true;
          },function(error){
              $scope.boolsave = true;
              alert(error.data.msg);
          });
        }
        
    };
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});
