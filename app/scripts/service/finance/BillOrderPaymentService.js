angular.module("iprpAdminApp").factory("BillOrderPaymentService", function ($resource,session,$stateParams) {

    return $resource(options.api.base_url + '/bills/orders/:bill_order_id/payments',{bill_order_id: '@bill_order_id',access_token:function(){return session.accessToken}}, {
        "list": {
            method: 'GET',
            isArray: true,
            param:{
                bill_order_id:$stateParams.bill_order_id
            }
        }
    })
});

angular.module("iprpAdminApp").factory("BillOrderPaymentDetailService", function ($resource,session,$stateParams) {
    return $resource(options.api.base_url + '/bills/orders/:bill_order_id/payments/:bill_order_pay_id',
        {bill_order_id: '@bill_order_id',bill_order_pay_id: '@bill_order_pay_id',access_token:function(){return session.accessToken}}, {
        "pay_detail": {
            method: 'GET',
            isArray: false,
            param:{
                bill_order_id:$stateParams.bill_order_id,
                bill_order_pay_id:$stateParams.bill_order_pay_id
            }
        },
        "update":{
            method: 'PUT',
            isArray: false,
            param:{
                bill_order_id:$stateParams.bill_order_id,
                bill_order_pay_id:$stateParams.bill_order_pay_id
            }
        },
        "reject_order_pay":{
            url:options.api.base_url + '/reject/bills/orders/:bill_order_id/payments/:bill_order_pay_id',
            method: 'PUT',
            isArray: false,
            param:{
                bill_order_id:$stateParams.bill_order_id,
                bill_order_pay_id:$stateParams.bill_order_pay_id
            }
        }
    })
});












