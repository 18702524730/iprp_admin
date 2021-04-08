angular.module("iprpAdminApp").factory("MemberBlackService", function($resource,session,$stateParams) {

    return $resource(options.api.base_url + '/members/:member_id',{member_id:'@member_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        "detail":{
            method:'GET',
            isArray: false,
            params:{
                member_id : $stateParams.member_id
            }
        },
        'update_state':{
            url:options.api.base_url + '/members/:member_id/status',
            method:'PUT',
            isArray:false,
            params:{
                member_id : $stateParams.member_id
            }
        },
        'update':{
            method:'PUT',
            isArray: false,
            params:{
                member_id : $stateParams.member_id
            }
        },
        'delete':{
            method:'DELETE',
            isArray: false,
            params:{
                member_id : $stateParams.member_id
            }
        },
        "service_record":{
            url:options.api.base_url + "/members/:member_id/orders/service",
            method:'GET',
            isArray: true,
            params:{
                member_id : $stateParams.member_id
            }
        },
        "assign_sp":{
            url:options.api.base_url + "/members/assign/sp/:member_id",
            method:'GET',
            isArray: false,
            params:{
                member_id : $stateParams.member_id
            }
        }
    })
});
