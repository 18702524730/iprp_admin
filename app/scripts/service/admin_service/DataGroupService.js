angular.module("iprpAdminApp").factory("DateGroupService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/data/groups/:dg_id',{dg_id:'@dg_id',access_token:function(){return session.accessToken}},{
        'data_group_list': {
            method: 'GET',
            isArray: false
        },
        'common_data_group_list':{
            url:options.api.base_url + '/common/data/groups',
            method: 'GET',
            isArray: false
        },
        'data_group_detail':{
            method: 'GET',
            isArray:false,
            params :{
                dg_id : $stateParams.dg_id
            }
        },
        'put':{
            method: 'PUT',
            isArray: false,
            params :{
                dg_id : $stateParams.dg_id
            }
        },
        'add_data_group':{
            method: 'POST',
            isArray: false
        },
        'deleteBatch':{
            method: 'DELETE',
            isArray: false
        },
        'getDealDataGroup':{
            url:options.api.base_url + '/dataGroups/checked/all/:dg_id',
            isArray:true,
            params :{
                dg_id : $stateParams.dg_id
            }
        }
    });
});
