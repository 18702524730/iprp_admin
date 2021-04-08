angular.module('iprpAdminApp').controller('BusinessTmManageCtrl',function($scope, $modal, $sce, ProductService, marKetList, PaginationService,$location,$state){
    $('#tm_manage').addClass("selected").parent().siblings().children().removeClass("selected");

    // 添加时间控件 初始化
    $('#registryStartTime,#registryEndTime,#offShelfTimeStart,#offShelfTimeEnd').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      todayBtn:  1,
      autoclose:  true
    });
    $('.datetimepicker').css('display','none');

    // 价格类型
    $scope.priceTypes = [
      {name: '一口价', id:1},
      {name: '可议价', id:2},
      {name: '面议', id:3},
    ];
    // 销售状态
    $scope.saleStatusList = [
      {name: '待售', id:1},
      {name: '预订', id:2},
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
    $scope.cateIdData = cateIdData;  //所有商标分类
    $scope.showAllIntCls = false;  //展示所有分类
    $scope.activeId = 0;
    $scope.groupList = []; //类似群组

    // 选择商标分类
    $scope.selectInClsFn = function(type, info) {
      if (type) {  //不限
        $scope.activeId = 0;
      }
      else{
        $scope.activeId = info.id;
        $scope.obj.category = info.id;
        ProductService.findGroup({classId: info.id}, function(data){
          $scope.groupList = data;
        });
      }
    };

    // 选择群组
    $scope.selectGroupFn = function(type, item) {
      if (type) {  //全选
        $scope.groupList.forEach(function(info){
          info.active = false;
        });
        $scope.groupAll = true;  //不限
      }
      else{
        $scope.groupAll = false;  //不限
        item.active = !item.active;
      }
    };

    // 所属业务
    function request_businessTypes(){
        ProductService.businessTypeList(function(resp){
            if(resp.code == 'success'){
                $scope.businessTypes = resp.data;
            }else {
                console.error(resp.msg);
            }
        })
    }
    request_businessTypes();

    var MsecFormat = function (input) {
        if(input == null || input=='' || typeof(input) == "undefined"){
            return "--";
        }
        var _date = new Date(input-0);
        var year = _date.getFullYear();
        var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
        var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
        var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
        var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
        var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
        return year + "-" + month + "-" + day;
    };
    $scope.obj = $location.search() || {};
    // $scope.onShelvesTimeStart = $scope.obj.onShelvesTimeStart && MsecFormat($scope.obj.onShelvesTimeStart);
    // $scope.onShelvesTimeEnd = $scope.obj.onShelvesTimeEnd && MsecFormat($scope.obj.onShelvesTimeEnd-86399000);
    // $scope.offShelfTimeStart = $scope.obj.offShelfTimeStart && MsecFormat($scope.obj.offShelfTimeStart);
    // $scope.offShelfTimeEnd = $scope.obj.offShelfTimeEnd  && MsecFormat($scope.obj.offShelfTimeEnd-86399000);

    // 查询运营位列表
    function getPositionFn () {
      marKetList.findAllPosition({'pg_index': 0, 'pg_count': 100}, function(data){
        $scope.positionList = data.elements;
      });
    };
    getPositionFn();

    // 查询商标管理列表
    function init_order_list(needInit) {
        if (needInit) {
            $scope.obj = $location.search() || {};
        }
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容

        //获取时间
        var get_time = function (name, isEnd) {
          if (!$scope[name] ) {
            return ''
          } else {
            var t = new Date($scope[name]).getTime();
            return isEnd ? t + 86399000 : t;
          }
        };

        var OweNer = function (pg_index, pg_count, cb) {
            //url查询参数中有pg_index时，初始化页面时取该参数，赋值后清空。
            if ($scope.obj.pg_index) {
                pg_index = $scope.obj.pg_index;
                $scope.obj.pg_index = '';
            }
            var pageConfig = {
                "pg_index": pg_index,
                "pg_count": pg_count,
            };
            // 是否需要开发票
            if ($scope.obj.needTicket) {
              $scope.obj.needTicket = $scope.obj.needTicket-0;
            }
            // 上架状态
            if ($scope.obj.groundStatus) {
              $scope.obj.groundStatus = $scope.obj.groundStatus-0;
            }
            // 审核状态
            if ($scope.obj.verifyStatus) {
              $scope.obj.verifyStatus = $scope.obj.verifyStatus-0;
            }
            // 销售状态
            if ($scope.obj.saleStatus) {
              $scope.obj.saleStatus = $scope.obj.saleStatus-0;
            }
            // 商标组合
            if ($scope.obj.comby) {
              $scope.obj.comby = $scope.obj.comby-0;
            }
            // 商标组合
            if ($scope.obj.comby) {
              $scope.obj.comby = $scope.obj.comby-0;
            }
            // 字数
            if ($scope.obj.wordCountType) {
              if ($scope.obj.wordCountType == 1) {   //1-2字
                $scope.obj.lessWordCount = 2;
                $scope.obj.moreWordcount = 1;
              }
              else if ($scope.obj.wordCountType == 2 || $scope.obj.wordCountType == 3 || $scope.obj.wordCountType == 4){
                $scope.obj.lessWordCount = $scope.obj.wordCountType-0;
                $scope.obj.moreWordcount = $scope.obj.wordCountType-0;
              }
              else if ($scope.obj.wordCountType == 5){
                $scope.obj.lessWordCount = null;
                $scope.obj.moreWordcount = 5;
              }
            }
            // 注册年限
            if ($scope.obj.regDataTypeId) {
              if ($scope.obj.regDataTypeId == 1) {  //1年以内
                $scope.obj.regLessYear = 1;
                $scope.obj.regMoreYear = null;
              }
              else if ($scope.obj.regDataTypeId == 2) {  //1-3年
                $scope.obj.regLessYear = 3;
                $scope.obj.regMoreYear = 1;
              }
              else if ($scope.obj.regDataTypeId == 3) {  //3-10年
                $scope.obj.regLessYear = 10;
                $scope.obj.regMoreYear = 3;
              }
              else if ($scope.obj.regDataTypeId == 4) {  //10年以上
                $scope.obj.regLessYear = null;
                $scope.obj.regMoreYear = 10;
              }
            }
            if ($scope.obj.groundStatus) {
              $scope.obj.groundStatus = $scope.obj.groundStatus+'';
            }
            if ($scope.obj.verifyStatus) {
              $scope.obj.verifyStatus = $scope.obj.verifyStatus+'';
            }
            if ($scope.obj.saleStatus) {
              $scope.obj.saleStatus = $scope.obj.saleStatus+'';
            }
            if ($scope.obj.comby) {
              $scope.obj.comby = $scope.obj.comby+'';
            }
            if ($scope.obj.regDataTypeId) {
              $scope.obj.regDataTypeId = $scope.obj.regDataTypeId+'';
            }
            if ($scope.obj.needTicket) {
              $scope.obj.needTicket = $scope.obj.needTicket+'';
            }
            // $scope.obj.groundStatus = $scope.obj.groundStatus+'';
            console.log($scope.obj);
            // $scope.obj.verifyStatus = $scope.obj.verifyStatus+'';
            // $scope.obj.saleStatus = $scope.obj.saleStatus+'';
            var object = $.extend({}, $scope.obj, pageConfig);
            $location.search(object).replace();
            ProductService.getTmlist(object, cb);
        };
        $scope.pagination = new PaginationService(OweNer, 15, $scope.obj.pg_index);

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.OrderList = [];
            $scope.to_loading = false;//如果不为空 结束加载页面
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.OrderList = newItems;
            $scope.OrderList.forEach(function(item){
              if (!item.trademarkName) {
                item.trademarkName = '图形';
              }
              // item.trademarkNameTag = item.trademarkName.replace(/\s{1}/g, '&nbsp;'); //把后台返回的商标名称字段中的所有空格转换为&nbsp;
              // item.trustTrademarkNameTag = $sce.trustAsHtml('<p>'+item.trademarkNameTag+'</p>');  //受信任的字符串
            });
        });
    }
    init_order_list();

    // 获取时间戳
    function getTimeFn (time) {
      return new Date(time).getTime();
    }

    //按条件查询
    $scope.search_order = function(){
      if ($scope.obj.commitStartTime) {
        $scope.obj.commitStartTime = getTimeFn($scope.obj.commitStartTime);
      }
      if ($scope.obj.commitEndTime) {
        $scope.obj.commitEndTime = getTimeFn($scope.obj.commitEndTime)+86399000;
      }
      if ($scope.obj.registryStartTime) {
        $scope.obj.registryStartTime = getTimeFn($scope.obj.registryStartTime);
      }
      if ($scope.obj.registryEndTime) {
        $scope.obj.registryEndTime = getTimeFn($scope.obj.registryEndTime)+86399000;
      }
      var arr = [];
      $scope.groupList.forEach(function(item){
        if (item.active) {
          arr.push(item.niceGroupGovernNum);
        }
      });
      if (arr.length) {
        $scope.obj.similarGroupList = arr.join(',');
      }
      else{
        $scope.obj.similarGroupList = '';
      }
      init_order_list();
    };

    $scope.search_reset = function () {
      $scope.activeId = 0;
      $scope.obj = {};
      init_order_list();
    };

    //查看
    $scope.viewGood = function(index){
      $state.go('main.business_home.product_detail', {productPriceId: index});
    }

    // 上架、下架、删除 更新状态接口
    $scope.updateGoodState = function(productPriceId, state){
        ProductService.update_good_state({
            productPriceId: productPriceId,
            state: state
        }, function(resp){
            if(resp.code == 'success'){
                layer.alert('操作成功');
                init_order_list(true);
            }else{
                layer.alert(resp.msg);
            }
        });
    }

    //详情
    $scope.goDetailFn = function(item) {
      $state.go('main.business_home.tm_manage_detail', {tmiD: item.id});
    };

    /**
     * 设置服务状态
     */
    $scope.setServiceState = function(item){
      $modal.open({
          resolve:{
              item : function(){
                  return item;
              }
          },
          backdrop:false,
          keyboard:true,
          templateUrl: 'package\\modal\\business\\set_sell_state.html',
          controller: 'setSellStateCtrl'
      }).result.then(function (result) {
          console.log(result);
      });
    };

    // 审核通过与否设置
    $scope.setVerifyStatuFn = function(id, type) {
      var params = {
        verifyStatus: type,
        id: id
      };
      ProductService.editVerifyStatus(params, function(data) {
        init_order_list(); //查询商标列表
      });
    };




    //下架
    $scope.offShelf = function(item){
      layer.confirm('确定下架该商品？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        $scope.updateGoodState(item.productPriceId, 3);
        layer.close(index);
      }, function(){
      });
    }

    //删除
    $scope.deleteGood = function(item){
      layer.confirm('确定删除该商品？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        $scope.updateGoodState(item.productPriceId, 4);
        layer.close(index);
      }, function(){
      });
    }

    $scope.editDetail = function(index){
      $state.go('main.business_home.edit_good_detail', {productPriceId: index});
    }

    //提示操作
    $scope.hint=false;
    $scope.hints = function(){
        $scope.hint = !$scope.hint;
    }
});

