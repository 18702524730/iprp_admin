angular.module('iprpAdminApp').controller('PlatformAddCtrl',function($scope, $rootScope, $modal, Upload, marKetList,ChannelService,PaginationService,$location,$state){
  $('#platform_list').addClass("selected").parent().siblings().children().removeClass("selected");
  $scope.position_type_list = [
      {
       type:3,
       name:"品质商家" 
      },
      {
       type:4,
       name:"商标交易" 
      },
      {
       type:5,
       name:"优选商家" 
      },
      {
       type:6,
       name:"支付成功页" 
      }
  ]
  $scope.add_platform = {
    positionType:4,
    remark:'',
    goodsSnList:[
       {goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''}
    ]
  }
  
  $scope.goodsSnBol = false;
  $scope.showWeightSnBol = false;
  $scope.showWeightLengthBol = false;
  
  // 编号位置移动
  $scope.locationChangeDown = function(item,index){//排序向下
    var goodsSnList = item.goodsSnList;
    $scope.add_platform.goodsSnList[index].goodsSnList = $scope.add_platform.goodsSnList[index+1].goodsSnList;
    $scope.add_platform.goodsSnList[index+1].goodsSnList = goodsSnList;
  }
  $scope.locationChangeOn = function(item,index){//排序向上 if($scope.add_platform.positionType == 4){
    var goodsSnList = item.goodsSnList;
    $scope.add_platform.goodsSnList[index].goodsSnList = $scope.add_platform.goodsSnList[index-1].goodsSnList;
    $scope.add_platform.goodsSnList[index-1].goodsSnList = goodsSnList;
  }
  $scope.qualityTransaction = function(){//校验数据是否完整
    $scope.showWeightSnBol = false;
    $scope.showNameBol = false;
    $scope.goodsSnBol = false;
    $scope.showWeightLengthBol = false;
    
    if(!$scope.add_platform.showName){
      $scope.showNameBol = true;
      return;
    }else{
      if(!$scope.add_platform.showWeight){
        $scope.showWeightSnBol = true;
        return;
      }else{
        if($scope.add_platform.showWeight > 10){
          $scope.showWeightLengthBol = true;
          return;
        }
      }
      for(var r in $scope.add_platform.goodsSnList){
        if($scope.add_platform.goodsSnList[r].goodsSnList){
          var goodsSnList = [];
          $scope.add_platform.goodsSnList.forEach(function(item){//商家编号遍历
            if(item.goodsSnList){
              goodsSnList.push(item.goodsSnList);//有商家编号就push到指定数组
            }
          })
          $scope.add_platform.goodsSnList = goodsSnList;
          $scope.submitUrl();
          return;
        }
      }
      $scope.goodsSnBol = true;
    }
  }
  $scope.transaction = function(data){//商标交易数据处理，最多8个
    var goodsSnList = [
      {goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''}
    ];
    if(data.goodsSnList&&data.goodsSnList.length){
      for(var r in goodsSnList){
        if(data.goodsSnList[r]){
          goodsSnList[r].goodsSnList = data.goodsSnList[r];
        }
      }
    }
    $scope.add_platform.goodsSnList = goodsSnList;
  }
  $scope.submitUrl = function(){//编辑接口
    marKetList.addOperatePosition($scope.add_platform,function(data){
      $location.path('main/market_home/platform');
    },function(data){
      $scope.transaction($scope.add_platform)
      alert(data.data.msg);
    })
  }
});

