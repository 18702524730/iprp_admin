angular.module("iprpAdminApp").factory("ServicerService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/services/:sp_id',{sp_id:'@sp_id',access_token:function(){return session.accessToken}},{
        'service_list':{
            method:'GET',
            isArray: false
        },
        'common_service_list':{
            url:options.api.base_url + '/common/services',
            method:'GET',
            isArray: false
        },
        'serviceDetail':{
            method:'GET',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'serviceEdit':{
            method:'PUT',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'addService':{
            method:'POST',
            isArray: false
        },
        'reset_pwd':{
            url : options.api.base_url + '/services/reset/pwd/:sp_id',
            method:'PUT',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'orders_allot_service':{
            url : options.api.base_url + '/orders/allot/services',
            method:'GET',
            isArray: false
        },
        'spstatistic':{
            url : options.api.base_url + '/spstatistic',
            method:'GET',
            isArray: false
        },
         'listEntrustedUnit':{
            url:options.api.base_url + '/listEntrustedUnit',
            method:'GET',
            isArray: false
        }
    })
});
