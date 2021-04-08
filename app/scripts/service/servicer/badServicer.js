angular.module("iprpAdminApp").factory("BadServicerService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/bad/services/:sp_id',{sp_id:'@sp_id',access_token:function(){return session.accessToken}},{
        'badService_list':{
            method:'GET',
            isArray: false
        },
        'badServiceDetail':{
            method:'GET',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'badServiceEdit':{
            method:'PUT',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'addBadService':{
            method:'POST',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        },
        'searchBadService':{
            url:options.api.base_url + '/keyWord/services/:sp_id',
            method:'GET',
            isArray: false,
            params:{
                sp_id : $stateParams.sp_id
            }
        }
    })
});
