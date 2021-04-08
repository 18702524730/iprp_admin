angular.module("iprpAdminApp").factory("PurviewService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/purview/:fg_id',{fg_id:'@fg_id',access_token:function(){return session.accessToken}},{
        'getPurview':{
            method: 'GET',
            isArray: true
        },
        'purview_all':{
            method: 'GET',
            isArray: false
        }
    })
});


