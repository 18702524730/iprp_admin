angular.module("iprpAdminApp").factory("BillService", function ($resource,session,$stateParams) {

    return {
        bill: $resource(options.api.base_url + '/bills/:sp_id',{sp_id: '@sp_id',access_token:function(){return session.accessToken}}, {
                "get": {
                    method: 'GET',
                    isArray: false
                },
                'bill_service_list':{
                    url:options.api.base_url + '/bills/services',
                    method: 'GET',
                    isArray: false
                },
                "detail":{
                    url:options.api.base_url + '/bills/:bill_id/detail',
                    method: 'GET',
                    isArray: false,
                    param:{
                        bill_id:$stateParams.bill_id
                    }
                },
                "account_amount":{
                    url:options.api.base_url + '/bills/:bill_id/account/amount',
                    method: 'GET',
                    isArray: false,
                    param:{
                        bill_id:$stateParams.bill_id
                    }
                }
        })
    }
});