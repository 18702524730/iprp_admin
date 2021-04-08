angular.module("iprpAdminApp").factory("MerchantManageService", function($resource,$stateParams,session) {
  return $resource(options.api.base_url + '/services/v2/:spId', {
  	spId:'@spId',
  	access_token:function(){return session.accessToken}
  },{
    'list':{
      method:'GET',
      isArray: false
    },
    'detail':{
    	url:options.api.base_url + '/services/:spId',
      method:'GET',
      isArray: false,
      params:{
        spId : $stateParams.spId
      }
    },
    //获取店铺资料
    'getStore':{
    	url:options.api.base_url + '/serviceProvider/:spId/store',
      method:'GET',
      isArray: true,
      params:{
        spId : $stateParams.spId
      }
    },
    //查看时，获取业务资料和服务类目中的其它服务
    'getBusiness':{
    	url:options.api.base_url + '/findServicebusinessById',
      method:'GET',
      isArray: false,
    },
    // 编辑业务资料
    'updateBusiness':{
    	url:options.api.base_url + '/updateServicebusiness',
      method:'POST',
      isArray: false,
    },
    'edit':{
    	url:options.api.base_url + '/services/:spId',
      method:'PUT',
      isArray: false,
      params:{
        spId : $stateParams.spId
      }
    },
  })
});

