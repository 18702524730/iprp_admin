angular.module("iprpAdminApp").factory("AssignService", function($resource,session,$stateParams) {

    return{
        Assign : $resource(options.api.base_url + '/members/assign/service/:designation_id',{designation_id:'@designation_id',access_token:function(){return session.accessToken}},{
            "get_list":{
                method: 'GET',
                isArray: false
            },
            "detail":{
                method: 'GET',
                isArray: false,
                param:{
                    designation_id:$stateParams.designation_id
                }
            },
            "spService":{
                url:options.api.base_url + '/members/assign/:designation_id/service',
                method: 'GET',
                isArray: true,
                param:{
                    designation_id:$stateParams.designation_id
                }
            },
            "add":{
                method: 'POST',
                isArray: false
            },
            "edit":{
                method: 'PUT',
                isArray: false,
                param:{
                    designation_id:$stateParams.designation_id
                }
            },
            "assgin_service":{
                method: 'POST',
                isArray: false,
                param:{
                    designation_id:$stateParams.designation_id
                }
            },
            "delete":{
                method: 'DELETE',
                isArray: false
            }
        })
    }
});
