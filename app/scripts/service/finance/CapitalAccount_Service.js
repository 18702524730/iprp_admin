angular.module("iprpAdminApp").factory("CapitalAccountServiceService", function ($resource,session,$stateParams) {

    return {
        capital_account: $resource(options.api.base_url + '/capital_accounts/:sp_id',{sp_id: '@sp_id',access_token:function(){return session.accessToken}}, {
            "get": {
                method: 'GET',
                isArray: false
            },
            "detail":{
                method: 'GET',
                isArray: false,
                params:{
                    sp_id:$stateParams.sp_id
                }
            }
        })
    }
});