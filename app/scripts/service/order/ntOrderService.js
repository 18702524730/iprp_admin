angular.module("iprpAdminApp").factory("ntOrderService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/findBsOrdersList/:order_id',{order_id:'@order_id',access_token:function(){return session.accessToken}},{
        'list':{
            url:options.api.base_url + '/findEvidenceListByParams',
            method:'GET',
            isArray: false
        },
        'orderDetail':{
            url:options.api.base_url + '/findEvidenceListDetail',
            method:'GET',
            isArray: false,
            params:{
                order_sn : $stateParams.order_sn
            }
        },
        'setServiceState':{
            url:options.api.base_url + '/setOrderFeedback',
            method:'GET',
            isArray: false
        },
        'productType':{
            url:options.api.base_url + '/product',
            method:'GET',
            isArray: true
        }

    })
});

