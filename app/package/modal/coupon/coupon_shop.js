angular.module('iprpAdminApp').controller('couponReasonCtrl', function ($scope,ProductNum,PartnerService, $cookies,marKetList) {
  $scope.indexFirst = '';//二层子元素
  $scope.allProductNum = ProductNum.allProductNum ? ProductNum.allProductNum : [];//选中的服务
  $scope.allProductNumInfo = ProductNum.allProductNumInfo ? ProductNum.allProductNumInfo : [];//选中的服务内容

  $scope.nextChilds = [];//判断二层是否全选
  console.log()
  //关闭
  $scope.cancel = function () {
    $scope.$close({
      allProductNumLook : ProductNum.allProductNum,
      allProductNumInfoLook:ProductNum.allProductNumInfo
    });
  };
 
  $scope.couponCategory = {};//服务
  $scope.couponCategoryFirst = {};//第二层 

  function search(){//初始化
    marKetList.findAllCategory(function(data){
      $scope.couponCategory = data;
      console.log(data)
      $scope.checkFirst(data[0].childs,0)
    })
  };
  search();

  $scope.checkFirst = function(item,index){//第二层子元素
    $scope.couponCategoryFirst = item;
    $scope.indexFirst = index;
  }
  function unique(arr){//数组去重
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
     if(hash.indexOf(arr[i])==-1){
        hash.push(arr[i]);
      }
    }
    return hash;
  }
  function uniqueObj(arr){
   let unique = {};
   arr.forEach(function(item){
     unique[JSON.stringify(item)]=item;//键名不会重复
   })
   arr = Object.keys(unique).map(function(u){ 
   //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
     return JSON.parse(u);
   })
   return arr;
 }
  $scope.allChilds = function(item){//全选
    var nextChildsList = item.childs;
    if($scope.nextChilds.indexOf(item.bsClassName) === -1 || !$scope.nextChilds.length){//当前没有全选
      $scope.nextChilds.push(item.bsClassName);
      nextChildsList.forEach(function(data){
        $scope.allProductNum.push(data.productNum);
        $scope.allProductNumInfo.push({
          productNum:data.productNum,
          name:data.name
        });
      })
      $scope.allProductNum = unique($scope.allProductNum);
      $scope.allProductNumInfo = uniqueObj($scope.allProductNumInfo);
    }else{//当前层级已经全选
      $scope.nextChilds.splice($scope.nextChilds.indexOf(item.bsClassName),1);//删除
      nextChildsList.forEach(function(data){
        if($scope.allProductNum.indexOf(data.productNum) !== -1){
          $scope.allProductNum.splice($scope.allProductNum.indexOf(data.productNum),1);
          $scope.allProductNumInfo.splice($scope.allProductNum.indexOf(data.productNum),1);
        }
      })
    }
      console.log("测试",$scope.allProductNum)
  }
  $scope.sChoose = function(item,bsClassName){
      console.log("测试01")
    // 第二层数据全选为false
    if($scope.nextChilds.indexOf(bsClassName) !== -1 || !$scope.nextChilds.length){
      $scope.nextChilds.splice($scope.nextChilds.indexOf(bsClassName),1);//删除
    }
    //判断选中的服务有没有当前类别
    if($scope.allProductNum.indexOf(item.productNum) !== -1){//有当前类别删除
      $scope.allProductNum.splice($scope.allProductNum.indexOf(item.productNum),1);
      $scope.allProductNumInfo.splice($scope.allProductNum.indexOf(item.productNum),1);
    }else{//没有当前类别
      $scope.allProductNum.push(item.productNum)
      $scope.allProductNumInfo.push({
        productNum:item.productNum,
        name:item.name
      })
    }
  }

  $scope.addCoupon = function(){
    if(!$scope.allProductNum.length){
      alert('请选择试用商品')
      return;
    }
    $scope.$close({
      allProductNumLook : $scope.allProductNum,
      allProductNumInfoLook:$scope.allProductNumInfo
    });
  }
  
});
