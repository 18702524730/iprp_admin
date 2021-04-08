angular.module('iprpAdminApp').controller('PlatformEditCtrl',function($scope, $rootScope, $modal, Upload, marKetList,$stateParams,$location,$state){
  $('#platform_list').addClass("selected").parent().siblings().children().removeClass("selected");
  $scope.edit_platform = {
    positionType:'',
    remark:'',
  }
  var spGoodsSnList = []
  console.log($stateParams.id,11111)
  function init_order_detail() {
    marKetList.findOperatePositionDetail({id:$stateParams.id},function(data){
      $scope.edit_platform = data;
      if($scope.edit_platform.positionType == 3){//品质商家
        $scope.quality(data);
      }else if($scope.edit_platform.positionType == 4){//商标交易
        $scope.transaction(data);
      }else if($scope.edit_platform.positionType == 5){//优选商家
        $scope.optimization(data);
        // $scope.edit_platform.spGoodsSnList = spGoodsSnList;
        
      }else if($scope.edit_platform.positionType == 6){//优选商家
        $scope.spend(data);
      } 
    },function(data){

    })
  }
  init_order_detail();
  
  $scope.quality = function(data){//品质商家数据处理
    var spSnList = [
      {spSnList:''},{spSnList:''},{spSnList:''},{spSnList:''}
    ];//编号最多四个
    if(data.spSnList&&data.spSnList.length){
      for(var r in spSnList){
        if(data.spSnList[r]){
          spSnList[r].spSnList = data.spSnList[r];
        }
      }
    }
    $scope.edit_platform.spSnList = spSnList;
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
    $scope.edit_platform.goodsSnList = goodsSnList;
  }
  $scope.optimization = function(data){//优选商家，最多六个
    var spGoodsSnList = [
      {
        spSn : "",
        goodsSnList : [ "", "" ]
      },
      {
        spSn : "",
        goodsSnList : [ "", "" ]
      },
      {
        spSn : "",
        goodsSnList : [ "", "" ]
      },
      {
        spSn : "",
        goodsSnList : [ "", "" ]
      },
      {
        spSn : "",
        goodsSnList : [ "", "" ]
      },
      {
        spSn : "",
        goodsSnList : [ "", "" ]
      }
    ]
    console.log(data)
    if(data.spGoodsSnList && data.spGoodsSnList.length){
      for(var r in data.spGoodsSnList){
        if(data.spGoodsSnList[r]){
          spGoodsSnList[r] = data.spGoodsSnList[r];
        }
      }
    }
    $scope.edit_platform.spGoodsSnList = spGoodsSnList;
  }
  $scope.spend = function(data){//已购买，最多五个
    var goodsSnList = [
      {goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''},{goodsSnList:''}
    ];
    if(data.goodsSnList&&data.goodsSnList.length){
      for(var r in goodsSnList){
        if(data.goodsSnList[r]){
          goodsSnList[r].goodsSnList = data.goodsSnList[r];
        }
      }
    }
    $scope.edit_platform.goodsSnList = goodsSnList;
  }
  // 编号位置移动
  $scope.locationChangeDown = function(item,index){//排序向下
    if($scope.edit_platform.positionType == 3||$scope.edit_platform.positionType == 6){
      var spSnList = item.spSnList;
      $scope.edit_platform.spSnList[index].spSnList = $scope.edit_platform.spSnList[index+1].spSnList;
      $scope.edit_platform.spSnList[index+1].spSnList = spSnList;
    }else if($scope.edit_platform.positionType == 4){
      var goodsSnList = item.goodsSnList;
      $scope.edit_platform.goodsSnList[index].goodsSnList = $scope.edit_platform.goodsSnList[index+1].goodsSnList;
      $scope.edit_platform.goodsSnList[index+1].goodsSnList = goodsSnList;
    }else if($scope.edit_platform.positionType == 5){
      var spGoodsSnList = item;
      $scope.edit_platform.spGoodsSnList[index] = $scope.edit_platform.spGoodsSnList[index+1];
      $scope.edit_platform.spGoodsSnList[index+1] = spGoodsSnList;
    }
  }
  $scope.locationChangeOn = function(item,index){//排序向上
    if($scope.edit_platform.positionType == 3){
      var spSnList = item.spSnList;
      $scope.edit_platform.spSnList[index].spSnList = $scope.edit_platform.spSnList[index-1].spSnList;
      $scope.edit_platform.spSnList[index-1].spSnList = spSnList;
    }else if($scope.edit_platform.positionType == 4){
      var goodsSnList = item.goodsSnList;
      $scope.edit_platform.goodsSnList[index].goodsSnList = $scope.edit_platform.goodsSnList[index-1].goodsSnList;
      $scope.edit_platform.goodsSnList[index-1].goodsSnList = goodsSnList;
    }else if($scope.edit_platform.positionType == 5){
      var spGoodsSnList = item;
      $scope.edit_platform.spGoodsSnList[index] = $scope.edit_platform.spGoodsSnList[index-1];
      $scope.edit_platform.spGoodsSnList[index-1] = spGoodsSnList;
    }
  }
  $scope.qualityTransaction = function(){//校验数据是否完整
    $scope.showWeightSnBol = false;
    $scope.showNameBol = false;
    $scope.goodsSnBol = false;
    if(!$scope.edit_platform.showName){
      $scope.showNameBol = true;
      return;
    }else{
      if(!$scope.edit_platform.showWeight){
        $scope.showWeightSnBol = true;
        return;
      }
      for(var r in $scope.edit_platform.goodsSnList){
        if($scope.edit_platform.goodsSnList[r].goodsSnList){
          var goodsSnList = [];
          $scope.edit_platform.goodsSnList.forEach(function(item){//商家编号遍历
            if(item.goodsSnList){
              goodsSnList.push(item.goodsSnList);//有商家编号就push到指定数组
            }
          })
          $scope.edit_platform.goodsSnList = goodsSnList;
          $scope.submitUrl();
          return;
        }
      }
      $scope.goodsSnBol = true;
    }
  }
  $scope.spendTransaction = function(){//已购买校验数据是否完整
    $scope.goodsSnBol = false;
    for(var r in $scope.edit_platform.goodsSnList){
      if($scope.edit_platform.goodsSnList[r].goodsSnList){
        var goodsSnList = [];
        $scope.edit_platform.goodsSnList.forEach(function(item){//商家编号遍历
          if(item.goodsSnList){
            goodsSnList.push(item.goodsSnList);//有商家编号就push到指定数组
          }
        })
        $scope.edit_platform.goodsSnList = goodsSnList;
        $scope.submitUrl();
        return;
      }
    }
    $scope.goodsSnBol = true;
  }
  $scope.optimizationTransaction = function(){//已购买校验数据是否完整
    $scope.goodsSnBol = false;
    for(var r in $scope.edit_platform.spGoodsSnList){
      if($scope.edit_platform.spGoodsSnList[r].spSn){
        if($scope.edit_platform.spGoodsSnList[r].goodsSnList.length){
          $scope.submitUrl();
          return;
        }
        $scope.goodsSnBol = true;
      }
    }
    $scope.goodsSnBol = true;
  }

  $scope.qualitySubmit = function(){//判断数据是否正确
    // 错误提示初始化
    $scope.spSnBol = false;
    $scope.spSnTypeBol = false;
    if(!$scope.edit_platform.positionType){
      $scope.positionTypeBol = true;
      return;
    }
    for(var r in $scope.edit_platform.spSnList){
      if($scope.edit_platform.spSnList[r]){
        if($scope.edit_platform.spSnList[r].length<8){
          $scope.spSnTypeBol = true;
          return;
        }else{//如果数据都ok，则重新封装数据
          var spSnList = [];
          $scope.edit_platform.spSnList.forEach(function(item){//商家编号遍历
            if(item.spSnList){
              spSnList.push(item.spSnList);//有商家编号就push到指定数组
            }
          })
          $scope.edit_platform.spSnList = spSnList;
          $scope.submitUrl();
          return;
        }
        return;
      }
      $scope.spSnBol = true; 
    }
  }
  $scope.submitUrl = function(){//编辑接口
    if(!$scope.edit_platform.showUrl){
      $scope.edit_platform.showUrl = '';
    }
    var spGoodsSnList = [];
    if($scope.edit_platform.spGoodsSnList && $scope.edit_platform.spGoodsSnList.length){//去除商家编号为的空对象
      for(var i in $scope.edit_platform.spGoodsSnList){
        console.log($scope.edit_platform.spGoodsSnList[i])
        if($scope.edit_platform.spGoodsSnList[i].spSn){
          spGoodsSnList.push($scope.edit_platform.spGoodsSnList[i]);
        }
      }
    }
    
    for(var r in $scope.edit_platform.spGoodsSnList){//后台接口无法处理空对象，所以要排除商家后面为空的商品编号
      var goodsSnList = [];
      if($scope.edit_platform.spGoodsSnList[r].goodsSnList[0]){
        goodsSnList.push($scope.edit_platform.spGoodsSnList[r].goodsSnList[0])
      }
      if($scope.edit_platform.spGoodsSnList[r].goodsSnList[1]){
        goodsSnList.push($scope.edit_platform.spGoodsSnList[r].goodsSnList[1])
      }
      $scope.edit_platform.spGoodsSnList[r].goodsSnList = goodsSnList;
    }
    $scope.edit_platform.spGoodsSnList = spGoodsSnList;
    console.log($scope.edit_platform.spGoodsSnList)
    marKetList.editOperatePosition($scope.edit_platform,function(data){
      $location.path('main/market_home/platform');
    },function(data){
      init_order_detail();
      alert(data.data.msg);
    })
  }
});

