angular.module('iprpAdminApp').controller('serviceManageCtrl', function($scope, $stateParams, BusinessService, BusinessClassService, PaginationService, bsOrderService, ChannelService, ServicerService, $location) {
  $('#servicer_list').siblings().removeClass("selected");
  $('#servicer_list').addClass("selected");

  $scope.weightNum = 10; //权重
  $scope.tabType = 1; //1.商家服务  2.平台导流类目

  $scope.showStepTwo = false; //是否展示选择服务类目第二步
  $scope.showStepThree = false; //是否展示选择服务类目第三步
  $scope.selectList = []; //选择的服务类目列表
  // 服务类目1列表
  $scope.stepOneList = [];
  // 服务类目2列表
  $scope.stepTwoList = [];
  // 服务类目3列表
  $scope.stepThreeList = [];
  //获取商品一级分类
  bsOrderService.productType(function(data) {
    $scope.stepOneList = data;
  }, function(error) {
    layer.alert(error.data.msg);
  });
  // 选择第一步
  $scope.selectStepOneFn = function(item) {
    $scope.selectOne = item;
    $scope.stepOneList.forEach(function(info) {
      info.active = false;
    });
    item.active = true; //高亮
    $scope.showStepTwo = true; //展示第二步
    $scope.showStepThree = false; //隐藏第二步
    bsOrderService.productType({
      type: 1,
      parent_id: item.id
    },function(data){
      $scope.stepTwoList = data;
    });
  };
  // 选择第二步
  $scope.selectStepTwoFn = function(item) {
    $scope.selectTwo = item;
    $scope.stepTwoList.forEach(function(info) {
      info.active = false;
    });
    // 重置第三步的选择
    $scope.stepThreeList.forEach(function(li) {
      li.isSelect = false;
    });
    item.active = true; //高亮
    $scope.showStepThree = true; //展示第三步
    bsOrderService.productType({
      type: 2,
      parent_id: item.id
    },function(data){
      $scope.stepThreeList = data;
    });
  };
  // 选择第三步
  $scope.selectStepThreeFn = function(item) {
    // 获取当前操作列表下标
    function getListIndex() {
      for (var i = 0; i < $scope.selectList.length; i++) {
        let part = $scope.selectList[i];
        if (part.typeOne.id == $scope.selectOne.id && part.typeTwo.id == $scope.selectTwo.id) {
          return i
        }
      }
      return -1
    }
    if (item.isSelect) {
      if (!$scope.selectList.length) {
        $scope.selectList.push({
          typeOne: $scope.selectOne,
          typeTwo: $scope.selectTwo,
          typeThree: [].concat(item)
        });
      } else {
        let index_ = getListIndex();
        if (index_ >= 0) {
          if (!$scope.selectList[index_].typeThree.length) {
            $scope.selectList.push({
              typeOne: $scope.selectOne,
              typeTwo: $scope.selectTwo,
              typeThree: [].concat(item)
            });
          } else {
            $scope.selectList[index_].typeThree.push(item);
          }
        } else {
          $scope.selectList.push({
            typeOne: $scope.selectOne,
            typeTwo: $scope.selectTwo,
            typeThree: [].concat(item)
          });
        }
      }
    } else {
      let idx = 0;
      let index_ = getListIndex();
      $scope.selectList[index_].typeThree.forEach(function(info, index) {
        if (info.id == item.id) {
          idx = index;
        }
      });
      $scope.selectList[index_].typeThree.splice(idx, 1);
      // 当只选择了一个再取消勾选时删掉这一行
      if (!$scope.selectList[index_].typeThree.length) {
        $scope.selectList.splice(index_)
      }
    }
    console.log($scope.selectList);
  };
  // 删除已选择标签
  $scope.deleteLabFn = function(info, index, item) {
    item.typeThree.splice(index, 1);
    // 更新列陛下选中状态
    $scope.stepThreeList.forEach(function(part){
      if(part.id == info.id){
        part.isSelect = false;
      }
    })
    console.log($scope.stepThreeList)
  }


  //渠道列表 /api/channels/all
  var getChannels = function(cb) {
    ChannelService.channel.channel_all({
      "pg_index": 0,
      "pg_count": 999
    }, function(data) {
      $scope.channel_list = data.elements;
      if ($scope.channel_list.length) {
        $scope.channel_id = $scope.channel_list[0].channel_id;
        $scope.channel_name = $scope.channel_list[0].name;
      }
      addChanelToBusinessList();
      cb && cb();
    });
  };

  //切换渠道
  $scope.channelChange = function(channel_id) {
    var channel_name = '';
    $.each($scope.channel_list, function(i, item) {
      if (item.channel_id == channel_id) {
        channel_name = item.name;
        return false;
      }
    });
    $scope.channel_name = channel_name;
    addChanelToBusinessList();
    addBilityToBusinessList();
  };

  //能力值列表 get /api/serviceSpBs/212
  var initBilityList = function() {
    BusinessService.serviceSpBsList({
      sp_id: $stateParams.sp_id
    }, {
      "pg_index": 0,
      "pg_count": 999,
    }, function(data) {
      $scope.bility_list = data.elements;
      addBilityToBusinessList();
    });
  }

  /**
   * 初始化入口
   * 获取服务商详情get /api/services/212
   */
  $scope.tempServiceBusiness = [];
  $scope.businessList = [];
  ServicerService.serviceDetail({
    sp_id: $stateParams.sp_id
  }, function(data) {
    $scope.service_detail = data;
    $scope.sp_id = data.sp_id;
    $scope.sp_code = data.code;
    init_service_list();
  }, function(error) {
    alert(error.data.msg)
  });

  function addChanelToBusinessList() {
    var items = $scope.businessList;
    //渠道数据组合到这儿
    $.each(items, function(i, item) {
      item.channel_name = $scope.channel_name;
      item.channel_id = $scope.channel_id;
      item.sp_id = $scope.sp_id;
      item.sp_code = $scope.sp_code;
    });
  }

  // 注意：依赖businessList，bility_list，channel_id，
  function addBilityToBusinessList() {
    var items = $scope.businessList;
    var bility_list = $scope.bility_list
    //能力值数据组合到这儿
    $.each(items, function(i, item) {
      item.sp_now_ability = null;
      item.sp_ability = null;
      item.check = false;
      item.sp_bs_id = '';
      $.each(bility_list, function(idx, it) {
        if (it.bs_id == item.bs_id && it.channel_id == item.channel_id) {
          item.sp_now_ability = it.sp_now_ability;
          item.sp_ability = it.sp_ability;
          item.check = it.check;
          item.sp_bs_id = it.sp_bs_id;
        }
      });
    });
  }
  $scope.pagination = {
    curPage: 0,
    totalCount: 0,
    countPerPage: 15
  }

  var temp = false;
  var once = false;

  function init_service_list(bs_class_id, pageIndex) {
    $scope.pagination = null;
    $scope.tempServiceBusiness = [];
    $scope.to_loading = true; //默认 开始 加载
    $scope.loading_text = "加载中..."; //加载页面内容
    var OweNer = function(pg_index, pg_count, cb) {
      // 总的服务列表 api/common/businesses
      BusinessService.common_list({
        "pg_index": temp && pageIndex || pg_index,
        "pg_count": pg_count,
        bs_class_id: bs_class_id || ''
      }, cb);
      temp = false;
    };
    $scope.pagination = new PaginationService(OweNer, 15);

    if (pageIndex) {
      $scope.pagination.curPage = pageIndex;
    }

    if (once) {
      return
    }
    once = true;
    $scope.$watch('pagination.curPageItems', function(newItems) {
      $scope.businessList = [];
      if (newItems == undefined)
        return;
      if ($scope.pagination.curPageItems.length === 0) {
        $scope.loading_text = "没有符合条件的记录"; //加载页面内容
        return;
      }
      $scope.businessList = newItems;
      getChannels(initBilityList);
      $scope.tempServiceBusiness = $scope.businessList;
      $scope.to_loading = false; //如果不为空 结束加载页面
    });
  }

  /**
   * 获取一级服务分类
   */
  BusinessClassService.common_findChildByParentId({
    pg_count: 999,
    pg_index: 0,
    parent_id: 0
  }, function(data) {
    $scope.BusinessFirst = data;
  });
  //二级分类
  $scope.searchSecond = function(params) {
    init_service_list(params || $scope.bs_class_id);
    BusinessClassService.common_findChildByParentId({
      "pg_index": 0,
      "pg_count": 999,
      "parent_id": params
    }, function(data) {
      $scope.BusinessSrcondclass = data;
      initBilityList();
    });
    $scope.s_bs_class_id = '';
    $scope.t_bs_class_id = '';
  };
  //获取三级
  $scope.searchThird = function(params) {
    init_service_list(params || $scope.bs_class_id);
    BusinessClassService.common_findChildByParentId({
      "pg_index": 0,
      "pg_count": 999,
      "parent_id": params
    }, function(data) {
      $scope.BusinessThreeclass = data;
    });
    $scope.t_bs_class_id = '';
  };
  $scope.showBusiness = function(params) {
    init_service_list(params || $scope.s_bs_class_id);
  };

  //查看所有服务
  $scope.all_service = function() {
    $scope.bs_class_id = '';
    $scope.BusinessSrcondclass = {};
    $scope.BusinessThreeclass = {};
    init_service_list();
  };

  //开通、修改
  $scope.servAction = function(item, isEdit, sp_code) {
    $modal.open({
      resolve: {
        itemD: function() {
          return {
            item: item,
            isEdit: isEdit,
            sp_code: sp_code
          };
        }
      },
      backdrop: false,
      keyboard: true,
      templateUrl: 'package\\modal\\service\\edit_servicer_manage.html',
      controller: 'EditServicerManage'
    }).result.then(function(result) {
      //$state.reload();
      temp = true;
      //不刷新列表只刷新能力值
      //init_service_list($scope.t_bs_class_id || $scope.s_bs_class_id || $scope.bs_class_id, $scope.pagination.curPage);
      initBilityList();
    });
  };


});