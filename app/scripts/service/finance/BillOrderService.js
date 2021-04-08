angular.module("iprpAdminApp").factory("BillOrderService", function ($resource,session,$stateParams) {

    return {
        bill_order: $resource(options.api.base_url + '/bills/:bill_id/orders',{bill_id: '@bill_id',access_token:function(){return session.accessToken}}, {
            "get": {
                method: 'GET',
                isArray: false
            },
            "con_bill":{
                method: 'PUT',
                isArray: false,
                param:{
                    bill_id:$stateParams.bill_id
                }
            },
            "check":{
                url:options.api.base_url + '/check/bills/:bill_id/orders',
                method: 'PUT',
                isArray: false,
                param:{
                    bill_id:$stateParams.bill_id
                }
            }
        })
    }
});
angular.module("iprpAdminApp").factory("BillOrderDetailService", function ($resource,session,$stateParams) {
    return $resource(options.api.base_url + '/bills/:bill_id/orders/:bill_order_id',
        {bill_id: '@bill_id',bill_order_id: '@bill_order_id',access_token:function(){return session.accessToken}}, {
            "get":{
                method: 'GET',
                isArray: false,
                param:{
                    bill_id:$stateParams.bill_id,
                    bill_order_id:$stateParams.bill_order_id
                }
            }
        })
});