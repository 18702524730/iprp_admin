angular.module("iprpAdminApp").factory("BusinessService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/businesses/:sp_id',{sp_id:'@sp_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        "common_list":{
          url:options.api.base_url + '/common/businesses',
          method:'GET',
          isArray:false
        },
        'addServiceBs':{
            method:'POST',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'findSpIdBusiness':{
            method:'GET',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'serviceSpBs':{
            url:options.api.base_url + '/serviceSpBs/:sp_id',
            method:'POST',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'serviceSpBsList':{
            url:options.api.base_url + '/serviceSpBs/:sp_id',
            method:'GET',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'findServicebusinessBsById':{
            url:options.api.base_url + '/findServicebusinessBsById/',
            method:'GET',
            isArray: false
        }

    })
});

angular.module("iprpAdminApp").factory("BusinessesService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/businesses/:bs_id',{bs_id:'@bs_id',access_token:function(){return session.accessToken}},{
        'addBusinessService':{
            method:'POST',
            isArray: false
        },
        'editBusinessService':{
            method:'PUT',
            isArray: false,
            params:{
                bs_id : $stateParams.bs_id
            }
        },
        'detail_businessService':{
            url:options.api.base_url + '/businesses/service/:bs_id',
            method:'GET',
            isArray: false,
            params:{
                bs_id : $stateParams.bs_id
            }
        },
        'business_sp':{
            url:options.api.base_url + '/business/serviceProvider/:bs_id',
            method:'GET',
            isArray: true
        }
    })
});
