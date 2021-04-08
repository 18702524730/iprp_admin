angular.module('iprpAdminApp').controller('materialCouponCtrl', function ($scope,ProductNum,PartnerService, $cookies,marKetList) {
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
    PartnerService.materialCenter(function(data){
      $scope.couponCategory = data;
      console.log(data)
      $scope.checkFirst(data[0].subMaterials,0)
    })
  };
  search();

  $scope.checkFirst = function(item,index){//第二层子元素
    $scope.couponCategoryFirst = item;
    console.log($scope.couponCategoryFirst,item)
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
  $scope.sChoose = function(item){
      console.log("测试01",item)
    //判断选中的服务有没有当前类别
    if($scope.allProductNum.indexOf(item.id) !== -1){//有当前类别删除
      $scope.allProductNum.splice($scope.allProductNum.indexOf(item.id),1);
      $scope.allProductNumInfo.splice($scope.allProductNum.indexOf(item.id),1);
    }else{//没有当前类别
      $scope.allProductNum.push(item.id)
      $scope.allProductNumInfo.push({
        id:item.id,
        title:item.title
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
