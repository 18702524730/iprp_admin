angular.module("iprpAdminApp").factory("ExpressService", function($resource,session,$stateParams) {

    return{
        express : $resource(options.api.base_url + '/expresses/:express_id', {express_id:'@express_id',access_token:function(){return session.accessToken}}, {
            "list": {
                method: 'GET',
                isArray: false
            },
            "detail":{
                method: 'GET',
                isArray: false,
                params:{
                    express_id:$stateParams.express_id
                }
            },
            "edit":{
                method: 'PUT',
                isArray: false,
                params: {
                    express_id: $stateParams.express_id
                }
            }
        }),
        express_all : $resource(options.api.base_url + '/express/all',{access_token:function(){return session.accessToken}},{
            "all":{
                method: 'GET',
                isArray: false
            }
        })
    }
});
