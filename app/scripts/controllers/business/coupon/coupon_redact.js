angular.module('iprpAdminApp').controller('couponRedactCtrl',function($scope,ProductService,bsOrderService,RefundService, $modal, $stateParams,$state, $location,Upload,PartnerService){
  $('#coupon_list').siblings().removeClass("selected");
  $('#coupon_list').addClass("selected");
  $scope.productNumArr = []; 
  $scope.order_detail = {};
  $scope.id = $stateParams.id;
  $scope.removeName = function(item){
    console.log(item)
    $scope.productNumArr.splice(item,1);
    $scope.allProductNumInfo.splice(item,1);
  }

  $scope.ceshi = function (argument) {
    console.log(11111111)
  }

  $scope.preview = function () {
    console.log(123)
    layer.open({
      title: '预览'
      ,content: '<img style="height: 300px;" src="'+ $scope.order_detail.picture +'" />'
    }); 
  }


  // 弹窗
  $scope.checkFn = function(){
      $scope.productBol = false;
    $modal.open({
      resolve:{
        ProductNum:function(){
          var data = {
            allProductNum:$scope.productNumArr,
            allProductNumInfo:$scope.allProductNumInfo
          }
          return data
        }
      },
      backdrop:'static',
      templateUrl: 'package\\modal\\coupon\\material_coupon.html',
      controller: 'materialCouponCtrl'
    }).result.then(function (result) {
      console.log('成功调取')
      $scope.productBol = true;
      $scope.productNumArr = result.allProductNumLook;
      $scope.allProductNumInfo = result.allProductNumInfoLook;
    },function(err){
      console.log('失败调取')
      $scope.productBol = true;
      $scope.productNumArr = $scope.productNumArr;
      $scope.allProductNumInfo = $scope.allProductNumInfo;
    });
  };
  if ($scope.id != 'add') {
    search();
  }

  function search() {
    PartnerService.findPartnerGoodsDetail({id: $stateParams.id},function(resp) {
      $scope.order_detail = resp;
      $scope.disablePartnerTask = resp.disablePartnerTask==1?true:false;
      if(resp.relatedMaterials){
        $scope.allProductNumInfo = resp.relatedMaterials;
        for (var i = 0; i < resp.relatedMaterials.length; i++) {
          $scope.productNumArr.push(resp.relatedMaterials[i].id);
        }
      }
    },function(argument) {
      // body...
    })
  }
  $scope.uploadFile = function (file) {
    console.log(file)
    var MAX_POST_SIZE = 1024 * 1024 * 10;
    if(!file){
      console.log('11')
        return; 
    }
    if(!(/(?:jpg|png|bmp|jpeg)$/i.test(file.name))) {
      console.log(123)
        layer.alert("文件格式错误，请上传jpeg、jpg、bmp、png格式的文件");
        return;
    }
    if(file && file.size > MAX_POST_SIZE){
      layer.alert("上传文件请小于10M");
    }else{
        $scope.fileName = file.name;
        Upload.upload({
            url: options.api.base_url + '/file/upload',
            data: {Filedata: file}
        }).then(function (resp) {
            $scope.order_detail.picture = resp.data.url.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
            console.log(resp.data.url)
        }, function (resp) {
            resp = resp.data;
        });
    }
};
  $scope.sureEditPrice = function(){//确认
    let reg = /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/;
    let reg2 = /^([1-9]\d{0,9})|([1-9]\d{0,9}\.\d{1,2})|([0]\.\d{1,2})$/;
    if (!$scope.order_detail.name) {
      layer.open({
        title: '提示'
        ,content: '请填写商品名称'
      });  
      return;
    }
    if (!$scope.order_detail.picture) {
      layer.open({
        title: '提示'
        ,content: '请上传商品首图'
      });  
      return;
    }
    if (!$scope.order_detail.productIntroduce) {
      layer.open({
        title: '提示'
        ,content: '请填写商品介绍'
      });  
      return;
    }
    if ($scope.id=='add') {
      if (!$scope.order_detail.firstCategory) {
        layer.open({
          title: '提示'
          ,content: '请选择所属业务'
        });  
        return;
      }
      if (!$scope.order_detail.secondCategory) {
        layer.open({
          title: '提示'
          ,content: '请选择业务分类'
        });  
        return;
      }
      if (!$scope.order_detail.codes) {
        layer.open({
          title: '提示'
          ,content: '请选择服务类目'
        });  
        return;
      }
    }
    if (!$scope.order_detail.productIntroduce) {
      layer.open({
        title: '提示'
        ,content: '请填写商品介绍'
      });  
      return;
    }
    if (!reg2.test($scope.order_detail.guidePrice)) {
      layer.open({
        title: '提示'
        ,content: '市场指导价为大于0的数字最多保留两位小数'
      });  
      return;
    }
    if (!reg2.test($scope.order_detail.peAmount)) {
      layer.open({
        title: '提示'
        ,content: '官费为大于0的数字最多保留两位小数'
      });  
      return;
    }
    let reg3 = /^([1-9]\d{0,9}(\.\d{1,2})?|0(\.\d{1,2})?)$/;
    if (!reg3.test($scope.order_detail.reservePrice)) {
      layer.open({
        title: '提示'
        ,content: '结算底价为非负数最多保留两位小数'
      });  
      return;
    }
    if (!$scope.order_detail.descriptions) {
      layer.open({
        title: '提示'
        ,content: 'PC业务介绍不能为空'
      });  
      return;
    }
    if (!$scope.order_detail.applyProcess) {
      layer.open({
        title: '提示'
        ,content: 'H5业务介绍不能为空'
      });  
      return;
    }
    if (!$scope.order_detail.commonProblem) {
      layer.open({
        title: '提示'
        ,content: '常见问题不能为空'
      });  
      return;
    }
    if (!reg.test($scope.order_detail.requirementReturnProportion)) {
      layer.open({
        title: '提示'
        ,content: '需求佣金比请输入0到1之间数字，最多小数点后两位'
      });  
      return;
    }
    if (!reg.test($scope.order_detail.saleTaskReturnProportion)) {
      layer.open({
        title: '提示'
        ,content: '销售作业佣金比请输入0到1之间数字，最多小数点后两位'
      });  
      return;
    }
    if (!reg.test($scope.order_detail.saleReturnProportion)) {
      layer.open({
        title: '提示'
        ,content: '销售佣金比请输入0到1之间数字，最多小数点后两位'
      }); 
      return;
    }
    var data = {
      id:Number($stateParams.id),
      disablePartnerTask : $scope.disablePartnerTask ? 1 : 0,
      guidePrice:Number($scope.order_detail.guidePrice),
      peAmount:Number($scope.order_detail.peAmount),
      reservePrice:Number($scope.order_detail.reservePrice),
      saleTaskReturnProportion:Number($scope.order_detail.saleTaskReturnProportion),
      saleReturnProportion:Number($scope.order_detail.saleReturnProportion),
      relatedMaterialIds:$scope.productNumArr,
      descriptions:$scope.order_detail.descriptions,
      applyProcess:$scope.order_detail.applyProcess,
      requirementReturnProportion:$scope.order_detail.requirementReturnProportion,
      commonProblem:$scope.order_detail.commonProblem,
      name:$scope.order_detail.name,
      picture:$scope.order_detail.picture,
      productIntroduce:$scope.order_detail.productIntroduce
    }
    var dataInfo = $.extend({}, data);
    if ($scope.id == 'add') {
      delete dataInfo.id // shopBusinessTypeName shopClassTypeName shopProductTypeName
      delete dataInfo.shopBusinessTypeName // shopBusinessTypeName shopClassTypeName shopProductTypeName
      delete dataInfo.shopClassTypeName // shopBusinessTypeName shopClassTypeName shopProductTypeName
      delete dataInfo.shopProductTypeName // shopBusinessTypeName shopClassTypeName shopProductTypeName
      dataInfo.codes = $scope.order_detail.codes
      dataInfo.firstCategory = $scope.order_detail.firstCategory
      dataInfo.secondCategory = $scope.order_detail.secondCategory
      dataInfo.picture = $scope.order_detail.picture
      PartnerService.addPartnerGoods(dataInfo,function(resp) {
        console.log(resp);
        $location.path('main/business_home/coupon_list');
      },function(error) {
        layer.open({
          title: '提示'
          ,content: error.data.msg
        }); 
        console.log('as', error.data);
      })
      return
    }
    PartnerService.editPartnerGoods(dataInfo,function(resp) {
      console.log(resp);
      $location.path('main/business_home/coupon_list');
    },function(error) {
        layer.open({
          title: '提示'
          ,content: error.data.msg
        }); 
    })
  }

  $scope.bs_type_change = function(type, id, callback){
    console.log(type, id)
    if (id) {
      if (type == 3) {
        bsOrderService.serviceStatus({
            bsId: id
        },function(data){
          $scope['fouTypeData'] = data.data;
          if (callback) {
              callback();
          }else{
              // $scope.typeobj.fou_id='';
          }
        },function(error){
          alert(error.data.msg);
        })
      }else{
        bsOrderService.productType({
            type:type,
            parent_id: id
        },function(data){
            if (type == 1) {
                $scope['secTypeData'] = data;
                if (callback) {
                    callback();
                }else{
                    $scope.order_detail.secondCategory='';
                    $scope.order_detail.codes='';
                    $scope['thiTypeData']=[];
                    $scope['fouTypeData']=[];
                }
            }else if(type == 2){
                $scope['thiTypeData'] = data;
                if (callback) {
                    callback();
                }else{
                    $scope.order_detail.codes='';
                    $scope['fouTypeData']=[];
                }
            }
        },function(error){
            alert(error.data.msg);
        })
      }
    }else{
        if (type == 1) {
            $scope.order_detail.secondCategory='';
            $scope.order_detail.codes='';
            $scope['secTypeData']=[];
            $scope['thiTypeData']=[];
            $scope['fouTypeData']=[];
        }else if(type == 2){
            $scope.order_detail.codes='';
            $scope['thiTypeData']=[];
            $scope['fouTypeData']=[];
        }else if(type == 3){
            $scope['fouTypeData']=[];
        }
    }
}
      //获取商品一级分类
      RefundService.productType(function(data){
          $scope.firTypeData = data;
      },function(error){
          //alert(error.data.msg);
      });


      //获取商品二级分类
      if ($scope.order_detail.firstCategory) {
          $scope.bs_type_change(1, $scope.order_detail.firstCategory, function(){
              $scope.order_detail.secondCategory = $scope.order_detail.secondCategory-0;
          });
      }

      //获取商品三级分类
      if ($scope.order_detail.secondCategory) {
          $scope.bs_type_change(2, $scope.order_detail.secondCategory, function(){
              $scope.order_detail.thi_id = $scope.order_detail.thi_id-0;
          });
      }
    
});

