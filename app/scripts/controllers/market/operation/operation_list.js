angular.module('iprpAdminApp').controller('OperationListCtrl',function($scope, $rootScope, $modal, Upload, marKetList,ChannelService,PaginationService,$location,$state){
  $('#operation_list').addClass("selected").parent().siblings().children().removeClass("selected");

  // 初始化参数
  $scope.typeTab = 1;  // 1.列表页 2.新增 3.管理商品 4.修改
  $scope.showError = false;
  $scope.addPositionObj = {};  //新增运营位
  $scope.sale_status = 1;  //销售状态
  $scope.tardemarkList = [];  //运营位商标列表
  $scope.imageList = [];
  $scope.cateIdData = cateIdData;  //所有商标分类
  $scope.remarkLen = 0;  //备注长度

  $scope.saleStatusList = [
    {name: '待售', id:1},
    {name: '预定', id:2},
    {name: '已售', id:3},
    {name: '不可出售', id:4},
    {name: '销售中', id:5},
  ];

  $scope.orderTypeList = [
    {name: '手动排列', id:1}
  ];

  $scope.getRemarkLenFn = function(){
    $scope.remarkLen = $scope.addPositionObj.remark.length;
  };

  // 查询运营位商标接口列表
  function getTrademarkListFn (tyoeId) {
    if (!tyoeId) {
      tyoeId = null;
    }
    marKetList.findPositionTrademark({id: $location.$$search.id, sale_status: tyoeId}, function(data){
      if (data.elements.length) {
        $scope.tardemarkList = data.elements;
      }
      else{
        $scope.tardemarkList = [];
      }
    });
  }

  // 查询运营位详情
  function getPositionDetailFn (id) {
    marKetList.findPositionById({id: id}, function(data){
      $scope.addPositionObj = data;
      $scope.addPositionObj.showName = data.show_name;
      $scope.addPositionObj.businesstype = data.business_type;
      $scope.addPositionObj.showWeight = data.show_weight;
      $scope.addPositionObj.businessType = data.business_type+''; 
    });
  }
      

  // 初始化页面
  function loadPageFn () {
    if ($location.$$search && $location.$$search.type) {   //从URL中获取类型，看看当前是列表页、详情页、或者是管理页
      $scope.typeTab = $location.$$search.type;
    }
    else{
      $scope.typeTab = 1;
    }
    if ($scope.typeTab == 3) {
      // 查询运营位商标列表
      getTrademarkListFn();
    }
    else if ($scope.typeTab == 4) {  //修改
      getPositionDetailFn($location.$$search.id);
    }
  }
  loadPageFn();

  $rootScope.$on('$locationChangeStart',function (event,msg) {
    // 初始化页面
    loadPageFn();
  });

  // 切换tab
  $scope.changeTabFn = function(type, item) {
    $scope.typeTab = type;
    if (type == 1) {
      $scope.addPositionObj = {};  //新增运营位
      location.href = '#main/market_home/operation?type=' + type;
    }
    else if (type == 2) {
      location.href = '#main/market_home/operation?type=' + type;
    }
    else if (type == 3) {  //管理商品
      location.href = '#main/market_home/operation?type=' + type +'&id=' + item.id;
    }
    else if (type == 4) {  //修改
      location.href = '#main/market_home/operation?type=' + type +'&id=' + item.id; 
    } 
  };

  // 选择销售状态
  $scope.selectStatusFn = function(stuatus) {
    getTrademarkListFn(stuatus); //查询运营位商标接口列表
  };

  // 新增商标
  $scope.addTmFn= function(){
    var id = $location.$$search.id;
    $modal.open({
        resolve:{
          id : function(){
              return id;
          }
        },
        backdrop:false,
        keyboard:true,
        templateUrl: 'package\\modal\\market\\add_tm.html',
        controller: 'addTmCtrl'
    }).result.then(function (result) {
      console.log(result);
      // 查询运营位商标列表
      getTrademarkListFn();
    });
  };
  
  // 查询运营位列表
  function init_order_list() {
      $scope.to_loading = true;//默认 开始 加载
      $scope.loading_text = "加载中...";//加载页面内容
      var OweNer = function (pg_index, pg_count, cb) {
          var pageConfig = {
              "pg_index": pg_index,
              "pg_count": pg_count
          };
          $location.path('main/market_home/operation');
          marKetList.findAllPosition(pageConfig,cb);
      };
      $scope.pagination = new PaginationService(OweNer, 15);
      $scope.$watch('pagination.curPageItems', function (newItems) {
          $scope.positionList = [];
          if (newItems == undefined)
              return;
          if ($scope.pagination.curPageItems.length === 0) {
              $scope.loading_text = "没有符合条件的记录";//加载页面内容
              return;
          }
          $scope.positionList = newItems;
          $scope.to_loading = false;//如果不为空 结束加载页面
      });
  }
  init_order_list();

  // 管理商品
  $scope.manageTmFn = function(item) {
    $scope.typeTab = 3;
  };

  // 删除运营位
  $scope.deleteFn = function (item) {
    layer.confirm('确认删除此运营位？', {icon: 3, title:'提示'}, function(index){
      marKetList.delAllPosition({id: item.id}, function(data){
        layer.close(index);
        layer.alert('操作成功！');
        init_order_list();
      });
    });   
  };

  /**
     * 上传打款凭证
     */
  $scope.uploadFile = function (file) {
      //console.log(file.size);
      var MAX_POST_SIZE = 1 * 1024 * 1024;
      console.log(file)
      if (!/\.(jpg|jpeg|png|bmp)$/i.test(file.name)){
        alert("上传图片仅支持jpg、png、bmp格式");
      }
      else if(file.size > MAX_POST_SIZE){
        alert("上传图片请小于1M");
      }
      else{
          Upload.upload({
              url: options.api.base_url + '/file/upload',
              data: {Filedata: file}
          }).then(function (resp) {
              resp = resp.data;
              if(resp.url != undefined){
                  $scope.addPositionObj.show_picture_url = resp.url;
                  $scope.imageList.push(resp.url);
              }
          }, function (resp) {
              resp = resp.data;
          });
      }
  };

  // 新增运营位
  $scope.submitUpdateFn = function (type) {
    var params = $scope.addPositionObj;
    params.sortId = 1;
    if (!params.businessType || !params.showName || !params.showWeight ) {
      $scope.showError = true;
    }
    else{
      // 新增
      if (type == 1) {
        marKetList.addAllPosition(params, function(data){
          layer.alert('新增成功!');
          $scope.changeTabFn(1);
          init_order_list();
        }, function(data){
          if (data.data.msg) {
            alert(data.data.msg);
          }
        });
      }
      else if (type == 2) {  //修改
        params.id = $scope.addPositionObj.id;
        marKetList.updateAllPosition(params, function(data){
          layer.alert('修改成功!');
          $scope.changeTabFn(1);
          init_order_list();
        });
      }
    }   
  };

  // 删除运营位商标
  $scope.deleteTmFn = function(item) {
    layer.confirm('确认删除此运营位商标?', {icon: 3, title:'提示'}, function(index){
      marKetList.delPositionTrademark({id: item.id}, function(data) {
        layer.close(index);
        layer.alert('操作成功！');
        // 查询运营位商标列表
        getTrademarkListFn();
      });
    });
  };

  // 上移下移商标运营位接口
  $scope.moveItemInListFn = function(item, type , index) {
    var params = {};
    params.own_id = item.id;
    // 上移
    if (type == 1) {
      params.target_id = $scope.tardemarkList[index-1].id;
    }
    else if (type == 2) {   //下移
      params.target_id = $scope.tardemarkList[index+1].id;
    }
    marKetList.movePositionTrademark(params, function(data){
      // 查询运营位商标列表
      getTrademarkListFn();
    });
  };

  // 管理商标
  $scope.gpTmPageFn = function(){
    $location.path('main/business_home/tm_manage');
  };

  // 校验权重
  $scope.checkWeightFn = function(val) {
    if (val && val>=1 && val<=10) {
      $scope.weightError = false;
    }
    else{
      $scope.weightError = true;
    }
  };

  // 商标详情
  $scope.goTmDetailFn = function(item) {
    $state.go('main.business_home.tm_manage_detail', {tmiD: item.trademark_id});
  };


});

