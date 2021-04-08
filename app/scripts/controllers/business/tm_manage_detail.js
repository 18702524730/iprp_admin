angular.module('iprpAdminApp').controller('BusinessTmManageDetailCtrl',function($scope, $modal, $stateParams, ProductService, marKetList, PaginationService,$location,$state){
    $('#tm_manage').addClass("selected").parent().siblings().children().removeClass("selected");

    // 顶部模板切换
    $scope.tempTab = 1;
    $scope.tmDetail = {};  //商标详情
    $scope.optionList = []; //商标操作记录
    $scope.remarkList = [];  //备注列表
    $scope.cateIdData = cateIdData;  //所有商标分类

    // 价格类型
    $scope.priceTypes = [
      {name: '一口价', id:1},
      {name: '可议价', id:2},
      {name: '面议', id:3},
    ];
    // 销售状态
    $scope.saleStatusList = [
      {name: '待售', id:1},
      {name: '预定', id:2},
      {name: '已售', id:3},
      {name: '不可出售', id:4},
      {name: '销售中', id:5},
    ];
    // 商标组合
    $scope.combyList = [
      {name: '中文', id:1},
      {name: '字母', id:2},
      {name: '图形', id:3},
      {name: '数字', id:4},
      {name: '组合', id:5},
    ];
    // 注册年限
    $scope.regYearList = [
      {name: '1年以内', id:1},
      {name: '1-3年', id:2},
      {name: '3-10年', id:3},
      {name: '10年以上', id:4}
    ];
    // 是否可开票
    $scope.needTicketList = [
      {name: '可开票', id: 1},
      {name: '不可开票', id: 2},
    ];
    // 上架状态
    $scope.groundStatusList = [
      {name: '上架', id: 1},
      {name: '下架', id: 2},
    ];
    // 审核状态
    $scope.verifyStatusList = [
      {name: '审核通过', id: 1},
      {name: '审核未通过', id: 2},
    ];
    // 字数
    $scope.wordList = [
      {name: '1-2字', id:1},
      {name: '2字', id:2},
      {name: '3字', id:3},
      {name: '4字', id:4},
      {name: '4字以上', id:5},
    ];
    // 法律状态
    $scope.tmStatusList = [
      {name:'销亡', id:0},
      {name:'待审中', id:1},
      {name:'已注册', id:2},
      {name:'已驳回', id:3},
      {name:'已初审', id:4},
    ];
    // 上架状态
    $scope.trademarkFrom = [
      {name: '自己', id: 1},
      {name: '他人', id: 2},
    ];

    // 添加备注
    $scope.addRemarkFn= function(){
      $modal.open({
          resolve:{
            props : function(){
              return {
                id:  $stateParams.tmiD ,          
                fromPage: 'tm_manage_detail'
              };
            }
          },
          backdrop:false,
          keyboard:true,
          templateUrl: 'package\\modal\\fast\\add_remark.html',
          controller: 'addRemarkCtrl'
      }).result.then(function (result) {
          $state.reload();
          getRemarkListFn();  //查询备注列表
          return;
      });
    };

    // 初始化查询
    function getTmDetailFn () {
      var params = {
        trademarkId: parseInt($stateParams.tmiD)
      };
      // 查询商标详情
      ProductService.getTrademarkDetailById(params, function(data){
        $scope.tmDetail = data;
      });
      // 查询商标操作记录   
      ProductService.getTMOperateRecordList(params, function(data){
        $scope.optionList = data.data;
      });
    }
    getTmDetailFn();  //初始化查询

    // 查询备注列表
    function getRemarkListFn () {
      var params = {
        trademarkId: parseInt($stateParams.tmiD)
      };
      // 查询备注列表   
      ProductService.getTMRemarkList(params, function(data){
        console.log(data)
        $scope.remarkList = data.elements;
      });
    };
    getRemarkListFn();

    // 推荐运营位 或者编辑
    $scope.showPositionBoxFn = function(goods_sn, type, id){
      if (!goods_sn) {
        alert('商标编号为空');
        return;
      }
      $modal.open({
          resolve:{
              positionObj : function(){
                return {
                  goods_sn: goods_sn,
                  type: type,
                  id: id
                };
              }
          },
          backdrop:false,
          keyboard:true,
          templateUrl: 'package\\modal\\business\\edit_position.html',
          controller: 'editPositionModalCtrl'
      }).result.then(function (result) {
          getTmDetailFn();  //初始化查询
      });
    };

    // 删除运营位推荐
    $scope.deletePositionFn = function(item) {
      console.log(item)
      layer.confirm('确定删除运营位推荐？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        marKetList.delPositionTrademark({id: item.id}, function(data){
          layer.closeAll();
          getTmDetailFn();  //初始化查询
        });
      }, function(){
      });
      
    };



});

