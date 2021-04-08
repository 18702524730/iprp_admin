angular.module("iprpAdminApp").factory("BillLogService", function ($resource,session,$stateParams) {

    return $resource(options.api.base_url + '/bill_logs',{order_id: '@order_id',access_token:function(){return session.accessToken}}, {
        "get": {
            method: 'GET',
            isArray: false
        }
    })
});