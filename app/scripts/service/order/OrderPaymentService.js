angular.module("iprpAdminApp").factory("OrderPaymentService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/orders/pay',{access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        "detail":{
            url:options.api.base_url + '/orders/:order_pay_id/pay',
            method:'GET',
            isArray: false,
            params:{
                order_pay_id:$stateParams.order_pay_id
            }
        }
    })
});

