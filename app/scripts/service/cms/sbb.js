angular.module("iprpAdminApp").factory("SbbService", function($resource,$httpParamSerializer,$stateParams,session) {
  return $resource(options.api.base_url + '/spAdvise/:spAdviseId',{spAdviseId:'@spAdviseId',access_token:function(){return session.accessToken}},{
      'detail':{
          method:'GET',
          params:{
              spAdviseId : $stateParams.spAdviseId
          },
          isArray: false
      },
      'list':{
          url:options.api.base_url + '/spAdvise/list',
          method:'GET',
          isArray: false
      },
      // 查询我要砍价列表
      'bargainTrademarkList':{
          url:options.api.base_url + '/bargainTrademarkList',
          method:'POST',
          isArray: false
      },
      // 查询列表
      'findEvaluateGoodsList':{
          url:options.api.base_url + '/findMarketingContentList',
          method:'GET',
          isArray: false
      },
      // 查询详情
      'findEvaluateGoodsDetail':{
          url:options.api.base_url + '/findMarketingDetails',
          params:{
              id : $stateParams.id
          },
          method:'GET',
          isArray: false
      },
      // 添加或修改内容
      'addAndUpdateMarketingContent':{
          url:options.api.base_url + '/addAndUpdateMarketingContent',
          method:'POST',
          isArray: false
      },
      // 删除
      'deleteMarketing':{
          url:options.api.base_url + '/deleteMarketing',
          method:'GET',
          isArray: false
      },
      // 置顶
      'setTopeMarketing':{
          url:options.api.base_url + '/setTopeMarketing',
          method:'GET',
          isArray: false
      },
      // 取消置顶
      'cancelSetTopeMarketing': {
        url:options.api.base_url + '/cancelSetTopeMarketing',
        method:'GET',
        isArray: false
      }
  });
});
